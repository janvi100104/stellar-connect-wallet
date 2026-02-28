'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WalletButton } from '@/components/wallet/WalletButton';
import { 
  ArrowRight, 
  Check, 
  DollarSign, 
  LayoutDashboard, 
  Rocket, 
  Shield, 
  Zap,
  Menu,
  X,
  Download,
  Upload,
  Eye,
  ThumbsUp
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'freelancer' | 'client'>('freelancer');

  const freelancerSteps = [
    {
      number: '01',
      title: 'Connect Your Wallet',
      description: 'Link your Freighter, xBull, or Albedo wallet in seconds. No account creation needed.',
      icon: Shield,
      details: [
        'Install Freighter browser extension',
        'Create or import your Stellar account',
        'Click "Connect Wallet" on TrustLance',
        'Approve the connection in Freighter',
      ],
    },
    {
      number: '02',
      title: 'Create or Accept Escrow',
      description: 'Either create a new escrow for your project or accept an existing one from a client.',
      icon: LayoutDashboard,
      details: [
        'Set project terms and milestones',
        'Define deliverables and timeline',
        'Agree on payment amount',
        'Client funds the escrow',
      ],
    },
    {
      number: '03',
      title: 'Complete the Work',
      description: 'Deliver your work according to the agreed terms and upload deliverables.',
      icon: Upload,
      details: [
        'Work on the project',
        'Submit progress updates',
        'Upload final deliverables',
        'Mark as complete',
      ],
    },
    {
      number: '04',
      title: 'Get Paid Instantly',
      description: 'Once the client approves, funds are released to your wallet in seconds.',
      icon: Zap,
      details: [
        'Client reviews your work',
        'Approves and releases payment',
        'XLM arrives in your wallet',
        'Transaction recorded on Stellar',
      ],
    },
  ];

  const clientSteps = [
    {
      number: '01',
      title: 'Connect Wallet & Fund',
      description: 'Connect your wallet and ensure you have enough XLM for the project.',
      icon: Shield,
      details: [
        'Install Freighter extension',
        'Fund your wallet with XLM',
        'Connect to TrustLance',
        'Ready to create escrow',
      ],
    },
    {
      number: '02',
      title: 'Create Escrow Contract',
      description: 'Set up the escrow with project details, amount, and release conditions.',
      icon: LayoutDashboard,
      details: [
        'Enter project description',
        'Set payment amount',
        'Define milestones (optional)',
        'Add freelancer\'s wallet address',
      ],
    },
    {
      number: '03',
      title: 'Fund the Escrow',
      description: 'Deposit the agreed amount into the secure smart contract escrow.',
      icon: DollarSign,
      details: [
        'Review escrow terms',
        'Approve transaction in wallet',
        'Funds locked in smart contract',
        'Freelancer can see funds secured',
      ],
    },
    {
      number: '04',
      title: 'Review & Release',
      description: 'Review the completed work and release payment with one click.',
      icon: ThumbsUp,
      details: [
        'Review delivered work',
        'Request revisions if needed',
        'Approve final deliverables',
        'Release payment instantly',
      ],
    },
  ];

  const currentSteps = activeTab === 'freelancer' ? freelancerSteps : clientSteps;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TrustLance
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/#features" className="text-slate-600 hover:text-slate-900 transition-colors">
                Features
              </Link>
              <Link href="/#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">
                How It Works
              </Link>
              <Link href="/#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
                Pricing
              </Link>
              <WalletButton />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700" />
        
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-overlay filter blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 border-0">
            Process
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            How TrustLance Works
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Get started in minutes, get paid in seconds
          </p>

          {/* Role Toggle */}
          <div className="inline-flex bg-white/10 backdrop-blur-xl rounded-xl p-1">
            <button
              onClick={() => setActiveTab('freelancer')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'freelancer'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              For Freelancers
            </button>
            <button
              onClick={() => setActiveTab('client')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'client'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              For Clients
            </button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {currentSteps.map((step, index) => (
              <div 
                key={index}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Step Card */}
                <div className="flex-1 w-full">
                  <Card className="border-slate-200 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                          {step.number}
                        </div>
                        <step.icon className="w-10 h-10 text-blue-600" />
                      </div>
                      <CardTitle className="text-2xl mb-2">{step.title}</CardTitle>
                      <CardDescription className="text-base">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-700">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Visual Element */}
                <div className="flex-1 w-full flex justify-center">
                  <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center">
                      <step.icon className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                      <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {step.number}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Complete Transaction Flow
            </h2>
            <p className="text-xl text-slate-600">
              From start to finish in 4 simple steps
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-indigo-600 hidden md:block" />

            <div className="space-y-8">
              {[
                { title: 'Agreement', desc: 'Both parties agree on terms', time: 'Day 1' },
                { title: 'Escrow Creation', desc: 'Client creates and funds escrow', time: 'Day 1' },
                { title: 'Work Delivery', desc: 'Freelancer completes work', time: 'Days 2-14' },
                { title: 'Payment Release', desc: 'Funds released instantly', time: 'Day 15' },
              ].map((item, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                      <Badge className="bg-blue-100 text-blue-700">{item.time}</Badge>
                    </div>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Create your first escrow in under 5 minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto rounded-xl shadow-2xl"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Create Escrow Now
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6 h-auto rounded-xl backdrop-blur-sm"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">TrustLance</span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2024 TrustLance. Built on Stellar.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
