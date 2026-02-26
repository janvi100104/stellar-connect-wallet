'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/store/useWallet';
import { Loader2 } from 'lucide-react';

export function BalanceCard() {
  const { balance, isConnected, connecting, fetchBalance } = useWallet();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Wallet Balance</CardTitle>
        <CardDescription>Your XLM balance on Stellar testnet</CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-lg">XLM Balance:</span>
              {connecting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="text-xl font-bold">
                  {balance !== null ? `${balance.toFixed(4)} XLM` : 'Loading...'}
                </span>
              )}
            </div>
            <button 
              onClick={fetchBalance}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Refresh Balance
            </button>
          </div>
        ) : (
          <p className="text-muted-foreground">Connect your wallet to view balance</p>
        )}
      </CardContent>
    </Card>
  );
}