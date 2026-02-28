'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WalletButton } from '@/components/wallet/WalletButton';
import { useWallet } from '@/store/useWallet';
import { 
  LayoutDashboard, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Plus, 
  ArrowRight,
  Shield,
  Menu,
  X,
  Settings,
  CreditCard,
  FileText
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Sample escrow data
const sampleEscrows = [
  {
    id: 'ESC-001',
    title: 'Website Redesign',
    client: 'GBDZ...542F',
    freelancer: 'GAJK...44QP',
    amount: 100,
    status: 'funded',
    createdAt: '2024-01-15',
  },
  {
    id: 'ESC-002',
    title: 'Logo Design',
    client: 'GABC...123D',
    freelancer: 'GAJK...44QP',
    amount: 50,
    status: 'created',
    createdAt: '2024-01-14',
  },
  {
    id: 'ESC-003',
    title: 'Mobile App Development',
    client: 'GBDZ...542F',
    freelancer: 'GXYZ...789E',
    amount: 500,
    status: 'released',
    createdAt: '2024-01-10',
  },
];

export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { publicKey, balance, isConnected } = useWallet();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'funded':
        return 'bg-blue-100 text-blue-700';
      case 'created':
        return 'bg-yellow-100 text-yellow-700';
      case 'released':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const stats = [
    { 
      label: 'Active Escrows', 
      value: '3', 
      icon: LayoutDashboard, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    { 
      label: 'Total Earned', 
      value: `${balance?.toFixed(2) || '0.00'} XLM`, 
      icon: TrendingUp, 
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    { 
      label: 'Pending Payments', 
      value: '2', 
      icon: Clock, 
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    { 
      label: 'Completed', 
      value: '12', 
      icon: CheckCircle, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200">
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

            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Escrows
              </Button>
              <Button variant="ghost" size="sm">
                <CreditCard className="w-4 h-4 mr-2" />
                Payments
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
            <p className="text-slate-600">
              {isConnected 
                ? `Connected: ${publicKey?.slice(0, 6)}...${publicKey?.slice(-4)}`
                : 'Connect your wallet to get started'}
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Escrow
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', stat.bgColor)}>
                    <stat.icon className={cn('w-6 h-6', stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Escrows */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Escrows</CardTitle>
                    <CardDescription>Your active and recent escrow contracts</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleEscrows.map((escrow) => (
                    <div 
                      key={escrow.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {escrow.title[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{escrow.title}</p>
                          <p className="text-sm text-slate-600">{escrow.id} • {escrow.createdAt}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">{escrow.amount} XLM</p>
                        <Badge className={getStatusColor(escrow.status)}>
                          {escrow.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="border-slate-200 mb-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Escrow
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Send Payment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  View All Escrows
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment History
                </Button>
              </CardContent>
            </Card>

            {/* Wallet Info */}
            <Card className="border-slate-200 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-white">Your Wallet</CardTitle>
                <CardDescription className="text-blue-100">
                  {isConnected ? 'Connected' : 'Not Connected'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isConnected ? (
                  <div>
                    <p className="text-3xl font-bold mb-2">
                      {balance?.toFixed(2) || '0.00'} XLM
                    </p>
                    <p className="text-sm text-blue-100 mb-4">
                      ≈ ${((balance || 0) * 0.12).toFixed(2)} USD
                    </p>
                    <Button variant="secondary" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-blue-100 mb-4">Connect your wallet to view balance</p>
                    <WalletButton />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
