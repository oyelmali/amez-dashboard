import { useState } from 'react';
import { encodeFunctionData, isAddress } from 'viem';
import { addDays, getUnixTime } from 'date-fns';
import { DocumentPlusIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const LPLOCKER_ABI = [{
  "inputs": [
    { "internalType": "address", "name": "lpToken", "type": "address" },
    { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" }
  ],
  "name": "lock",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}] as const;

const LPLOCKER_ADDRESS = '0x1234567890123456789012345678901234567890';

export function ProposalGenerator() {
  const [lpTokenAddress, setLpTokenAddress] = useState<string>('');
  const [proposalJson, setProposalJson] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateProposal = () => {
    setError(null);
    setProposalJson(null);
    if (!isAddress(lpTokenAddress)) {
      setError('Lütfen geçerli bir Ethereum adresi girin (0x...).');
      return;
    }
    const unlockDate = addDays(new Date(), 90);
    const unlockTimestamp = getUnixTime(unlockDate);
    const transactionData = encodeFunctionData({
      abi: LPLOCKER_ABI,
      functionName: 'lock',
      args: [lpTokenAddress, BigInt(unlockTimestamp)],
    });
    const safeProposal = {
      version: '1.0',
      chainId: '1',
      createdAt: Date.now(),
      meta: {
        name: 'LP Token Kilitleme Teklifi',
        description: `Bu teklif, ${lpTokenAddress} adresindeki LP token'ını 90 gün boyunca LPLocker kontratında kilitleyecektir.`,
      },
      transactions: [{ to: LPLOCKER_ADDRESS, value: '0', data: transactionData }],
    };
    setProposalJson(JSON.stringify(safeProposal, null, 2));
  };

  const handleDownloadJson = () => {
    if (!proposalJson) return;
    const blob = new Blob([proposalJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'proposal.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200">
      <h2 className="flex items-center text-lg font-bold text-slate-700 mb-5">
        <DocumentPlusIcon className="w-7 h-7 mr-2 text-indigo-500" />
        Gnosis Safe Teklifi Oluştur
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="lpTokenAddress" className="block text-sm font-medium text-slate-600 mb-1">
            LP Token Adresi
          </label>
          <input
            type="text"
            id="lpTokenAddress"
            placeholder="0x..."
            value={lpTokenAddress}
            onChange={(e) => setLpTokenAddress(e.target.value)}
            className={`w-full p-3 rounded-lg bg-slate-100 border ${error ? 'border-red-400' : 'border-slate-200'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-slate-400 outline-none`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button
          onClick={handleGenerateProposal}
          className="w-full text-white px-4 py-3 rounded-lg font-bold text-md transition-all duration-300 transform shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 hover:-translate-y-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
          disabled={!lpTokenAddress}
        >
          Teklif JSON'u Oluştur
        </button>
        {proposalJson && (
          <div className="mt-4 border-t border-slate-200 pt-4">
            <h3 className="text-md font-semibold mb-2 text-slate-600">Oluşturulan Teklif:</h3>
            <pre className="bg-slate-100 p-4 rounded-lg text-sm overflow-x-auto max-h-60 border border-slate-200 text-slate-700">{proposalJson}</pre>
            <button
              onClick={handleDownloadJson}
              className="mt-4 w-full flex items-center justify-center bg-green-500 text-white px-4 py-3 rounded-lg font-bold text-md transition-all duration-300 transform shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-0.5"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              JSON Dosyasını İndir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}