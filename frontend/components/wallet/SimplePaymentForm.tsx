'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWallet } from '@/store/useWallet';
import { toast } from 'sonner';
import { isValidStellarAddress, isValidStellarAmount, sanitizeInput } from '@/lib/utils';

export function SimplePaymentForm() {
  const { publicKey, isConnected } = useWallet();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPayment = async () => {
    if (!isConnected || !publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    // Sanitize inputs
    const sanitizedAddress = sanitizeInput(recipientAddress);
    const sanitizedAmount = sanitizeInput(amount);

    if (!sanitizedAddress.trim()) {
      toast.error('Please enter recipient address');
      return;
    }

    if (!isValidStellarAddress(sanitizedAddress)) {
      toast.error('Invalid Stellar address format. Address must start with G and be 56 characters.');
      return;
    }

    if (!isValidStellarAmount(sanitizedAmount)) {
      toast.error('Please enter a valid amount (positive number with up to 7 decimal places)');
      return;
    }

    setLoading(true);

    try {
      // Using Stellar SDK to create and submit transaction
      // In a real implementation, this would involve creating a transaction and signing it with the wallet
      // For this demo, we'll simulate the transaction

      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success(`Successfully sent ${sanitizedAmount} XLM to ${sanitizedAddress.substring(0, 8)}...`);
      setRecipientAddress('');
      setAmount('');
    } catch (error: any) {
      console.error('Payment failed:', error);
      toast.error(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient Address</Label>
        <Input
          id="recipient"
          placeholder="Enter Stellar address (G...)"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          disabled={!isConnected || loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount (XLM)</Label>
        <Input
          id="amount"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!isConnected || loading}
          min="0"
          step="0.0000001"
        />
      </div>

      <Button
        onClick={sendPayment}
        disabled={!isConnected || loading || !recipientAddress || !amount}
        className="w-full"
      >
        {loading ? 'Sending...' : 'Send XLM'}
      </Button>
    </div>
  );
}