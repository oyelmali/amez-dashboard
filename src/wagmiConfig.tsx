// src/wagmiConfig.ts

// Gerekli fonksiyonları ve objeleri kütüphanelerden import ediyoruz.
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient();

// 1. WalletConnect'ten aldığın Project ID'ni buraya yapıştır.
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID; // <-- DEĞİŞTİR

// 2. Projenin metadata'sı (cüzdan bağlantı ekranında görünecek bilgiler).
const metadata = {
  name: 'AMEZ Dashboard',
  description: 'Amezay Frontend Challenge için AMEZ Token Paneli',
  url: 'https://amezay.com', // Projenin canlıya çıktığındaki adresi
  icons: ['https://avatars.githubusercontent.com/u/37784886'] // Proje logosu
}

// 3. Destekleyeceğimiz blockchain ağlarını tanımlıyoruz.
const chains = [mainnet, sepolia] as const; // `mainnet` production, `sepolia` test için.

// 4. Wagmi'nin ana yapılandırma objesini oluşturuyoruz.
// Bu obje, hangi ağları, proje ID'sini ve metadata'yı kullanacağımızı belirtir.
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 5. Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,

  themeVariables: {
    
    '--w3m-accent': '#54217eff', // İndigo'dan Violet'e gradyan

  }
});

// 6. Web3Provider component'ini GÜNCELLİYORUZ
export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      {/* Uygulamayı QueryClientProvider ile sarmalıyoruz */}
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}