import { create } from 'zustand';
import { Keypair, Networks } from '@stellar/stellar-sdk';
import { isFreighterAvailable, checkFreighterConnection, validateNetwork, getInstallationInstructions } from '@/lib/stellar/wallet';

interface WalletState {
  publicKey: string | null;
  balance: number | null;
  isConnected: boolean;
  connecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  fetchBalance: () => Promise<void>;
}

declare global {
  interface Window {
    freighter: any;
  }
}

// Get the horizon URL from environment or default to testnet
const HORIZON_URL = process.env.NEXT_PUBLIC_HORIZON_URL || 'https://horizon-testnet.stellar.org';

export const useWallet = create<WalletState>((set, get) => ({
  publicKey: null,
  balance: null,
  isConnected: false,
  connecting: false,

  connectWallet: async () => {
    set({ connecting: true });
    
    try {
      // Check if Freighter wallet is installed
      if (!isFreighterAvailable()) {
        const error = new Error('Freighter wallet not installed. Please install the Freighter browser extension from https://www.freighter.app/');
        (error as any).code = 'FREIGHTER_NOT_INSTALLED';
        (error as any).debugInfo = {
          windowExists: typeof window !== 'undefined',
          freighterType: typeof window?.freighter
        };
        throw error;
      }

      // Check if wallet is connected
      const isConnected = await checkFreighterConnection();
      
      // If not connected, attempt to connect
      if (!isConnected) {
        const result = await window.freighter!.connect();
        
        if (!result) {
          const error = new Error('Failed to connect to Freighter wallet. Please make sure it is unlocked and properly configured.');
          (error as any).code = 'FREIGHTER_CONNECT_FAILED';
          throw error;
        }
      }

      // Get the public key
      const publicKeyResult = await window.freighter!.getPublicKey();
      const publicKey = typeof publicKeyResult === 'string' ? publicKeyResult : publicKeyResult?.publicKey;
      
      if (!publicKey) {
        const error = new Error('Failed to retrieve public key from wallet.');
        (error as any).code = 'FREIGHTER_NO_PUBLIC_KEY';
        throw error;
      }
      
      // Check network (optional - for validation)
      const networkValidation = await validateNetwork();
      
      if (!networkValidation.isValid && networkValidation.currentNetwork) {
        console.warn(`Wallet connected to ${networkValidation.currentNetwork}, but expected ${networkValidation.expectedNetwork}`);
      }
      
      set({ publicKey, isConnected: true });
      
      // Fetch balance after connecting
      await get().fetchBalance();
    } catch (error: any) {
      // Only log errors in development, not in production
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error connecting wallet:', error);
        if (error.code) console.error('Error code:', error.code);
        if (error.debugInfo) console.error('Error debug info:', error.debugInfo);
      }
      
      // Reset connection state on error
      set({ publicKey: null, isConnected: false });
      
      // Re-throw with proper error code for UI handling
      if (error.code) {
        throw error;
      } else {
        const newError = new Error(error.message || 'Failed to connect wallet');
        (newError as any).code = 'FREIGHTER_GENERIC_ERROR';
        throw newError;
      }
    } finally {
      set({ connecting: false });
    }
  },

  disconnectWallet: async () => {
    try {
      // Check if Freighter is available and connected
      const isConnected = await checkFreighterConnection();
      if (isConnected && window.freighter) {
        await window.freighter.disconnect();
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      // Continue with local state reset even if disconnect fails
    } finally {
      // Always reset local state
      set({ 
        publicKey: null, 
        balance: null, 
        isConnected: false 
      });
    }
  },

  fetchBalance: async () => {
    if (!get().publicKey) return;

    try {
      // Using direct fetch API instead of Server for client-side compatibility
      const response = await fetch(`${HORIZON_URL}/accounts/${get().publicKey}`);
      const data = await response.json();
      
      if (data && data.balances) {
        const xlmBalance = data.balances.find((balance: any) => 
          balance.asset_type === 'native'
        );

        if (xlmBalance) {
          set({ balance: parseFloat(xlmBalance.balance) });
        }
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      set({ balance: null });
    }
  },
}));