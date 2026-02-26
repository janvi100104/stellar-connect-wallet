import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
