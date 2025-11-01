import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'

export default function CustomConnectButton() {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()

  const handleConnect = async () => {
    await open({ view: 'Connect' })
  }

  return (
    <button
      onClick={handleConnect}
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-lg hover:brightness-110 transition-all"
    >
      {isConnected && address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : 'Connect Wallet'}
    </button>
  )
}
