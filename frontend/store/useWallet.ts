import { create } from 'zustand';
import { 
  connectToFreighter, 
  disconnectFromFreighter, 
  checkFreighterConnection, 
  validateNetwork,
  isFreighterAvailable,
} from '@/lib/stellar/wallet';

interface WalletState {
  publicKey: string | null;
  balance: number | null;
  isConnected: boolean;
  connecting: boolean;
  loading: boolean;
  network: string | null;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  fetchBalance: () => Promise<void>;
  clearError: () => void;
}

// Get the horizon URL from environment or default to testnet
const HORIZON_URL = process.env.NEXT_PUBLIC_HORIZON_URL || 'https://horizon-testnet.stellar.org';
const EXPECTED_NETWORK = process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'TESTNET';

export const useWallet = create<WalletState>((set, get) => ({
  publicKey: null,
  balance: null,
  isConnected: false,
  connecting: false,
  loading: false,
  network: null,
  error: null,

  clearError: () => set({ error: null }),

  connectWallet: async () => {
    set({ connecting: true, error: null });

    try {
      // Check if Freighter wallet is installed
      if (!isFreighterAvailable()) {
        const error = new Error('Freighter wallet not installed. Please install the Freighter browser extension from https://www.freighter.app/');
        (error as any).code = 'FREIGHTER_NOT_INSTALLED';
        throw error;
      }

      // Connect to Freighter and get public key
      const { publicKey, name } = await connectToFreighter();

      if (!publicKey) {
        const error = new Error('Failed to retrieve public key from wallet.');
        (error as any).code = 'FREIGHTER_NO_PUBLIC_KEY';
        throw error;
      }

      // Validate network (shows warning if needed)
      const networkValidation = await validateNetwork();

      if (networkValidation.warning) {
        console.warn(networkValidation.warning);
      }

      set({ 
        publicKey, 
        isConnected: true,
        network: EXPECTED_NETWORK,
        error: null
      });

      // Fetch balance after connecting
      await get().fetchBalance();
      
    } catch (error: any) {
      // Only log errors in development, not in production
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error connecting wallet:', error);
        if (error.code) console.error('Error code:', error.code);
      }

      // Reset connection state on error
      set({ 
        publicKey: null, 
        isConnected: false,
        error: error.message || 'Failed to connect wallet'
      });

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
      await disconnectFromFreighter();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      // Continue with local state reset even if disconnect fails
    } finally {
      // Always reset local state completely
      set({
        publicKey: null,
        balance: null,
        isConnected: false,
        connecting: false,
        loading: false,
        network: null,
        error: null
      });
    }
  },

  fetchBalance: async () => {
    const publicKey = get().publicKey;
    if (!publicKey) {
      console.warn('Cannot fetch balance: no public key available');
      return;
    }

    set({ loading: true });

    try {
      const response = await fetch(`${HORIZON_URL}/accounts/${publicKey}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          // Account doesn't exist yet - needs to be funded
          set({ balance: 0, error: null, loading: false });
          return;
        }
        throw new Error(`Failed to fetch account: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();

      if (data && data.balances) {
        const xlmBalance = data.balances.find((balance: any) =>
          balance.asset_type === 'native'
        );

        if (xlmBalance) {
          set({ balance: parseFloat(xlmBalance.balance), error: null });
        } else {
          set({ balance: 0, error: null });
        }
      } else {
        set({ balance: null });
      }
    } catch (error: any) {
      console.error('Error fetching balance:', error);
      set({ 
        balance: null,
        error: `Failed to fetch balance: ${error.message}`
      });
    } finally {
      set({ loading: false });
    }
  },
}));