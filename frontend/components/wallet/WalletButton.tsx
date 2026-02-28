'use client';

import { Button } from '@/components/ui/button';
import { useWallet } from '@/store/useWallet';
import { truncateAddress } from '@/lib/utils';
import { Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function WalletButton() {
  const { publicKey, isConnected, connecting, error, connectWallet, disconnectWallet, clearError } = useWallet();

  const handleWalletAction = async () => {
    // Clear any previous errors
    clearError();
    
    try {
      if (isConnected) {
        await disconnectWallet();
        toast.success('Wallet disconnected');
      } else {
        await connectWallet();
        toast.success('Wallet connected successfully!');
      }
    } catch (error: any) {
      // Only log errors in development
      if (process.env.NODE_ENV !== 'production') {
        console.error('Wallet action failed:', error.message);
      }

      // Handle specific error types with user-friendly messages
      let userMessage = error.message || 'Wallet action failed';
      let isError = true;

      switch (error.code) {
        case 'FREIGHTER_NOT_INSTALLED':
          userMessage = 'Freighter wallet not found. Please install the Freighter browser extension.';
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
        case 'FREIGHTER_WRONG_NETWORK':
          userMessage = `Wrong network! ${error.message}`;
          break;
        case 'FREIGHTER_GENERIC_ERROR':
          userMessage = 'Connection failed. Please try again or check your wallet settings.';
          break;
        default:
          // Check if user rejected the connection
          if (error.message?.includes('rejected') || error.message?.includes('cancelled')) {
            userMessage = 'Connection request was cancelled.';
            isError = false; // Don't show as error toast
          }
          break;
      }

      // Show error to user using toast notifications
      if (isError) {
        toast.error(userMessage, {
          description: error.code ? `Error: ${error.code}` : undefined,
        });
      } else {
        toast.info(userMessage);
      }
    }
  };

  // Show error state if present
  if (error && isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Error
        </span>
        <Button onClick={() => clearError()} variant="outline" size="sm">
          Dismiss
        </Button>
      </div>
    );
  }

  if (isConnected && publicKey) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
          Connected
        </span>
        <span className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-md" title={publicKey}>
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