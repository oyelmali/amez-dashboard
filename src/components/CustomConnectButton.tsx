import { useAppKit } from '@reown/appkit/react';
import { useAccount, useEnsName } from 'wagmi'; 

// ENS avatarı olmayan kullanıcılar için yedek, genel bir avatar ikonu
const genericAvatar = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjY2NjYyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MxLjY2IDAgMyAxLjM0IDMgM3MtMS4zNCAzLTMgMy0zLTEuMzQtMy0zIDEuMzQtMyAzIDN6bTAgMTRjLTIuNjcgMC01LjAxLTEuNDQtNi4zMi0zLjU4LjAzLS42Mi4yMS0xLjE5LjQ3LTEuNzIuMjYtLjU0LjU5LTEuMDMgLjk5LTEuNDUgMS4xMy0xLjE4IDIuNzYtMS44MiA0LjQzLTEuODIgMS42NyAwIDMuMy42MyA0LjQzIDEuODMuNDEuNDMuNzQgLjkyIDEgMS40Ni4yNS41My40NCAxLjA5LjQ3IDEuNzFDMTcuMDEgMTcuNTYgMTQuNjcgMTkgMTIgMTl6Ii8+PC9zdmc+";

export default function CustomConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();

  const { data: avatarUrl } = useEnsName({ address });

  const handleConnect = async () => {
    await open({ view: 'Connect' });
  };

  const handleOpenAccount = async () => {
    await open({ view: 'Account' });
  };
  if (isConnecting || isReconnecting) {
    return (
      <button
        disabled
        className="bg-slate-200 text-slate-500 font-semibold px-5 py-2 rounded-full flex items-center justify-center transition-all"
      >
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Bağlanıyor...
      </button>
    );
  }
  return (
    <>
      {isConnected && address ? (
        <button
        onClick={isConnected ? handleOpenAccount : handleConnect}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold pl-3 pr-4 py-2 rounded-full flex items-center justify-center hover:brightness-110 transition-all duration-300 transform hover:-translate-y-px"
        >
          <img 
            src={avatarUrl || genericAvatar} 
            alt="User Avatar" 
            className="w-6 h-6 rounded-full mr-2 border-2 border-white/50 bg-slate-300"
          />
          <span>{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
        </button>
      ) : (
        <button
        onClick={isConnected ? handleOpenAccount : handleConnect}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold pl-3 pr-4 py-2 rounded-md flex items-center justify-center hover:brightness-110 transition-all duration-300 transform hover:-translate-y-px"
        >
            <span>Connect Wallet</span>
        </button>
      )}
    
    </>
  );
}