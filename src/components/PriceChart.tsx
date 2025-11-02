import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Gerçek bir API yerine kullanacağımız sahte geçmiş fiyat verisi
const mockPriceData = [
  { name: '7 gün ', price: 2800 },
  { name: '6 gün', price: 2950 },
  { name: '5 gün ', price: 3100 },
  { name: '4 gün', price: 3050 },
  { name: '3 gün ', price: 3200 },
  { name: 'Dün', price: 3400 },
  { name: 'Bugün', price: 3350 },
];

export function PriceChart() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 h-80">
      <h3 className="text-lg font-bold text-slate-700 mb-4">Fiyat Geçmişi (7 Gün)</h3>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={mockPriceData} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.75rem',
            }}
          />
          <Area type="monotone" dataKey="price" stroke="#6366f1" fillOpacity={1} fill="url(#colorPrice)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}