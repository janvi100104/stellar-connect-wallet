import { create } from 'zustand';
import { Keypair, Networks } from '@stellar/stellar-sdk';

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
      if (!window.freighter) {
        throw new Error('Freighter wallet not installed. Please install Freighter extension.');
      }

      // Check if wallet is unlocked
      const isUnlocked = await window.freighter.isUnlocked();
      if (!isUnlocked) {
        await window.freighter.connect();
      }

      // Get the public key
      const publicKey = await window.freighter.getPublicKey();
      
      set({ publicKey, isConnected: true });
      
      // Fetch balance after connecting
      await get().fetchBalance();
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      throw new Error(error.message || 'Failed to connect wallet');
    } finally {
      set({ connecting: false });
    }
  },

  disconnectWallet: () => {
    set({ 
      publicKey: null, 
      balance: null, 
      isConnected: false 
    });
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