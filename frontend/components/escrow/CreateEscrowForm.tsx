'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWallet } from '@/store/useWallet';
import { toast } from 'sonner';

export function CreateEscrowForm() {
  const { publicKey, isConnected } = useWallet();
  const [projectTitle, setProjectTitle] = useState('');
  const [freelancerAddress, setFreelancerAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidStellarAddress = (address: string): boolean => {
    // Basic validation for Stellar address format (starts with G and has 56 characters)
    const stellarAddressRegex = /^G[A-Z2-7]{55}$/;
    return stellarAddressRegex.test(address);
  };

  const createEscrow = async () => {
    if (!isConnected || !publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!projectTitle.trim()) {
      toast.error('Please enter a project title');
      return;
    }

    if (!freelancerAddress.trim()) {
      toast.error('Please enter freelancer address');
      return;
    }

    if (!isValidStellarAddress(freelancerAddress)) {
      toast.error('Invalid Stellar address format');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      // Simulate creating an escrow
      // In a real implementation, this would deploy a smart contract
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Escrow created successfully! Project: "${projectTitle}"`);
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