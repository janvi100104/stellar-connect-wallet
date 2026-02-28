'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WalletButton } from '@/components/wallet/WalletButton';
import { 
  Check, 
  DollarSign, 
  LayoutDashboard, 
  Rocket, 
  Shield, 
  Zap,
  Menu,
  X,
  TrendingUp,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function PricingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectAmount, setProjectAmount] = useState(5000);

  const platformFees = [
    { platform: 'Upwork', percentage: 20, color: 'bg-red-500' },
    { platform: 'Fiverr', percentage: 20, color: 'bg-red-500' },
    { platform: 'Freelancer', percentage: 10, color: 'bg-orange-500' },
    { platform: 'PayPal', percentage: 5, color: 'bg-blue-500' },
    { platform: 'TrustLance', percentage: 1, color: 'bg-green-500', highlight: true },
  ];

  const feeExamples = [
    { amount: 500, trustlance: 5, upwork: 100, savings: 95 },
    { amount: 1000, trustlance: 10, upwork: 200, savings: 190 },
    { amount: 5000, trustlance: 50, upwork: 1000, savings: 950 },
    { amount: 10000, trustlance: 100, upwork: 2000, savings: 1900 },
    { amount: 50000, trustlance: 500, upwork: 10000, savings: 9500 },
  ];

  const allFeatures = [
    'Unlimited escrows',
    'Smart contracts on Stellar',
    'Instant settlement (3-5 seconds)',
    'Real-time tracking',
    'Email notifications',
    'Transaction history',
    'Multi-wallet support',
    '24/7 customer support',
    'Dispute resolution',
    'Milestone management',
    'API access',
    'Mobile responsive',
  ];

  const faqs = [
    {
      question: 'Are there any hidden fees?',
      answer: 'Absolutely not! The 1% fee is all-inclusive. No setup fees, no monthly subscriptions, no withdrawal fees, no currency conversion fees.',
    },
    {
      question: 'When do I pay the fee?',
      answer: 'The fee is automatically deducted when the escrow is funded. For a $1,000 escrow, the client deposits $1,010 ($1,000 for freelancer + $10 fee).',
    },
    {
      question: 'Do you charge for failed transactions?',
      answer: 'No! You only pay the fee when a transaction successfully completes. Failed transactions only cost the minimal Stellar network fee (~$0.00001).',
    },
    {
      question: 'Is there a minimum or maximum amount?',
      answer: 'Minimum escrow is 10 XLM (~$1). No maximum limit, though very large escrows may require additional verification for security.',
    },
  ];

  const calculateFee = (amount: number, percentage: number) => {
    return (amount * percentage / 100).toFixed(2);
  };

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
            Pricing
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Always 1% - No hidden fees, no surprises, no subscriptions
          </p>
        </div>
      </section>

      {/* Main Pricing Card */}
      <section className="py-12 -mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-blue-500 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white text-center">
              <DollarSign className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-2">Standard Plan</h2>
              <p className="text-blue-100 text-lg">Perfect for freelancers of all sizes</p>
            </div>
            
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  1%
                </div>
                <div className="text-xl text-slate-600">per successful transaction</div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    What's Included
                  </h3>
                  <ul className="space-y-3">
                    {allFeatures.slice(0, 6).map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-700">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    Plus Much More
                  </h3>
                  <ul className="space-y-3">
                    {allFeatures.slice(6).map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-700">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Fee Calculator */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
                <h3 className="font-bold text-slate-900 mb-6 text-center">
                  Calculate Your Savings
                </h3>
                
                {/* Slider */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-700 mb-4">
                    Project Amount: 
                    <span className="ml-2 text-lg font-bold text-blue-600">
                      ${projectAmount.toLocaleString()}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="100000"
                    step="100"
                    value={projectAmount}
                    onChange={(e) => setProjectAmount(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>$100</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Comparison */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="text-sm text-slate-600 mb-2">TrustLance Fee</div>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      ${calculateFee(projectAmount, 1)}
                    </div>
                    <div className="text-xs text-slate-500">1%</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="text-sm text-slate-600 mb-2">Upwork Fee</div>
                    <div className="text-3xl font-bold text-red-600 mb-1">
                      ${calculateFee(projectAmount, 20)}
                    </div>
                    <div className="text-xs text-slate-500">20%</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border-2 border-green-500">
                    <div className="text-sm text-green-600 mb-2">You Save</div>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      ${(projectAmount * 0.19).toFixed(2)}
                    </div>
                    <div className="text-xs text-green-600">19% savings</div>
                  </div>
                </div>
              </div>

              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6 h-auto"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Start Free - No Signup Required
              </Button>

              <p className="text-center text-sm text-slate-500 mt-4">
                No credit card required • Free to use • Pay only on successful transactions
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Fee Examples Table */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              See How Much You'll Save
            </h2>
            <p className="text-xl text-slate-600">
              Real examples of fees across different project sizes
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">Project Amount</th>
                  <th className="text-center py-4 px-6 font-semibold text-green-600">TrustLance (1%)</th>
                  <th className="text-center py-4 px-6 font-semibold text-red-600">Upwork (20%)</th>
                  <th className="text-center py-4 px-6 font-semibold text-blue-600">You Save</th>
                </tr>
              </thead>
              <tbody>
                {feeExamples.map((example, index) => (
                  <tr 
                    key={index} 
                    className={cn(
                      'border-b border-slate-100 hover:bg-slate-50 transition-colors',
                      example.amount === projectAmount && 'bg-blue-50'
                    )}
                  >
                    <td className="py-4 px-6 font-medium text-slate-900">
                      ${example.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                        ${example.trustlance}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold">
                        ${example.upwork}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                        ${example.savings}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-green-600 font-semibold mt-8 text-lg">
            On a $5,000 project, save $950 compared to traditional platforms!
          </p>
        </div>
      </section>

      {/* Visual Comparison */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Fee Comparison: ${projectAmount.toLocaleString()} Project
            </h2>
            <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          </div>

          <div className="space-y-6">
            {platformFees.map((item, index) => (
              <div 
                key={index}
                className={cn(
                  'flex items-center gap-6 p-6 rounded-2xl transition-all',
                  item.highlight 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 shadow-lg scale-105' 
                    : 'bg-white border border-slate-200'
                )}
              >
                <div className="w-32 font-bold text-slate-900">{item.platform}</div>
                <div className="flex-1">
                  <div className="h-12 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={cn('h-full rounded-full transition-all duration-500', item.color)}
                      style={{ width: `${item.percentage * 5}%` }}
                    />
                  </div>
                </div>
                <div className="w-24 text-right">
                  <span className={cn(
                    'text-2xl font-bold',
                    item.highlight ? 'text-green-600' : 'text-slate-900'
                  )}>
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-32 text-right">
                  <span className={cn(
                    'font-semibold',
                    item.highlight ? 'text-green-600' : 'text-slate-600'
                  )}>
                    ${calculateFee(projectAmount, item.percentage)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Pricing FAQ
            </h2>
            <HelpCircle className="w-12 h-12 text-blue-600 mx-auto" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow">
                <CardHeader className="py-4">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-4">
                  <p className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Saving on Fees Today
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Join thousands of freelancers who keep more of what they earn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto rounded-xl shadow-2xl"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Create Your First Escrow
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
