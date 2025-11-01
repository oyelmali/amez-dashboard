import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://dashboard.reown.com
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

// 2. Create a metadata object - optional
const metadata = {
  name: 'AMEZ Dashboard',
  description: 'Amezay Frontend Challenge için AMEZ Token Paneli',
  url: 'https://amezay.com', // Projenin canlıya çıktığındaki adresi
  icons: ['https://avatars.githubusercontent.com/u/37784886'] // Proje logosu
}

// 3. Set the networks
const networks = [mainnet, arbitrum]


// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, arbitrum],
  projectId,
  metadata,
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#DD7BDF',
    '--w3m-qr-color': '#DD7BDF'
  }
});

// 6. Web3Provider component'ini GÜNCELLİYORUZ
export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}