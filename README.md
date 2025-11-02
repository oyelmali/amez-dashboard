# AMEZ Token Dashboard - Frontend Edge Challenge

**🚀 Canlı Demo:** [**PROJENİN_CANLI_URLSİ**](https://amez-dashboard.pages.dev/)
*(Not: Lütfen MetaMask cüzdanınızın Sepolia veya Mainnet ağına ayarlı olduğundan emin olun.)*

Bu proje, Amezay tarafından verilen "Frontend Edge Challenge" için geliştirilmiş bir AMEZ token dashboard uygulamasıdır. Uygulama, React, TypeScript, Vite, wagmi ve Tailwind CSS kullanılarak oluşturulmuş ve Cloudflare Pages/Functions üzerinde çalışacak şekilde tasarlanmıştır.

## Uygulama Demosu

Uygulamanın cloudflare üzerinde workers 

## Özellikler

- **Token Bilgileri:** AMEZ token sembolü, toplam arz ve Cloudflare Worker üzerinden cache'lenerek sunulan anlık fiyat bilgisi.
- **Cüzdan Entegrasyonu:** MetaMask ve WalletConnect ile cüzdan bağlama ve kullanıcının AMEZ token bakiyesini gösterme.
- **Son Transferler:** Mock data ile son token transferlerini listeleme.
- **Gnosis Safe Teklif Üretici:** Kullanıcının girdiği LP Token adresi ile `LPLocker.lock` işlemi için bir Gnosis Safe teklif JSON'u oluşturma ve indirme.
- **Edge Fonksiyonları (Cloudflare Worker):**
  - **Akıllı Önbellekleme:** Token fiyat istekleri için 30 saniye cache, 10 saniye `stale-while-revalidate`.
  - **Güvenlik:** IP tabanlı rate limiting (10 istek/saniye).
  - **Performans:** Otomatik gzip/brotli sıkıştırması ve uygun `Cache-Control` başlıkları.

## Kullanılan Teknolojiler

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Veri Görselleştirme:** Recharts
- **Web3:** wagmi, viem, Web3Modal
- **Edge Computing:** Cloudflare Pages & Functions (Workers)
- **Test:** Vitest, React Testing Library (Birim Testleri), Playwright (E2E Testleri)
- **CI/CD:** GitHub Actions

---

## Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler

- Node.js (v18 veya üstü)
- npm veya pnpm

### 1. Projeyi Klonlama

```bash
git clone https://github.com/oyelmali/amez-dashboard
cd amez-dashboard
```

### 2. Bağımlılıkları Yükleme

```bash
npm install
```

### 3. Ortam Değişkenleri
Proje ana dizininde .env.local adında bir dosya oluşturun. Bu dosyaya WalletConnect'ten aldığınız Project ID'nizi eklemeniz gerekmektedir.
```bash
VITE_WALLETCONNECT_PROJECT_ID=...project-id...
```

### 4. Yerel Geliştirme Ortamını Başlatma
Bu proje, bir frontend (Vite) ve bir backend (Cloudflare Worker) olmak üzere iki ayrı sunucu gerektirir. İki ayrı terminalde çalıştırılmalıdır.
```bash
# Worker'ın bağlı olduğu frontend build'ini oluştur
npm run build
```
```bash
# Wrangler ile yerel Pages sunucusunu başlat
npm run pages:dev
```
Terminal 2: Frontend Geliştirme Sunucusunu Başlatma
```bash
npm run dev
```

Uygulama artık http://localhost:5173 adresinde erişilebilir durumdadır.

### Testleri Çalıştırma
Birim Testleri (Vitest)

```bash
npm run test
```
Veya testleri görsel arayüzde çalıştırmak için
```bash
npm run test:ui
```

## Uçtan Uca Testler (Playwright)
Playwright testlerini çalıştırmadan önce geliştirme sunucusunun (npm run dev) çalışır durumda olduğundan emin olun.

```bash
# Testleri headless modda çalıştır
npx playwright test

# Test raporunu tarayıcıda görüntüle
npx playwright show-report
```

## ☁️ Cloudflare Pages'e Deploy Etme

Bu proje, GitHub reposuna bağlanarak Cloudflare Pages'e kolayca deploy edilebilir.

### 1. Projeyi Cloudflare'e Ekleme
- Cloudflare dashboard'una gidin: Workers & Pages > Create application > Pages > Connect to Git.
- GitHub hesabınızı bağlayın ve bu projeye ait repoyu seçin.
### 2. Yapılandırma Ayarları
Kurulum ekranında aşağıdaki ayarları girin:

- Production Branch: challenge/ADSOYAD (veya sizin çalıştığınız branch'in adı)
- Framework Preset: Vite (Bu, aşağıdaki komutları otomatik dolduracaktır)
- Build Komutu: npm run build
- Build Çıktı Dizini: dist
### 3. Ortam Değişkeni (Zorunlu)
Canlıya alınan uygulamanın cüzdan bağlantısı özelliğinin çalışması için mutlaka bir ortam değişkeni eklenmelidir:

- Settings > Environment variables > Production > Add variable yolunu izleyin.
- Değişken Adı: VITE_WALLETCONNECT_PROJECT_ID
- Değeri: Sizin WalletConnect Project ID'niz.
- Bu değişkeni "Encrypt" (Şifrele) etmeyin.
### 4. Deploy
- Save and Deploy butonuna tıklayın.
- Cloudflare, projeyi build edip functions klasöründeki Worker ile birlikte canlıya alacaktır.
- Ayrıca, canlı URL'nizi (....pages.dev) WalletConnect Cloud projenizin "Domains" (Alan Adları) listesine eklemeyi unutmayın, aksi takdirde isteklere yanıt vermez.
