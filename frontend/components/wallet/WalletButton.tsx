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
        disconnectWallet();
      } else {
        await connectWallet();
      }
    } catch (error: any) {
      console.error('Wallet action failed:', error.message);
      // In a real app, you'd want to show this error to the user
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