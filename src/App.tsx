import { Header } from './components/Header';
import { ProposalGenerator } from './components/ProposalGenerator';
import { TokenInfoCard } from './components/TokenInfoCard';
import { TransferList } from './components/TransferList';
import { UserBalance } from './components/UserBalance';

function App() {
  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-100">
      <Header />

      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <TokenInfoCard />
          <UserBalance />
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