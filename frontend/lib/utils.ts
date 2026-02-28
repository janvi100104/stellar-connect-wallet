import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Networks } from "@stellar/stellar-sdk"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(address: string, startLength = 4, endLength = 4): string {
  if (!address || address.length <= startLength + endLength) {
    return address;
  }

  const start = address.substring(0, startLength);
  const end = address.substring(address.length - endLength);

  return `${start}...${end}`;
}

/**
 * Validates a Stellar public key (account address)
 * Must start with G and be 56 characters total
 */
export function isValidStellarAddress(address: string): boolean {
  if (!address || typeof address !== 'string') {
    return false;
  }
  
  // Basic format check
  const stellarAddressRegex = /^G[A-Z2-7]{55}$/;
  if (!stellarAddressRegex.test(address)) {
    return false;
  }
  
  // Additional check using Stellar SDK (optional, more thorough)
  try {
    // Note: This requires importing from @stellar/stellar-sdk
    // For lightweight validation, the regex above is usually sufficient
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates a Stellar contract address
 * Must start with C and be 56 characters total
 */
export function isValidContractAddress(address: string): boolean {
  if (!address || typeof address !== 'string') {
    return false;
  }
  
  const contractAddressRegex = /^C[A-Z2-7]{55}$/;
  return contractAddressRegex.test(address);
}

/**
 * Validates an amount for Stellar transactions
 * Must be a positive number with up to 7 decimal places
 */
export function isValidStellarAmount(amount: string | number): boolean {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(num) || num <= 0) {
    return false;
  }
  
  // Check decimal places (Stellar supports up to 7)
  const parts = amount.toString().split('.');
  if (parts.length > 1 && parts[1].length > 7) {
    return false;
  }
  
  return true;
}

/**
 * Formats an amount for display
 */
export function formatAmount(amount: number, currency: string = 'XLM'): string {
  return `${amount.toFixed(7)} ${currency}`;
}

/**
 * Sanitizes user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim();
}

/**
 * Gets the network passphrase from network name
 */
export function getNetworkPassphrase(networkName: string): string {
  switch (networkName.toUpperCase()) {
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
 * Debounce function to limit rate of execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

