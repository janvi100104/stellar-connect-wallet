import React, { useState, useEffect } from 'react';
import { checkConnection, retrievePublicKey, getBalance } from './Freighter';

const FreighterUI = () => {
  const [connectionState, setConnectionState] = useState('disconnected'); // 'disconnected', 'connecting', 'connected'
  const [publicKey, setPublicKey] = useState('');
  const [balance, setBalance] = useState('0');
  const [error, setError] = useState(null);

  // Check if Freighter extension is available
  useEffect(() => {
    const checkExtension = async () => {
      try {
        // Try to detect if Freighter is installed by checking for the API
        if (typeof window !== 'undefined' && window.freighterApi) {
          // Extension exists, no error
          setError(null);
        } else {
          // Check if the API can be imported and used
          try {
            await checkConnection();
            setError(null);
          } catch (err) {
            setError('Extension Not Found');
          }
        }
      } catch (err) {
        setError('Extension Not Found');
      }
    };

    checkExtension();
  }, []);

  const connectWallet = async () => {
    setConnectionState('connecting');
    setError(null);
    
    try {
      const allowed = await checkConnection();
      if (!allowed) {
        setConnectionState('disconnected');
        setError('Please allow access to your wallet');
        return;
      }
      
      const key = await retrievePublicKey();
      const bal = await getBalance();
      
      setPublicKey(key);
      setBalance(Number(bal).toFixed(2));
      setConnectionState('connected');
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setError(error.message || 'Failed to connect to wallet');
      setConnectionState('disconnected');
    }
  };

  const disconnectWallet = () => {
    setConnectionState('disconnected');
    setPublicKey('');
    setBalance('0');
    setError(null);
  };

  // Format the public key to show truncated version
  const truncatePublicKey = (key) => {
    if (!key) return '';
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  };

  // Render disconnected state
  if (connectionState === 'disconnected') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-4">
        <div className="relative">
          <button
            onClick={connectWallet}
            disabled={!!error}
            className={`
              relative overflow-hidden
              px-8 py-4 rounded-xl
              bg-white/10 backdrop-blur-lg border border-white/20
              text-white font-semibold text-lg
              transition-all duration-300 ease-out
              hover:scale-105 hover:bg-white/20
              hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.5)]
              active:scale-95
              ${error ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-2">
              Connect Freighter
            </span>
          </button>
          
          {/* Error tooltip */}
          {error && (
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-2 rounded-md whitespace-nowrap animate-pulse">
              {error}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render connecting state
  if (connectionState === 'connecting') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            {/* Pulsing loader */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-cyan-500/30 rounded-full animate-spin border-t-cyan-400"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-blue-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Waiting for Signature...</h2>
          <p className="text-cyan-200">Please check your Freighter extension</p>
        </div>
      </div>
    );
  }

  // Render connected state
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 max-w-md w-full">
        {/* Network Status Indicator */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Testnet</span>
          </div>
        </div>
        
        {/* Member Chip Style UI */}
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Placeholder for Freighter Logo */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Freighter Wallet</h3>
                <p className="text-cyan-200 text-sm">Connected</p>
              </div>
            </div>
            <button 
              onClick={disconnectWallet}
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Disconnect wallet"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,8L15.59,9.41L13.42,7.24L13.42,12.76L15.59,10.59L17,12L12,17L7,12L8.41,10.59L10.58,12.76L10.58,7.24L8.41,9.41L7,8L12,3L17,8Z"/>
              </svg>
            </button>
          </div>
          
          {/* Address Display with Monospace Font */}
          <div className="mb-3">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Address</p>
            <p className="font-mono text-white text-sm break-all">{truncatePublicKey(publicKey)}</p>
          </div>
          
          {/* Balance Display */}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Balance</p>
            <p className="text-white text-lg font-semibold">
              {balance} <span className="text-cyan-300 text-base">XLM</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreighterUI;