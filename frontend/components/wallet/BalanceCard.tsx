'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/store/useWallet';
import { Loader2, RefreshCw } from 'lucide-react';

export function BalanceCard() {
  const { balance, isConnected, connecting, loading, fetchBalance } = useWallet();

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
              {connecting || loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              ) : (
                <span className="text-xl font-bold text-green-600">
                  {balance !== null ? `${balance.toFixed(4)} XLM` : 'No balance'}
                </span>
              )}
            </div>
            <button
              onClick={fetchBalance}
              disabled={loading}
              className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh Balance'}
            </button>
          </div>
        ) : (
          <p className="text-muted-foreground">Connect your wallet to view balance</p>
        )}
      </CardContent>
    </Card>
  );
}