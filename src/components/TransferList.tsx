import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

const mockTransfers = [
  { hash: '0x123...abc', from: '0xddd...eee', to: '0xeee...fff', amount: '1,250 AMEZ' },
  { hash: '0x345...def', from: '0xfff...ggg', to: '0xggg...hhh', amount: '500 AMEZ' },
  { hash: '0x567...ghi', from: '0xhhh...iii', to: '0xiii...jjj', amount: '7,800 AMEZ' },
  { hash: '0x890...jkl', from: '0xjjj...kkk', to: '0xkkk...lll', amount: '25,000 AMEZ' },
];

export function TransferList() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200">
      <h2 className="flex items-center text-lg font-bold text-slate-700 mb-5">
        <ArrowsRightLeftIcon className="w-7 h-7 mr-2 text-indigo-500" />
        Son Transferler
      </h2>
      <ul className="space-y-2">
        {mockTransfers.map((tx) => (
          <li key={tx.hash} className="p-3 rounded-lg flex justify-between items-center transition-colors hover:bg-slate-100">
            <div className="truncate pr-4">
              <p className="font-mono text-sm text-indigo-600 font-semibold truncate">{tx.hash}</p>
              <p className="text-xs text-slate-500 truncate">From: {tx.from} To: {tx.to}</p>
            </div>
            <span className="font-mono text-slate-700 font-semibold text-md bg-slate-200 px-3 py-1 rounded-full whitespace-nowrap">{tx.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}