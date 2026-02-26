'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { toast } from 'sonner';
import { useWallet } from '@/store/useWallet';

interface Escrow {
  id: string;
  title: string;
  client: string;
  freelancer: string;
  amount: number;
  currency: 'XLM' | 'USDC';
  status: 'created' | 'funded' | 'released' | 'refunded';
  contractAddress: string;
  createdAt: Date;
}

export function EscrowCard({ escrow }: { escrow: Escrow }) {
  const { publicKey, isConnected } = useWallet();
  const [status, setStatus] = useState<Escrow['status']>(escrow.status);
  const [loading, setLoading] = useState(false);

  const isClient = publicKey === escrow.client;
  const isFreelancer = publicKey === escrow.freelancer;

  const fundEscrow = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!isClient) {
      toast.error('Only the client can fund the escrow');
      return;
    }

    setLoading(true);

    try {
      // Simulate funding escrow
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('funded');
      toast.success(`Successfully funded ${escrow.amount} ${escrow.currency}`);
    } catch (error: any) {
      console.error('Funding failed:', error);
      toast.error(error.message || 'Funding failed');
    } finally {
      setLoading(false);
    }
  };

  const releasePayment = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!isClient) {
      toast.error('Only the client can release the payment');
      return;
    }

    if (status !== 'funded') {
      toast.error('Escrow must be funded before releasing payment');
      return;
    }

    setLoading(true);

    try {
      // Simulate releasing payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('released');
      toast.success(`Successfully released payment to freelancer`);
    } catch (error: any) {
      console.error('Release failed:', error);
      toast.error(error.message || 'Release failed');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Escrow['status']) => {
    switch (status) {
      case 'created':
        return 'bg-yellow-100 text-yellow-800';
      case 'funded':
        return 'bg-blue-100 text-blue-800';
      case 'released':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{escrow.title}</CardTitle>
            <CardDescription>Escrow ID: {escrow.id.slice(0, 8)}...</CardDescription>
          </div>
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Client</p>
              <p className="font-mono text-sm">{escrow.client?.slice(0, 10)}...</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Freelancer</p>
              <p className="font-mono text-sm">{escrow.freelancer?.slice(0, 10)}...</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-bold">{escrow.amount} {escrow.currency}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Created</p>
            <p className="text-sm">{new Date(escrow.createdAt).toLocaleDateString()}</p>
          </div>
          
          <div className="pt-4 space-y-2">
            {status === 'created' && isClient && (
              <Button 
                onClick={fundEscrow} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Funding...' : 'Fund Escrow'}
              </Button>
            )}
            
            {status === 'funded' && isClient && (
              <Button 
                onClick={releasePayment} 
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Releasing...' : 'Release Payment'}
              </Button>
            )}
            
            {status === 'funded' && isFreelancer && (
              <p className="text-center text-sm text-green-600 font-medium">
                Waiting for client to release payment
              </p>
            )}
            
            {(status === 'released' || status === 'refunded') && (
              <p className="text-center text-sm text-gray-500">
                Escrow completed
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}