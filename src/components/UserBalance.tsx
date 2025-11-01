import { useAccount, useBalance } from 'wagmi';
import { WalletIcon } from '@heroicons/react/24/outline';

export function UserBalance() {
  const { address, isConnected } = useAccount();
  const AMEZ_TOKEN_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'; // Mainnet UNI Token for demo

  const { data: balanceData, isLoading } = useBalance({
    address: address,
    token: AMEZ_TOKEN_ADDRESS as `0x${string}`,
    query: {
      enabled: isConnected,
    }
  });

  if (!isConnected) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 flex flex-col items-center justify-center min-h-[220px]">
        <WalletIcon className="w-12 h-12 text-indigo-400 mb-3" />
        <h2 className="text-lg font-bold text-slate-700">Bakiyeniz</h2>
        <p className="text-slate-500 mt-1">Lütfen cüzdanınızı bağlayın.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200">
      <h2 className="flex items-center text-lg font-bold text-slate-700 mb-4">
        <WalletIcon className="w-7 h-7 mr-2 text-indigo-500" />
        Bakiyeniz
      </h2>
      <div className="mt-2">
        {isLoading ? (
          <div className="h-10 w-3/4 bg-slate-200 rounded animate-pulse mb-2"></div>
        ) : (
          <p className="text-4xl font-bold text-slate-800 truncate">
            {parseFloat(balanceData?.formatted || '0').toFixed(3)}
            <span className="text-2xl text-slate-400 ml-2 font-medium">{balanceData?.symbol}</span>
          </p>
        )}
        <p className="text-sm text-violet-600 font-mono truncate mt-2 bg-violet-100 rounded-full px-3 py-1 inline-block" title={address}>
          {address}
        </p>
      </div>
    </div>
  );
}