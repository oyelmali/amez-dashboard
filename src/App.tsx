import React, { Suspense } from 'react';

import { Header } from './components/Header';
import { ProposalGenerator } from './components/ProposalGenerator';
import { TokenInfoCard } from './components/TokenInfoCard';
import { TransferList } from './components/TransferList';
import { UserBalance } from './components/UserBalance';



const LazyPriceChart = React.lazy(() => import('./components/PriceChart'));

const ChartSkeleton = () => (
  <div className="p-6 bg-white rounded-2xl shadow-lg animate-pulse">
    <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
    <div className="h-64 bg-slate-200 rounded"></div>
  </div>
);

function App() {

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-100">
      <Header />

      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <TokenInfoCard />
          <UserBalance />
        </div>

        <div className="mb-8">
          <Suspense fallback={<ChartSkeleton />}>
            <LazyPriceChart />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <TransferList />
          <ProposalGenerator />
        </div>
      </main>
    </div>
  );
}

export default App;