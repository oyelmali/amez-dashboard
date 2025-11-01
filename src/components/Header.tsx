export function Header() {
  return (
    <header className="p-6 bg-white/80 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200">
      <div className="flex justify-between items-center m-auto w-full max-w-[1000px]">
        <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-violet-600">
          AMEZAY DASHBOARD
        </h1>
        <w3m-button/>
      </div>
      
    </header>
  );
}