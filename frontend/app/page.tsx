'use client';

import { WalletButton } from '@/components/wallet/WalletButton';
import { BalanceCard } from '@/components/wallet/BalanceCard';
import { SimplePaymentForm } from '@/components/wallet/SimplePaymentForm';
import { CreateEscrowForm } from '@/components/escrow/CreateEscrowForm';
import { EscrowCard } from '@/components/escrow/EscrowCard';
import { Toaster } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Sample escrow data for demonstration
const sampleEscrow = {
  id: 'ESCROW_' + Date.now(),
  title: 'Website Redesign',
  client: 'GBDZTQPCQXBV7IVJOGD57T3JYQFKVDUEROTDNQD5J4JSPJXQIKMC542F',
  freelancer: 'GAJKTV5UXWLGCJLC5ZHQQW5IJZJUCUM2DKCSLL34NPPYUDKPB3JX44QP',
  amount: 100,
  currency: 'XLM' as const,
  status: 'created' as const,
  contractAddress: 'CA7DLZUPFH6KD4D5LK4YWQABNAEAYZ77XX5ADV7HEMWPK6NZY7IE765R',
  createdAt: new Date(),
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            TrustLance
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Secure freelance payments on Stellar blockchain. Get paid safely, every time.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Wallet Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Connection</CardTitle>
                <CardDescription>Connect your Stellar wallet to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8">
                  <WalletButton />
                </div>
              </CardContent>
            </Card>
            
            <BalanceCard />
          </div>
          
          {/* Middle Column - Escrow Creation */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Escrow</CardTitle>
                <CardDescription>Start a new escrow for your freelance project</CardDescription>
              </CardHeader>
              <CardContent>
                <CreateEscrowForm />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>About TrustLance</CardTitle>
                <CardDescription>Secure escrow platform for freelancers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>1% fee vs 20% on traditional platforms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Instant settlements (not 14-day holds)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Transparent escrow system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Cross-border friendly with no wire fees</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Escrow Details */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Escrow</CardTitle>
                <CardDescription>Sample escrow contract</CardDescription>
              </CardHeader>
              <CardContent>
                <EscrowCard escrow={sampleEscrow} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Other wallet operations</CardDescription>
              </CardHeader>
              <CardContent>
                <SimplePaymentForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Toaster position="top-right" />
    </div>
  );
}