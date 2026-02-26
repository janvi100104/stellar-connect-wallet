# Skills for TrustLance AI Agents

This document defines specialized skills that AI agents can use when building the TrustLance Freelance Escrow platform.

---

## 📚 Available Skills

### 🎨 Skill 1: frontend-design
**Trigger:** When user asks to build/style/beautify UI components or pages

**Description:**
Create distinctive, production-grade frontend interfaces with high design quality. Avoid generic "AI slop" aesthetics. Generate creative, polished code that's memorable and purpose-built.

**When to Use:**
- Building landing pages
- Creating dashboard layouts
- Designing escrow creation forms
- Styling project cards
- Improving existing UI

**Guidelines:**

**Typography:**
- Use distinctive fonts (NOT Inter, Roboto, Arial)
- Pair display font with refined body font
- Examples: `font-family: 'Space Mono', 'JetBrains Mono', 'Outfit', 'Manrope'`

**Color & Theme:**
- Use CSS variables for consistency
- Bold, cohesive palette
- Gradient overlays, not flat colors
```css
:root {
  --primary: 217 91% 60%;
  --glow: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.3), transparent 50%);
}
```

**Motion:**
- Smooth transitions on hover/focus
- Staggered reveals on page load
- Micro-interactions for buttons
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
```

**Spatial Composition:**
- Asymmetric layouts
- Generous white space
- Overlapping elements for depth
- Grid-breaking design

**Example Output:**
```tsx
export const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 animate-pulse-slow" />
      
      {/* Glowing orb effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative container mx-auto px-6 py-32">
        <motion.h1
          className="text-7xl md:text-9xl font-bold tracking-tighter"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
            Secure Freelance
          </span>
          <br />
          <span className="text-white">Payments</span>
        </motion.h1>
        
        <motion.p
          className="mt-8 text-2xl text-slate-400 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          1% fees. Instant settlements. Built on Stellar blockchain.
        </motion.p>
        
        <motion.div
          className="mt-12 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="
            px-8 py-4 
            bg-gradient-to-r from-blue-600 to-cyan-500
            text-white font-semibold text-lg
            rounded-xl
            shadow-lg shadow-blue-500/50
            hover:shadow-xl hover:shadow-blue-500/70
            hover:scale-105
            transition-all duration-300
          ">
            Create Escrow
          </button>
        </motion.div>
      </div>
    </section>
  );
};
```

---

### ⛓️ Skill 2: stellar-integration
**Trigger:** When working with Stellar blockchain operations

**Description:**
Integrate Stellar SDK operations for wallet connection, transactions, and smart contract interactions. Handle Soroban contract calls properly.

**When to Use:**
- Connecting wallets (Freighter, xBull, Albedo)
- Fetching account balances
- Sending XLM payments
- Calling Soroban smart contracts
- Listening to blockchain events

**Guidelines:**

**Wallet Connection:**
```typescript
import { StellarWalletsKit, WalletNetwork, ISupportedWallet } from '@creit.tech/stellar-wallets-kit';

const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWallet: 'freighter',
});

// Show wallet selection
async function connectWallet() {
  try {
    await kit.openModal({
      onWalletSelected: async (option: ISupportedWallet) => {
        kit.setWallet(option.id);
      }
    });
    
    const { address } = await kit.getAddress();
    return address;
  } catch (error) {
    if (error.message.includes('User rejected')) {
      throw new Error('Wallet connection rejected');
    }
    throw error;
  }
}
```

**Fetch Balance:**
```typescript
import { Server } from '@stellar/stellar-sdk';

async function fetchBalance(address: string): Promise<number> {
  const server = new Server('https://horizon-testnet.stellar.org');
  
  try {
    const account = await server.loadAccount(address);
    const xlmBalance = account.balances.find(
      (b) => b.asset_type === 'native'
    );
    
    return parseFloat(xlmBalance?.balance || '0');
  } catch (error) {
    console.error('Balance fetch failed:', error);
    throw new Error('Failed to fetch balance');
  }
}
```

**Call Soroban Contract:**
```typescript
import { 
  Contract, 
  SorobanRpc, 
  TransactionBuilder,
  nativeToScVal 
} from '@stellar/stellar-sdk';

async function fundEscrow(
  contractId: string,
  clientAddress: string,
  amount: number
): Promise<string> {
  const contract = new Contract(contractId);
  const server = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
  
  // Build operation
  const operation = contract.call(
    'fund',
    nativeToScVal(clientAddress, { type: 'address' }),
    nativeToScVal(amount, { type: 'i128' })
  );
  
  // Get source account
  const sourceAccount = await server.getAccount(clientAddress);
  
  // Build transaction
  const transaction = new TransactionBuilder(sourceAccount, {
    fee: '10000',
    networkPassphrase: 'Test SDF Network ; September 2015',
  })
    .addOperation(operation)
    .setTimeout(30)
    .build();
  
  // Sign with wallet
  const signedTx = await walletKit.sign(transaction);
  
  // Submit
  const result = await server.sendTransaction(signedTx);
  
  // Poll for result
  let status;
  do {
    await new Promise(resolve => setTimeout(resolve, 1000));
    status = await server.getTransaction(result.hash);
  } while (status.status === 'PENDING');
  
  if (status.status === 'SUCCESS') {
    return result.hash;
  } else {
    throw new Error('Transaction failed');
  }
}
```

---

### 🔒 Skill 3: soroban-contracts
**Trigger:** When writing/deploying Soroban smart contracts

**Description:**
Write secure, efficient Soroban smart contracts in Rust for escrow functionality. Follow best practices for blockchain development.

**When to Use:**
- Creating escrow contracts
- Implementing milestone logic
- Writing contract tests
- Deploying to testnet

**Guidelines:**

**Contract Structure:**
```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, Symbol, Vec};

#[derive(Clone, Debug, Eq, PartialEq)]
pub enum Error {
    NotAuthorized = 1,
    AlreadyFunded = 2,
    InvalidAmount = 3,
    DeadlinePassed = 4,
}

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    /// Initialize a new escrow
    pub fn initialize(
        env: Env,
        client: Address,
        freelancer: Address,
        amount: i128,
        deadline: u64,
    ) -> Result<(), Error> {
        // Require authorization
        client.require_auth();
        
        // Validate inputs
        if amount <= 0 {
            return Err(Error::InvalidAmount);
        }
        
        // Store escrow data
        let key_client = Symbol::new(&env, "client");
        let key_freelancer = Symbol::new(&env, "freelancer");
        let key_amount = Symbol::new(&env, "amount");
        let key_deadline = Symbol::new(&env, "deadline");
        
        env.storage().instance().set(&key_client, &client);
        env.storage().instance().set(&key_freelancer, &freelancer);
        env.storage().instance().set(&key_amount, &amount);
        env.storage().instance().set(&key_deadline, &deadline);
        
        // Emit event
        env.events().publish(
            (Symbol::new(&env, "initialized"),),
            (client.clone(), freelancer.clone(), amount),
        );
        
        Ok(())
    }
    
    /// Fund the escrow
    pub fn fund(env: Env, client: Address) -> Result<(), Error> {
        client.require_auth();
        
        // Check not already funded
        let key_funded = Symbol::new(&env, "funded");
        if env.storage().instance().has(&key_funded) {
            return Err(Error::AlreadyFunded);
        }
        
        // Mark as funded
        env.storage().instance().set(&key_funded, &true);
        
        // Emit event
        env.events().publish(
            (Symbol::new(&env, "funded"),),
            (client,),
        );
        
        Ok(())
    }
    
    /// Release payment to freelancer
    pub fn release(env: Env, client: Address) -> Result<(), Error> {
        client.require_auth();
        
        // Verify client is authorized
        let key_client = Symbol::new(&env, "client");
        let stored_client: Address = env.storage().instance().get(&key_client).unwrap();
        
        if client != stored_client {
            return Err(Error::NotAuthorized);
        }
        
        // Get freelancer and amount
        let key_freelancer = Symbol::new(&env, "freelancer");
        let key_amount = Symbol::new(&env, "amount");
        let freelancer: Address = env.storage().instance().get(&key_freelancer).unwrap();
        let amount: i128 = env.storage().instance().get(&key_amount).unwrap();
        
        // Transfer funds (in real implementation)
        // token::transfer(&env, &contract_id, &freelancer, &amount);
        
        // Mark as released
        let key_released = Symbol::new(&env, "released");
        env.storage().instance().set(&key_released, &true);
        
        // Emit event
        env.events().publish(
            (Symbol::new(&env, "released"),),
            (freelancer, amount),
        );
        
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::testutils::{Address as _, Ledger};

    #[test]
    fn test_initialize() {
        let env = Env::default();
        let contract_id = env.register_contract(None, EscrowContract);
        let client = Address::generate(&env);
        let freelancer = Address::generate(&env);
        
        env.mock_all_auths();
        
        let result = EscrowContract::initialize(
            &env,
            client.clone(),
            freelancer.clone(),
            1000,
            env.ledger().timestamp() + 86400,
        );
        
        assert!(result.is_ok());
    }
    
    #[test]
    fn test_invalid_amount() {
        let env = Env::default();
        let client = Address::generate(&env);
        let freelancer = Address::generate(&env);
        
        env.mock_all_auths();
        
        let result = EscrowContract::initialize(
            &env,
            client,
            freelancer,
            -100, // Invalid
            env.ledger().timestamp() + 86400,
        );
        
        assert_eq!(result, Err(Error::InvalidAmount));
    }
}
```

**Deployment Script:**
```bash
#!/bin/bash

# Build contract
cd contracts/escrow
cargo build --target wasm32-unknown-unknown --release

# Optimize WASM
soroban contract optimize --wasm target/wasm32-unknown-unknown/release/escrow.wasm

# Deploy to testnet
CONTRACT_ID=$(soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/escrow.wasm \
  --source $DEPLOYER_SECRET \
  --network testnet)

echo "Contract deployed: $CONTRACT_ID"

# Save to .env
echo "NEXT_PUBLIC_ESCROW_CONTRACT_ID=$CONTRACT_ID" >> ../../.env.local
```

---

### 🧪 Skill 4: testing-suite
**Trigger:** When writing tests or debugging

**Description:**
Write comprehensive tests for all application code. Use Jest for unit tests, React Testing Library for components, Playwright for E2E.

**When to Use:**
- Writing unit tests for utilities
- Testing React components
- E2E testing user flows
- Testing smart contracts

**Guidelines:**

**Component Test:**
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WalletButton } from './WalletButton';

describe('WalletButton', () => {
  it('should show connect button when disconnected', () => {
    render(<WalletButton />);
    
    const button = screen.getByRole('button', { name: /connect wallet/i });
    expect(button).toBeInTheDocument();
  });
  
  it('should connect wallet on click', async () => {
    const onConnect = jest.fn();
    render(<WalletButton onConnect={onConnect} />);
    
    const button = screen.getByRole('button', { name: /connect/i });
    await userEvent.click(button);
    
    await waitFor(() => {
      expect(onConnect).toHaveBeenCalledWith(expect.any(String));
    });
  });
  
  it('should handle connection error', async () => {
    // Mock wallet rejection
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<WalletButton />);
    
    const button = screen.getByRole('button');
    await userEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/failed to connect/i)).toBeInTheDocument();
    });
  });
});
```

**E2E Test:**
```typescript
import { test, expect } from '@playwright/test';

test.describe('Escrow Creation Flow', () => {
  test('should create escrow successfully', async ({ page }) => {
    // Navigate to app
    await page.goto('http://localhost:3000');
    
    // Connect wallet
    await page.click('button:has-text("Connect Wallet")');
    await page.click('text=Freighter');
    
    // Wait for connection
    await expect(page.locator('text=Connected')).toBeVisible();
    
    // Create escrow
    await page.click('button:has-text("Create Escrow")');
    
    // Fill form
    await page.fill('input[name="title"]', 'Website Design');
    await page.fill('input[name="freelancerAddress"]', 'GTEST...');
    await page.fill('input[name="amount"]', '1000');
    
    // Submit
    await page.click('button:has-text("Create")');
    
    // Wait for success
    await expect(page.locator('text=Escrow created')).toBeVisible({
      timeout: 10000,
    });
    
    // Verify redirect
    await expect(page).toHaveURL(/\/escrows\/.+/);
  });
});
```

---

### 📊 Skill 5: data-modeling
**Trigger:** When designing database schemas or data structures

**Description:**
Design clean, efficient data models for escrows, projects, milestones, users. Use TypeScript interfaces and proper normalization.

**When to Use:**
- Defining TypeScript interfaces
- Planning database schema
- Structuring API responses
- Designing smart contract storage

**Guidelines:**

**Core Data Models:**
```typescript
// User Profile
interface User {
  address: string; // Stellar address (primary key)
  name: string;
  bio: string;
  avatar?: string;
  email?: string;
  role: 'freelancer' | 'client' | 'both';
  skills: string[];
  portfolio: PortfolioItem[];
  stats: UserStats;
  reputation: ReputationScore;
  createdAt: Date;
  updatedAt: Date;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  technologies: string[];
  completedAt: Date;
}

interface UserStats {
  projectsCompleted: number;
  totalEarned: number; // in XLM
  totalSpent: number;
  successRate: number; // percentage
  avgResponseTime: number; // in hours
  onTimeDeliveryRate: number;
}

interface ReputationScore {
  overall: number; // 0-100
  completionRate: number;
  avgRating: number; // 1-5
  reviewCount: number;
  disputeRate: number;
  badges: Badge[];
}

interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  earnedAt: Date;
}

// Project & Escrow
interface Project {
  id: string;
  title: string;
  description: string;
  client: string; // address
  freelancer: string; // address
  category: ProjectCategory;
  totalAmount: number;
  currency: 'XLM' | 'USDC' | 'EURC';
  status: ProjectStatus;
  milestones: Milestone[];
  contractAddress: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

type ProjectStatus = 
  | 'draft'
  | 'pending_funding'
  | 'active'
  | 'in_review'
  | 'disputed'
  | 'completed'
  | 'cancelled';

type ProjectCategory =
  | 'web_development'
  | 'design'
  | 'writing'
  | 'marketing'
  | 'consulting'
  | 'video_editing'
  | 'other';

interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  amount: number;
  deadline: Date;
  status: MilestoneStatus;
  order: number;
  deliverables: Deliverable[];
  feedback?: Feedback;
  createdAt: Date;
  fundedAt?: Date;
  submittedAt?: Date;
  approvedAt?: Date;
}

type MilestoneStatus =
  | 'pending'
  | 'funded'
  | 'in_progress'
  | 'submitted'
  | 'in_review'
  | 'revision_requested'
  | 'approved'
  | 'paid'
  | 'disputed';

interface Deliverable {
  id: string;
  milestoneId: string;
  type: 'file' | 'url' | 'text';
  content: string; // URL or text content
  fileName?: string;
  fileSize?: number;
  uploadedAt: Date;
}

interface Feedback {
  type: 'approval' | 'revision';
  comment: string;
  submittedBy: string; // address
  submittedAt: Date;
}

// Transaction History
interface Transaction {
  id: string;
  hash: string; // Stellar transaction hash
  projectId: string;
  milestoneId?: string;
  from: string; // address
  to: string; // address
  amount: number;
  currency: 'XLM' | 'USDC';
  type: TransactionType;
  status: 'pending' | 'success' | 'failed';
  fee: number;
  createdAt: Date;
  confirmedAt?: Date;
}

type TransactionType =
  | 'escrow_fund'
  | 'milestone_release'
  | 'refund'
  | 'dispute_resolution';

// Reviews
interface Review {
  id: string;
  projectId: string;
  reviewer: string; // address
  reviewee: string; // address
  rating: number; // 1-5
  comment: string;
  categories: ReviewCategory[];
  helpful: number; // upvotes
  createdAt: Date;
}

interface ReviewCategory {
  name: string; // "Communication", "Quality", "Timeliness"
  rating: number; // 1-5
}

// Disputes
interface Dispute {
  id: string;
  projectId: string;
  milestoneId?: string;
  initiator: string; // address
  reason: string;
  description: string;
  evidence: Evidence[];
  status: DisputeStatus;
  resolution?: DisputeResolution;
  createdAt: Date;
  resolvedAt?: Date;
}

type DisputeStatus =
  | 'open'
  | 'under_review'
  | 'resolved'
  | 'escalated';

interface Evidence {
  submittedBy: string; // address
  type: 'text' | 'file' | 'url';
  content: string;
  submittedAt: Date;
}

interface DisputeResolution {
  decision: string;
  clientShare: number;
  freelancerShare: number;
  resolvedBy: string; // mediator address
  reason: string;
  resolvedAt: Date;
}
```

**Database Schema (if using Supabase/PostgreSQL):**
```sql
-- Users table
CREATE TABLE users (
  address TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  avatar TEXT,
  email TEXT,
  role TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  client_address TEXT NOT NULL REFERENCES users(address),
  freelancer_address TEXT NOT NULL REFERENCES users(address),
  total_amount DECIMAL(18, 7) NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL,
  contract_address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Milestones table
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id),
  title TEXT NOT NULL,
  description TEXT,
  amount DECIMAL(18, 7) NOT NULL,
  deadline TIMESTAMP NOT NULL,
  status TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  funded_at TIMESTAMP,
  submitted_at TIMESTAMP,
  approved_at TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hash TEXT UNIQUE NOT NULL,
  project_id UUID REFERENCES projects(id),
  milestone_id UUID REFERENCES milestones(id),
  from_address TEXT NOT NULL,
  to_address TEXT NOT NULL,
  amount DECIMAL(18, 7) NOT NULL,
  currency TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  confirmed_at TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id),
  reviewer_address TEXT NOT NULL REFERENCES users(address),
  reviewee_address TEXT NOT NULL REFERENCES users(address),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_client ON projects(client_address);
CREATE INDEX idx_projects_freelancer ON projects(freelancer_address);
CREATE INDEX idx_milestones_project ON milestones(project_id);
CREATE INDEX idx_transactions_project ON transactions(project_id);
CREATE INDEX idx_transactions_hash ON transactions(hash);
```

---

### 🚀 Skill 6: deployment-automation
**Trigger:** When setting up CI/CD, deploying, or configuring infrastructure

**Description:**
Set up automated deployment pipelines, monitoring, and production infrastructure. Use GitHub Actions, Vercel, Sentry.

**When to Use:**
- Creating deployment workflows
- Setting up Vercel
- Configuring Sentry
- Environment variables
- Production monitoring

**Guidelines:**

**GitHub Actions CI/CD:**
```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'

jobs:
  lint:
    name: Lint Code
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Run Prettier check
        run: npm run format:check
  
  type-check:
    name: TypeScript Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
  
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
  
  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: [lint, type-check, test]
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build Next.js app
        run: npm run build
        env:
          NEXT_PUBLIC_HORIZON_URL: ${{ secrets.HORIZON_URL }}
          NEXT_PUBLIC_CONTRACT_ID: ${{ secrets.CONTRACT_ID }}
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: .next
  
  deploy-preview:
    name: Deploy Preview (PR)
    runs-on: ubuntu-latest
    needs: [build]
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel (Preview)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}
      
      - name: Comment PR with preview URL
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🚀 Preview deployed! Visit: ${{ steps.deploy.outputs.preview-url }}'
            })
  
  deploy-production:
    name: Deploy Production
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel (Production)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          scope: ${{ secrets.VERCEL_ORG_ID }}
      
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Production deployment completed!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        if: always()
  
  e2e-test:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: [deploy-preview]
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          BASE_URL: ${{ steps.deploy.outputs.preview-url }}
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

**Vercel Configuration:**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm ci",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_HORIZON_URL": "@horizon-url",
    "NEXT_PUBLIC_SOROBAN_RPC_URL": "@soroban-rpc-url",
    "NEXT_PUBLIC_CONTRACT_ID": "@contract-id"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_HORIZON_URL": "@horizon-url"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

---

## 🎯 Using Skills

### How to Activate a Skill:

1. **Identify the task type**
2. **Match to relevant skill**
3. **Follow skill guidelines**
4. **Use templates provided**
5. **Adapt to specific context**

### Example Workflow:

**Task:** "Create a landing page for TrustLance"

**Steps:**
1. Activate `frontend-design` skill
2. Read design principles
3. Choose bold aesthetic direction (e.g., "cyberpunk fintech")
4. Use typography guidelines (distinctive fonts)
5. Apply color guidelines (gradient overlays)
6. Add motion (staggered reveals)
7. Generate complete, working code
8. Ensure mobile responsive

**Task:** "Deploy escrow contract to testnet"

**Steps:**
1. Activate `soroban-contracts` skill
2. Review contract template
3. Build contract (cargo build)
4. Use deployment script
5. Save contract ID to .env
6. Verify deployment on explorer

---

## ✅ Skill Checklist

Before completing any task, verify:

- [ ] Correct skill activated
- [ ] All guidelines followed
- [ ] Code is complete (no TODOs)
- [ ] TypeScript types included
- [ ] Error handling present
- [ ] Mobile responsive (if UI)
- [ ] Tests written (if applicable)
- [ ] Documentation added
- [ ] Git commit ready

---

This skills system ensures consistent, high-quality output from AI agents across all aspects of the TrustLance platform.
