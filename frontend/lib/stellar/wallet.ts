// Utility functions for Stellar wallet operations

export interface FreighterWallet {
  isConnected: () => Promise<boolean>;
  connect: () => Promise<boolean>;
  disconnect: () => Promise<boolean>;
  getPublicKey: () => Promise<{ publicKey: string }>;
  getNetwork: () => Promise<{ network: string; networkPassphrase: string }>;
  signTransaction: (tx: string, opts?: { network?: string }) => Promise<{ signedTx: string }>;
}

declare global {
  interface Window {
    freighter: FreighterWallet | undefined;
  }
}

export const isFreighterAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.freighter !== 'undefined';
};

export const checkFreighterConnection = async (): Promise<boolean> => {
  if (!isFreighterAvailable()) {
    return false;
  }
  
  try {
    return await window.freighter!.isConnected();
  } catch (error) {
    console.error('Error checking Freighter connection:', error);
    return false;
  }
};

export const getExpectedNetwork = (): string => {
  return process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'TESTNET';
};

export const validateNetwork = async (): Promise<{ isValid: boolean; currentNetwork?: string; expectedNetwork: string }> => {
  const expectedNetwork = getExpectedNetwork();
  
  if (!isFreighterAvailable()) {
    return { isValid: false, expectedNetwork };
  }
  
  try {
    const { network } = await window.freighter!.getNetwork();
    return {
      isValid: network === expectedNetwork,
      currentNetwork: network,
      expectedNetwork
    };
  } catch (error) {
    console.warn('Could not verify network:', error);
    return { isValid: false, expectedNetwork };
  }
};

export const getInstallationInstructions = (): string => {
  if (typeof window === 'undefined') {
    return 'Please check this page in a browser with the Freighter extension installed.';
  }
  
  if (typeof window.freighter === 'undefined') {
    return 'Freighter wallet extension not detected. Please install it from https://www.freighter.app/';
  }
  
  return 'Freighter is installed and available!';
};