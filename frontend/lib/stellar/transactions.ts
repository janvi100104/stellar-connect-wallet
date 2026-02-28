/**
 * Stellar Transaction Utilities
 * Handles creating, signing, and submitting transactions on Stellar network
 */

import {
  TransactionBuilder,
  Networks,
  Operation,
  StrKey,
  Memo,
  Transaction,
  FeeBumpTransaction,
  Horizon,
  xdr,
  Account,
  Asset,
} from '@stellar/stellar-sdk';
import freighter from '@stellar/freighter-api';

// Get network configuration from environment
const NETWORK = process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'TESTNET';
const HORIZON_URL = process.env.NEXT_PUBLIC_HORIZON_URL || 'https://horizon-testnet.stellar.org';
const SOROBAN_RPC_URL = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL || 'https://soroban-testnet.stellar.org';

// Initialize Horizon server
const horizonServer = new Horizon.Server(HORIZON_URL);

// Get network passphrase
export function getNetworkPassphrase(): string {
  switch (NETWORK.toUpperCase()) {
    case 'PUBLIC':
      return Networks.PUBLIC;
    case 'FUTURENET':
      return Networks.FUTURENET;
    case 'TESTNET':
    default:
      return Networks.TESTNET;
  }
}

/**
 * Interface for payment transaction parameters
 */
export interface PaymentTransactionParams {
  sourcePublicKey: string;
  destinationPublicKey: string;
  amount: string; // In XLM (will be converted to stroops)
  memo?: string;
}

/**
 * Interface for transaction result
 */
export interface TransactionResult {
  success: boolean;
  transactionHash?: string;
  transactionXdr?: string;
  ledger?: number;
  createdAt?: string;
  error?: string;
  errorCode?: string;
}

/**
 * Create and submit a payment transaction
 * @param params - Payment transaction parameters
 * @returns Transaction result with hash or error
 */
export async function createAndSubmitPayment(
  params: PaymentTransactionParams
): Promise<TransactionResult> {
  const { sourcePublicKey, destinationPublicKey, amount, memo } = params;

  try {
    // Validate addresses
    if (!StrKey.isValidEd25519PublicKey(sourcePublicKey)) {
      return {
        success: false,
        error: 'Invalid source public key',
        errorCode: 'INVALID_SOURCE_ADDRESS',
      };
    }

    if (!StrKey.isValidEd25519PublicKey(destinationPublicKey)) {
      return {
        success: false,
        error: 'Invalid destination public key',
        errorCode: 'INVALID_DESTINATION_ADDRESS',
      };
    }

    // Parse amount and convert to stroops (1 XLM = 10,000,000 stroops)
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return {
        success: false,
        error: 'Invalid amount',
        errorCode: 'INVALID_AMOUNT',
      };
    }

    // Get source account sequence number
    const horizonAccount = await horizonServer.accounts().accountId(sourcePublicKey).call();
    const sequence = horizonAccount.sequence;
    
    // Create Account object for TransactionBuilder
    const sourceAccount = new Account(sourcePublicKey, sequence);

    // Build transaction with standard base fee (100 stroops)
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: '100', // Base fee in stroops
      networkPassphrase: getNetworkPassphrase(),
    })
      .addOperation(
        Operation.payment({
          destination: destinationPublicKey,
          asset: Asset.native(),
          amount: amountNum.toFixed(7),
        })
      )
      .setTimeout(180) // 3 minutes
      .build();

    // Add memo if provided
    if (memo) {
      transaction.memo = Memo.text(memo);
    }

    // Sign transaction with Freighter
    const signedTransactionXdr = await freighter.signTransaction(transaction.toXDR(), {
      networkPassphrase: getNetworkPassphrase(),
    });

    if (signedTransactionXdr.error) {
      return {
        success: false,
        error: signedTransactionXdr.error.message || 'Failed to sign transaction',
        errorCode: 'SIGNING_FAILED',
      };
    }

    // Submit transaction to Horizon
    const signedTransaction = TransactionBuilder.fromXDR(
      signedTransactionXdr.signedTxXdr,
      getNetworkPassphrase()
    ) as Transaction | FeeBumpTransaction;

    const result = await horizonServer.submitTransaction(signedTransaction);

    return {
      success: true,
      transactionHash: result.hash,
      transactionXdr: result.envelope_xdr,
      ledger: result.ledger,
    };
  } catch (error: any) {
    console.error('Transaction failed:', error);

    // Handle specific error types
    if (error.response?.status === 400) {
      return {
        success: false,
        error: error.response.data.extras.result_codes.operations?.[0] || 'Transaction failed',
        errorCode: 'OPERATION_FAILED',
      };
    }

    if (error.response?.status === 504) {
      return {
        success: false,
        error: 'Horizon server timeout. Please try again.',
        errorCode: 'TIMEOUT',
      };
    }

    if (error.message?.includes('rejected') || error.message?.includes('cancelled')) {
      return {
        success: false,
        error: 'Transaction was cancelled',
        errorCode: 'USER_CANCELLED',
      };
    }

    return {
      success: false,
      error: error.message || 'Transaction failed',
      errorCode: error.code || 'UNKNOWN_ERROR',
    };
  }
}

/**
 * Check account balance
 * @param publicKey - Stellar public key
 * @returns Account balance in XLM or null if account doesn't exist
 */
export async function getAccountBalance(publicKey: string): Promise<number | null> {
  try {
    if (!StrKey.isValidEd25519PublicKey(publicKey)) {
      throw new Error('Invalid public key');
    }

    const account = await horizonServer.accounts().accountId(publicKey).call();
    const xlmBalance = account.balances.find(b => b.asset_type === 'native');
    return xlmBalance ? parseFloat(xlmBalance.balance) : 0;
  } catch (error: any) {
    if (error.response?.status === 404) {
      // Account doesn't exist yet
      return null;
    }
    throw error;
  }
}

/**
 * Check if account exists
 * @param publicKey - Stellar public key
 * @returns true if account exists, false otherwise
 */
export async function accountExists(publicKey: string): Promise<boolean> {
  try {
    if (!StrKey.isValidEd25519PublicKey(publicKey)) {
      return false;
    }

    await horizonServer.accounts().accountId(publicKey).call();
    return true;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return false;
    }
    throw error;
  }
}

/**
 * Get transaction status
 * @param transactionHash - Transaction hash
 * @returns Transaction details or null if not found
 */
export async function getTransactionStatus(transactionHash: string) {
  try {
    const transaction = await horizonServer.transactions().transaction(transactionHash).call();
    return {
      hash: transaction.hash,
      ledger: transaction.ledger,
      createdAt: transaction.created_at,
      successful: transaction.successful,
      operationCount: transaction.operation_count,
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * Get recent transactions for an account
 * @param publicKey - Stellar public key
 * @param limit - Number of transactions to fetch (default: 10)
 * @returns Array of recent transactions
 */
export async function getAccountTransactions(publicKey: string, limit: number = 10) {
  try {
    const transactions = await horizonServer
      .transactions()
      .forAccount(publicKey)
      .order('desc')
      .limit(limit)
      .call();

    return transactions.records.map(tx => ({
      hash: tx.hash,
      ledger: tx.ledger,
      createdAt: tx.created_at,
      successful: tx.successful,
      operationCount: tx.operation_count,
      feePaid: tx.fee_charged,
    }));
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

/**
 * Build transaction XDR for escrow operations
 * This is a placeholder for when the escrow contract is deployed
 */
export interface EscrowOperationParams {
  sourcePublicKey: string;
  escrowContractAddress: string;
  freelancerAddress: string;
  amount: string;
  deadline: number; // Unix timestamp
}

/**
 * Create escrow transaction (placeholder for Soroban integration)
 * Will be implemented when escrow contract is deployed
 */
export async function createEscrowTransaction(
  params: EscrowOperationParams
): Promise<TransactionResult> {
  // This will be implemented with Soroban contract integration
  return {
    success: false,
    error: 'Escrow contract not yet deployed',
    errorCode: 'CONTRACT_NOT_DEPLOYED',
  };
}

/**
 * Format transaction hash for display
 */
export function formatTransactionHash(hash: string, length: number = 8): string {
  if (!hash || hash.length <= length * 2) {
    return hash;
  }
  return `${hash.substring(0, length)}...${hash.substring(hash.length - length)}`;
}

/**
 * Get Stellar expert transaction URL for viewing on StellarExpert
 */
export function getStellarExpertUrl(txHash: string, network: string = NETWORK): string {
  const subdomain = network.toUpperCase() === 'PUBLIC' ? 'stellarexpert' : 'stellarexpert-test';
  return `https://${subdomain}.net/tx/${txHash}`;
}

/**
 * Get Stellar chain viewer URL
 */
export function getStellarChainUrl(txHash: string, network: string = NETWORK): string {
  if (network.toUpperCase() === 'PUBLIC') {
    return `https://stellarchain.io/tx/${txHash}`;
  }
  return `https://testnet.stellarchain.io/tx/${txHash}`;
}
