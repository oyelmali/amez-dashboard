import { useState, useEffect } from 'react';
import { CubeTransparentIcon, CreditCardIcon, CircleStackIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';


type CoinGeckoResponse = {
  ethereum: {
    usd: number;
  };
};

export function TokenInfoCard() {
  const [price, setPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  


  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/price');
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        // Gelen veriyi tanımladığımız tipe atıyoruz
        const data = await response.json() as CoinGeckoResponse;

        const fetchedPrice = data?.ethereum?.usd;
        if (typeof fetchedPrice === 'number') {
          setPrice(fetchedPrice);
        } else {
          throw new Error('Price data not found in API response.');
        }
      } catch (err) {
        console.error('Failed to fetch price:', err);
        setError('Could not fetch price.');
        setPrice(0);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTokenPrice();
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200">
      <h2 className="flex items-center text-lg font-bold text-slate-700 mb-5">
        <CubeTransparentIcon className="w-7 h-7 mr-2 text-indigo-500" />
        Token Bilgileri
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="flex items-center text-slate-500">
            <CreditCardIcon className="w-5 h-5 mr-2" /> Sembol:
          </span>
          <span className="font-mono font-semibold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full text-sm">AMEZ</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center text-slate-500">
            <CircleStackIcon className="w-5 h-5 mr-2" /> Toplam Arz:
          </span>
          <span className="font-mono font-semibold text-slate-700">1,000,000,000</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center text-slate-500">
            <CurrencyDollarIcon className="w-5 h-5 mr-2" /> Fiyat:
          </span>
          {isLoading ? (
            <div className="h-6 w-24 bg-slate-200 rounded-md animate-pulse"></div>
          ) : error ? (
            <span className="text-red-500 text-sm font-semibold">{error}</span>
          ) : (
            <span className="font-mono font-bold text-green-600 text-lg">
              ${price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}