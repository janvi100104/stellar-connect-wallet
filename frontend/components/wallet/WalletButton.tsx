'use client';

import { Button } from '@/components/ui/button';
import { useWallet } from '@/store/useWallet';
import { truncateAddress } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export function WalletButton() {
  const { publicKey, isConnected, connecting, connectWallet, disconnectWallet } = useWallet();

  const handleWalletAction = async () => {
    try {
      if (isConnected) {
        await disconnectWallet();
      } else {
        await connectWallet();
      }
    } catch (error: any) {
      // Only log errors in development
      if (process.env.NODE_ENV !== 'production') {
        console.error('Wallet action failed:', error.message);
      }
      
      // Handle specific error types with user-friendly messages
      let userMessage = error.message || 'Wallet action failed';
      
      switch (error.code) {
        case 'FREIGHTER_NOT_INSTALLED':
          userMessage = 'Freighter wallet not found. Please install the Freighter browser extension from https://www.freighter.app/';
          // Open installation page in a new tab
          setTimeout(() => {
            window.open('https://www.freighter.app/', '_blank');
          }, 500);
          break;
        case 'FREIGHTER_CONNECT_FAILED':
          userMessage = 'Failed to connect to Freighter. Please make sure the extension is installed and unlocked.';
          break;
        case 'FREIGHTER_NO_PUBLIC_KEY':
          userMessage = 'Could not retrieve wallet information. Please check your Freighter settings.';
          break;
        case 'FREIGHTER_GENERIC_ERROR':
          userMessage = 'Connection failed. Please try again or check your wallet settings.';
          break;
      }
      
      // Show error to user (in a real app, use toast notifications)
      alert(userMessage);
    }
  };

  if (isConnected && publicKey) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
          Connected
        </span>
        <span className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-md">
          {truncateAddress(publicKey)}
        </span>
        <Button onClick={disconnectWallet} variant="outline" size="sm">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleWalletAction} disabled={connecting}>
      {connecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  );
}