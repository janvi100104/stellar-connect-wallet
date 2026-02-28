'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WalletButton } from '@/components/wallet/WalletButton';
import { useWallet } from '@/store/useWallet';
import Link from 'next/link';
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
  Twitter,
  Github,
  MessageCircle
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Animation styles
const blobAnimation = `
  @keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
  }
  .animate-blob {
    animation: blob 10s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
  }
  @keyframes pulse-slow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }
`;

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { isConnected } = useWallet();

  const features = [
    {
      icon: DollarSign,
      title: '1% Fees',
      description: 'Save 19% compared to traditional platforms',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Zap,
      title: 'Instant Settlement',
      description: 'Get paid in seconds, not weeks',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: Lock,
      title: 'Secure Escrow',
      description: 'Funds protected by smart contracts',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Work across borders without restrictions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: TrendingUp,
      title: 'Transparent Tracking',
      description: 'Real-time escrow status updates',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      icon: Sparkles,
      title: 'Smart Contracts',
      description: 'Automated payments on Stellar',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Create Escrow',
      description: 'Set project terms and amount',
      icon: LayoutDashboard,
    },
    {
      number: '2',
      title: 'Fund Escrow',
      description: 'Client deposits funds securely',
      icon: DollarSign,
    },
    {
      number: '3',
      title: 'Complete Work',
      description: 'Deliver according to terms',
      icon: Rocket,
    },
    {
      number: '4',
      title: 'Get Paid',
      description: 'Instant payment release',
      icon: Zap,
    },
  ];

  const testimonials = [
    {
      content: "TrustLance saved me from payment disputes. The 1% fee vs 20% on Upwork is a game-changer!",
      author: 'Sarah Chen',
      role: 'Web Developer',
      rating: 5,
    },
    {
      content: "Finally, a platform that treats freelancers fairly. Instant payments and no ridiculous fees.",
      author: 'Marcus Johnson',
      role: 'Graphic Designer',
      rating: 5,
    },
    {
      content: "As a client, I love the transparency. Funds are locked safely and released automatically.",
      author: 'Emily Rodriguez',
      role: 'Startup Founder',
      rating: 5,
    },
  ];

  const stats = [
    { value: '$2.5M+', label: 'Escrowed' },
    { value: '1,200+', label: 'Users' },
    { value: '98%', label: 'Success Rate' },
    { value: '< 5s', label: 'Settlement' },
  ];

  const faqs = [
    {
      question: 'What is TrustLance?',
      answer: 'TrustLance is a blockchain-based escrow platform that protects freelancers and clients with smart contracts on the Stellar network. It ensures secure payments with minimal fees.',
    },
    {
      question: 'How much does it cost?',
      answer: 'Just 1% per transaction. No monthly fees, no hidden charges. For a $1,000 project, you pay only $10 in fees compared to $200 on traditional platforms.',
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No! Just connect your Stellar wallet (Freighter, xBull, Albedo, etc.) and you\'re ready to go. No email, password, or KYC required.',
    },
    {
      question: 'Which wallets are supported?',
      answer: 'We support Freighter, xBull, Albedo, LOBSTR, and any other Stellar-compatible wallet. More wallets are being added regularly.',
    },
    {
      question: 'Is my money safe?',
      answer: 'Yes! Funds are held in smart contracts on the Stellar blockchain. No one can access them except according to the agreed escrow terms.',
    },
    {
      question: 'How long does payment take?',
      answer: 'Instant! Once the client releases payment, funds arrive in your wallet within 3-5 seconds. No bank delays or waiting periods.',
    },
  ];

  return (
    <>
      <style>{blobAnimation}</style>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-x-hidden">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TrustLance
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">
                  How It Works
                </a>
                <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Pricing
                </a>
                <a href="#faq" className="text-slate-600 hover:text-slate-900 transition-colors">
                  FAQ
                </a>
                <WalletButton />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-slate-200">
                <div className="flex flex-col gap-4">
                  <a href="#features" className="text-slate-600 hover:text-slate-900">Features</a>
                  <a href="#how-it-works" className="text-slate-600 hover:text-slate-900">How It Works</a>
                  <a href="#pricing" className="text-slate-600 hover:text-slate-900">Pricing</a>
                  <a href="#faq" className="text-slate-600 hover:text-slate-900">FAQ</a>
                  <WalletButton />
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 animate-gradient" />
          
          {/* Floating Blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob" />
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Logo Animation */}
            <div className="animate-float mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              TrustLance
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto">
              Secure Freelance Escrow on Stellar
            </p>
            
            <p className="text-lg md:text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
              Get paid safely with blockchain-powered escrow. 
              <br />
              <span className="font-semibold text-white">1% fees</span>. 
              <span className="font-semibold text-white"> Instant settlements</span>. 
              <span className="font-semibold text-white"> Zero disputes</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              {isConnected ? (
                <>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto rounded-xl shadow-2xl hover:shadow-white/20 transition-all hover:scale-105"
                    >
                      <LayoutDashboard className="mr-2 h-5 w-5" />
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6 h-auto rounded-xl backdrop-blur-sm"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    View Demo
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto rounded-xl shadow-2xl hover:shadow-white/20 transition-all hover:scale-105"
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Connect Wallet - Free
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6 h-auto rounded-xl backdrop-blur-sm"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    View Demo
                  </Button>
                </>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-2 text-blue-200 text-sm">
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4" /> No signup required
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4" /> Instant setup
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4" /> Non-custodial
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4" /> No KYC
              </span>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
              <ChevronDown className="w-8 h-8 text-white/60" />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Trusted by Freelancers Worldwide
              </h2>
              <p className="text-xl text-slate-600">
                Join the revolution in freelance payments
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
                Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Why Choose TrustLance?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Everything you need to get paid safely and quickly
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
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
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
                Process
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                How TrustLance Works
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Get started in minutes, get paid in seconds
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200" />
                  )}
                  
                  <div className="relative bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-blue-500 transition-colors text-center">
                    {/* Step Number */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-2xl font-bold mb-4 shadow-lg">
                      {step.number}
                    </div>
                    
                    <step.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 h-auto rounded-xl"
              >
                Start Creating Escrow
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
                Testimonials
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                What Our Users Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={index}
                  className="bg-white border-slate-200 shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <CardHeader>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-base text-slate-700 italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {testimonial.author[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-slate-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
                Pricing
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-slate-600">
                Always 1% - No hidden fees, no surprises
              </p>
            </div>

            <Card className="border-2 border-blue-500 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-3xl font-bold mb-2">Standard Plan</h3>
                <p className="text-blue-100">Perfect for freelancers of all sizes</p>
              </div>
              
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-slate-900 mb-2">
                    1%
                  </div>
                  <div className="text-xl text-slate-600">per transaction</div>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    'Unlimited escrows',
                    'Smart contracts on Stellar',
                    'Instant settlement',
                    'Real-time tracking',
                    'Email support',
                    'No monthly fees',
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Fee Examples */}
                <div className="bg-slate-50 rounded-xl p-6 mb-8">
                  <h4 className="font-semibold text-slate-900 mb-4">Fee Examples:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">$1,000 project</span>
                      <span className="font-semibold text-slate-900">$10 fee</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">$10,000 project</span>
                      <span className="font-semibold text-slate-900">$100 fee</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">$100,000 project</span>
                      <span className="font-semibold text-slate-900">$1,000 fee</span>
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6 h-auto"
                >
                  Start Free - No Signup Required
                </Button>
              </CardContent>
            </Card>

            {/* Comparison */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center text-slate-900 mb-8">
                Compare the Savings
              </h3>
              <div className="space-y-4">
                {[
                  { platform: 'Upwork', fee: 20, amount: 1000 },
                  { platform: 'Fiverr', fee: 20, amount: 1000 },
                  { platform: 'Freelancer', fee: 10, amount: 500 },
                  { platform: 'TrustLance', fee: 1, amount: 50, highlight: true },
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-xl',
                      item.highlight ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-500' : 'bg-slate-50'
                    )}
                  >
                    <div className="w-32 font-semibold text-slate-900">{item.platform}</div>
                    <div className="flex-1 h-8 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          'h-full rounded-full',
                          item.highlight 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                            : 'bg-slate-400'
                        )}
                        style={{ width: `${item.fee * 5}%` }}
                      />
                    </div>
                    <div className="w-24 text-right">
                      <span className="font-bold text-slate-900">{item.fee}%</span>
                    </div>
                    <div className="w-20 text-right">
                      <span className={cn(
                        'font-semibold',
                        item.highlight ? 'text-green-600' : 'text-slate-600'
                      )}>
                        ${item.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-green-600 font-semibold mt-6">
                Save $950 on a $5,000 project compared to Upwork!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
                FAQ
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card 
                  key={index}
                  className="border-slate-200 bg-white cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <CardHeader className="py-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold text-slate-900">
                        {faq.question}
                      </CardTitle>
                      <ChevronDown 
                        className={cn(
                          'w-5 h-5 text-slate-500 transition-transform',
                          activeFaq === index && 'rotate-180'
                        )}
                      />
                    </div>
                  </CardHeader>
                  {activeFaq === index && (
                    <CardContent className="pt-0 pb-4">
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Join thousands of freelancers getting paid safely with TrustLance
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto rounded-xl shadow-2xl"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Connect Wallet - Free
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

            <div className="flex flex-wrap justify-center gap-4 text-blue-100 text-sm">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" /> No signup required
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" /> Instant setup
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" /> Non-custodial
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-5 gap-8 mb-12">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">TrustLance</span>
                </div>
                <p className="text-slate-400 mb-4">
                  Secure freelance escrow on Stellar blockchain. Get paid safely, every time.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm">
                © 2024 TrustLance. Built on Stellar.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
