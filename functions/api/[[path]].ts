/**
 * Cloudflare Pages Function (Worker) için ortam tiplerini tanımlar.
 * Bu, context.env, context.request gibi objelerin tiplerini bilmemizi sağlar.
 */
interface Env {}

// Basit, bellek-içi (in-memory) bir rate limiter.
// Production'da daha kalıcı bir çözüm (KV Store gibi) tercih edilir,
// ama bu challenge için yeterlidir.
const ipRequestCounts = new Map<string, number>();
const RATE_LIMIT_THRESHOLD = 10; // Saniyede 10 istek limiti

/**
 * Bu ana fonksiyon, edge'e gelen her istekte çalışır.
 * @param context - İstek (request), ortam değişkenleri (env) gibi bilgileri içerir.
 */
export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const url = new URL(request.url);

  // === 1. Yönlendirme (Routing) ===
  // Sadece `/api/price` yoluna gelen istekleri işleme al.
  // Diğer `/api/*` yolları için 404 Not Found döndür.
  if (url.pathname !== '/api/price') {
    return new Response('Endpoint not found', { status: 404 });
  }

  // === 2. Rate Limiting (İstek Sınırlama) ===
  // Gerçek kullanıcı IP'sini Cloudflare'in eklediği header'dan alıyoruz.
  const ip = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
  
  const currentCount = ipRequestCounts.get(ip) || 0;
  if (currentCount >= RATE_LIMIT_THRESHOLD) {
    // Limiti aşan isteklere 429 Too Many Requests hatası döndür.
    return new Response('Rate limit exceeded', { status: 429 });
  }
  // İstek sayısını artır ve 1 saniye sonra sıfırla.
  ipRequestCounts.set(ip, currentCount + 1);
  setTimeout(() => ipRequestCounts.delete(ip), 1000);


  // === 3. Önbellekleme (Caching) ve Veri Çekme ===
  // Fiyat verisini alacağımız dış API'nin adresi.
  // Challenge için Ethereum fiyatını çekeceğiz.
  const coingeckoUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

  // Cloudflare'in güçlü Cache API'sini kullanıyoruz.
  const cache = caches.default;

  // Önce cache'de bu URL için bir yanıt var mı diye kontrol et.
  let response = await cache.match(coingeckoUrl);

  if (!response) {
    // Cache'de yoksa (cache miss), CoinGecko API'sine gerçek bir istek at.
    console.log(`Cache miss for ${coingeckoUrl}. Fetching from origin...`);
    const originResponse = await fetch(coingeckoUrl, {
      // CoinGecko'ya kendimizi tanıtmak iyi bir pratiktir.
      headers: { 'User-Agent': 'Amezay-Dashboard-Challenge' }
    });

    // Gelen yanıtı kopyalayıp yeni bir Response objesi oluşturuyoruz.
    // Çünkü bir Response objesinin body'si sadece bir kez okunabilir.
    response = new Response(originResponse.body, originResponse);

    // Yanıta Cache-Control başlıklarını ekliyoruz. Bu, hem tarayıcıya hem de Cloudflare'e
    // bu yanıtı nasıl önbelleğe alacaklarını söyler.
    response.headers.set('Cache-Control', 'public, max-age=30, s-maxage=30, stale-while-revalidate=10');
    // s-maxage: Cloudflare edge cache süresi (30 saniye)
    // max-age: Tarayıcı cache süresi (30 saniye)
    // stale-while-revalidate=10: Cache süresi dolduktan sonraki 10 saniye boyunca,
    // gelen ilk istek eski (stale) veriyi alır, ama arka planda yeni veri çekilir.
    // Bu, kullanıcıların cache yenilenirken beklememesini sağlar.

    // Yanıtı bir sonraki sefer kullanmak üzere cache'e koyuyoruz.
    // `waitUntil` ile bu işlemi isteğin sonucunu beklemeden arka planda yaptırıyoruz.
    context.waitUntil(cache.put(coingeckoUrl, response.clone()));
  } else {
    // Cache'de bulunduysa (cache hit), konsola bilgi yazdır.
    console.log(`Cache hit for ${coingeckoUrl}.`);
  }

  // === 4. Yanıtı Döndürme ===
  // Gzip/Brotli sıkıştırması ve doğru content-type başlıkları için
  // cache'den veya origin'den gelen yanıtı klonlayarak yeni bir yanıt oluşturup döndürüyoruz.
  // Cloudflare, uygunsa sıkıştırmayı otomatik olarak ekleyecektir.
  const finalResponse = new Response(response.body, response);
  finalResponse.headers.set('Content-Type', 'application/json');

  return finalResponse;
};