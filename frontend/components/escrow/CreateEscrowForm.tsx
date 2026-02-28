'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWallet } from '@/store/useWallet';
import { toast } from 'sonner';
import { isValidStellarAddress, isValidStellarAmount, sanitizeInput } from '@/lib/utils';

export function CreateEscrowForm() {
  const { publicKey, isConnected } = useWallet();
  const [projectTitle, setProjectTitle] = useState('');
  const [freelancerAddress, setFreelancerAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const createEscrow = async () => {
    if (!isConnected || !publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    // Sanitize inputs
    const sanitizedTitle = sanitizeInput(projectTitle);
    const sanitizedAddress = sanitizeInput(freelancerAddress);
    const sanitizedAmount = sanitizeInput(amount);

    if (!sanitizedTitle.trim()) {
      toast.error('Please enter a project title');
      return;
    }

    if (!sanitizedAddress.trim()) {
      toast.error('Please enter freelancer address');
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
      // Simulate creating an escrow
      // In a real implementation, this would deploy a smart contract
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success(`Escrow created successfully! Project: "${sanitizedTitle}"`);
      setProjectTitle('');
      setFreelancerAddress('');
      setAmount('');
    } catch (error: any) {
      console.error('Escrow creation failed:', error);
      toast.error(error.message || 'Escrow creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="project-title">Project Title</Label>
        <Input
          id="project-title"
          placeholder="e.g., Website redesign"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          disabled={!isConnected || loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="freelancer-address">Freelancer Address</Label>
        <Input
          id="freelancer-address"
          placeholder="Enter freelancer's Stellar address (G...)"
          value={freelancerAddress}
          onChange={(e) => setFreelancerAddress(e.target.value)}
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
        onClick={createEscrow}
        disabled={!isConnected || loading || !projectTitle || !freelancerAddress || !amount}
        className="w-full"
      >
        {loading ? 'Creating Escrow...' : 'Create Escrow'}
      </Button>
    </div>
  );
}