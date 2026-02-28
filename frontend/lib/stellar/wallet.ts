// Utility functions for Stellar wallet operations
// Using official @stellar/freighter-api package

import freighter from '@stellar/freighter-api';
import type { 
  getAddress,
  signTransaction,
  isConnected,
  getNetwork,
  getNetworkDetails,
} from '@stellar/freighter-api';

// Re-export types
export type GetAddressResponse = Awaited<ReturnType<typeof getAddress>>;
export type SignTransactionResponse = Awaited<ReturnType<typeof signTransaction>>;
export type IsConnectedResponse = Awaited<ReturnType<typeof isConnected>>;
export type GetNetworkResponse = Awaited<ReturnType<typeof getNetwork>>;
export type GetNetworkDetailsResponse = Awaited<ReturnType<typeof getNetworkDetails>>;

export interface FreighterWallet {
  getAddress: () => Promise<GetAddressResponse>;
  signTransaction: (txXdr: string, opts?: { networkPassphrase?: string; address?: string }) => Promise<SignTransactionResponse>;
  isConnected: () => Promise<IsConnectedResponse>;
  getNetwork: () => Promise<GetNetworkResponse>;
  getNetworkDetails: () => Promise<GetNetworkDetailsResponse>;
  requestAccess: () => Promise<GetAddressResponse>;
}

// Check if Freighter extension is available (in browser)
export const isFreighterAvailable = (): boolean => {
  return typeof window !== 'undefined';
};

// Check if wallet is connected
export const checkFreighterConnection = async (): Promise<boolean> => {
  try {
    const result = await freighter.isConnected();
    return result.isConnected && !result.error;
  } catch (error) {
    console.error('Error checking Freighter connection:', error);
    return false;
  }
};

// Connect to Freighter wallet (request access)
export const connectToFreighter = async (): Promise<{ publicKey: string; name?: string }> => {
  try {
    // Request access to the wallet (this will prompt the user to connect)
    const result = await freighter.requestAccess();
    
    if (result.error) {
      throw new Error(result.error.message || 'Failed to connect to Freighter');
    }
    
    return {
      publicKey: result.address,
      name: undefined, // Freighter doesn't provide a name
    };
  } catch (error: any) {
    console.error('Error connecting to Freighter:', error);
    throw new Error(error.message || 'Failed to connect to Freighter wallet');
  }
};

// Get wallet address
export const getFreighterAddress = async (): Promise<string> => {
  try {
    const result = await freighter.getAddress();
    
    if (result.error) {
      throw new Error(result.error.message || 'Failed to get address');
    }
    
    return result.address;
  } catch (error: any) {
    console.error('Error getting address:', error);
    throw new Error(error.message || 'Failed to get wallet address');
  }
};

// Disconnect from Freighter wallet
// Note: Freighter API doesn't have a disconnect method
// We just clear our local state
export const disconnectFromFreighter = async (): Promise<void> => {
  // Freighter doesn't expose a disconnect method
  // The connection is managed by the extension itself
  console.log('Freighter disconnect: Clearing local state only');
};

// Get expected network from environment
export const getExpectedNetwork = (): string => {
  return process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'TESTNET';
};

// Validate network
export const validateNetwork = async (): Promise<{ 
  isValid: boolean; 
  currentNetwork?: string; 
  expectedNetwork: string;
  warning?: string;
  networkPassphrase?: string;
}> => {
  const expectedNetwork = getExpectedNetwork();

  try {
    const networkResult = await freighter.getNetwork();
    
    if (networkResult.error) {
      return { 
        isValid: false,
        expectedNetwork,
        warning: 'Could not verify network. Please ensure your Freighter wallet is unlocked.',
      };
    }
    
    const currentNetwork = networkResult.network; // e.g., 'PUBLIC', 'TESTNET', 'FUTURENET'
    const networkPassphrase = networkResult.networkPassphrase;
    
    // Map network names to expected format
    const networkMap: Record<string, string> = {
      'PUBLIC': 'PUBLIC',
      'TESTNET': 'TESTNET',
      'FUTURENET': 'FUTURENET',
    };
    
    const normalizedCurrent = networkMap[currentNetwork?.toUpperCase()] || currentNetwork;
    const normalizedExpected = networkMap[expectedNetwork.toUpperCase()] || expectedNetwork;
    
    const isValid = normalizedCurrent === normalizedExpected;
    
    if (!isValid) {
      return {
        isValid: false,
        currentNetwork: normalizedCurrent,
        expectedNetwork: normalizedExpected,
        warning: `Wallet is set to ${normalizedCurrent}, but expected ${normalizedExpected}. Please switch your Freighter wallet to the correct network.`,
        networkPassphrase,
      };
    }
    
    return {
      isValid: true,
      currentNetwork: normalizedCurrent,
      expectedNetwork: normalizedExpected,
      networkPassphrase,
    };
  } catch (error: any) {
    console.error('Error validating network:', error);
    return { 
      isValid: false,
      expectedNetwork,
      warning: error.message || 'Could not verify network',
    };
  }
};

// Get network details
export const getFreighterNetworkDetails = async (): Promise<GetNetworkDetailsResponse> => {
  try {
    const result = await freighter.getNetworkDetails();
    
    if (result.error) {
      throw new Error(result.error.message || 'Failed to get network details');
    }
    
    return result;
  } catch (error: any) {
    console.error('Error getting network details:', error);
    throw new Error(error.message || 'Failed to get network details');
  }
};

// Sign a transaction using Freighter
export const signTransactionWithFreighter = async (
  transactionXdr: string,
  opts?: { networkPassphrase?: string; address?: string }
): Promise<string> => {
  try {
    const result = await freighter.signTransaction(transactionXdr, opts);
    
    if (result.error) {
      throw new Error(result.error.message || 'Failed to sign transaction');
    }
    
    return result.signedTxXdr;
  } catch (error: any) {
    console.error('Error signing transaction:', error);
    throw new Error(error.message || 'Failed to sign transaction');
  }
};

// Get installation instructions
export const getInstallationInstructions = (): string => {
  if (typeof window === 'undefined') {
    return 'Please check this page in a browser with the Freighter extension installed.';
  }

  return 'Freighter wallet integration is ready!';
};