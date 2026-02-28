'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WalletButton } from '@/components/wallet/WalletButton';
import { 
  ArrowRight, 
  Check, 
  Clock, 
  DollarSign, 
  Globe, 
  LayoutDashboard, 
  Lock, 
  Rocket, 
  Shield, 
  Sparkles, 
  TrendingUp, 
  Users,
  Zap,
  ChevronDown,
  Star,
  ExternalLink,
  Menu,
  X,
  Smartphone,
  FileText,
  BarChart3,
  Headphones
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function FeaturesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allFeatures = [
    {
      icon: DollarSign,
      title: '1% Platform Fee',
      description: 'Save 19% compared to traditional freelance platforms. For a $1,000 project, pay only $10 instead of $200.',
      details: [
        'Transparent pricing with no hidden fees',
        'No monthly subscriptions',
        'No setup costs',
        'Pay only when transaction completes',
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Zap,
      title: 'Instant Settlements',
      description: 'Get paid in 3-5 seconds. No more 14-day waiting periods or bank delays.',
      details: [
        'Lightning-fast Stellar blockchain',
        '24/7 availability',
        'No banking hours restrictions',
        'Cross-border in seconds',
      ],
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: Lock,
      title: 'Secure Smart Escrow',
      description: 'Funds held in immutable smart contracts on Stellar blockchain. Completely secure and transparent.',
      details: [
        'Bank-level security',
        'Non-custodial (you control your funds)',
        'Immutable transaction records',
        'Automatic release conditions',
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Work with anyone, anywhere. No geographic restrictions or currency conversion headaches.',
      details: [
        'No country restrictions',
        'No currency conversion fees',
        'Universal payment method',
        'Borderless freelancing',
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Tracking',
      description: 'Monitor your escrow status live. Never wonder where your payment is with complete transparency.',
      details: [
        'Live status updates',
        'Transaction history',
        'Milestone tracking',
        'Email notifications',
      ],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      icon: Sparkles,
      title: 'Smart Contracts',
      description: 'Automated escrow contracts that execute automatically when conditions are met.',
      details: [
        'Self-executing agreements',
        'No manual intervention needed',
        'Tamper-proof terms',
        'Automatic dispute resolution',
      ],
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
    {
      icon: Smartphone,
      title: 'Multi-Wallet Support',
      description: 'Connect with Freighter, xBull, Albedo, LOBSTR, and more. Use the wallet you already trust.',
      details: [
        'Freighter integration',
        'xBull support',
        'Albedo compatible',
        'More wallets coming soon',
      ],
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
    },
    {
      icon: FileText,
      title: 'Milestone Management',
      description: 'Break large projects into milestones. Get paid progressively as you complete each phase.',
      details: [
        'Multi-phase projects',
        'Partial releases',
        'Clear deliverables',
        'Reduced risk for both parties',
      ],
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track your earnings, active escrows, and payment history all in one place.',
      details: [
        'Earnings overview',
        'Payment analytics',
        'Client history',
        'Export reports',
      ],
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      icon: Users,
      title: 'Reputation System',
      description: 'Build your freelance reputation on-chain. Verified reviews and completed projects.',
      details: [
        'Verified project history',
        'Client reviews',
        'Success rate tracking',
        'Portable reputation',
      ],
      color: 'text-rose-600',
      bgColor: 'bg-rose-100',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our team is here to help whenever you need. Fast response times and expert assistance.',
      details: [
        'Email support',
        'Discord community',
        'Comprehensive docs',
        'Video tutorials',
      ],
      color: 'text-violet-600',
      bgColor: 'bg-violet-100',
    },
    {
      icon: Shield,
      title: 'Dispute Resolution',
      description: 'Fair arbitration with neutral third-party arbiters. Evidence-based decisions.',
      details: [
        'Neutral arbiters',
        'Transparent process',
        'Evidence submission',
        'Fair outcomes',
      ],
      color: 'text-slate-600',
      bgColor: 'bg-slate-100',
    },
  ];

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
              <Link href="/#faq" className="text-slate-600 hover:text-slate-900 transition-colors">
                FAQ
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
          <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-overlay filter blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 border-0">
            Features
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Powerful Features for Modern Freelancers
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Everything you need to get paid safely and quickly on the Stellar blockchain
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((feature, index) => (
              <Card 
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-slate-200 bg-white"
              >
                <CardHeader>
                  <div className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110',
                    feature.bgColor
                  )}>
                    <feature.icon className={cn('w-7 h-7', feature.color)} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Built on Stellar Blockchain
            </h2>
            <p className="text-xl text-slate-600">
              Leveraging the power of the world's most efficient blockchain
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Why Stellar?
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Transaction Time', value: '3-5 seconds' },
                  { label: 'Transaction Cost', value: '~$0.00001' },
                  { label: 'Energy Efficient', value: 'Carbon neutral' },
                  { label: 'Uptime', value: '99.99%' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-slate-200">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-semibold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h4 className="font-semibold text-slate-900 mb-4">Stellar Network Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">7M+</div>
                  <div className="text-sm text-slate-600">Accounts</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-1">$2B+</div>
                  <div className="text-sm text-slate-600">Volume</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-600 mb-1">5s</div>
                  <div className="text-sm text-slate-600">Ledger Time</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">10+</div>
                  <div className="text-sm text-slate-600">Years Running</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Join thousands of freelancers getting paid safely and instantly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto rounded-xl shadow-2xl"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6 h-auto rounded-xl backdrop-blur-sm"
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              View Dashboard
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
