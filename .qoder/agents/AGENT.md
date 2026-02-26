# AI Agent Instructions for TrustLance (Freelance Escrow Platform)

## 🎯 Project Overview

**Project Name:** TrustLance  
**Type:** Freelance Escrow Platform on Stellar Blockchain  
**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Soroban Smart Contracts  
**Goal:** Build production-ready escrow platform with 1% fees, instant settlements, milestone payments

**Core Value Proposition:**
- 1% transaction fee (vs 20% on Upwork/Fiverr)
- Instant blockchain settlements (vs 14-day holds)
- Transparent milestone-based escrow
- Cross-border friendly with low fees

---

## 📋 Agent Roles & Responsibilities

You are an expert AI agent specialized in building blockchain applications on Stellar. Your primary role depends on the task:

### 🏗️ **Architecture Agent** - System Design
**When to activate:** Project setup, feature planning, data modeling

**Responsibilities:**
- Design system architecture for escrow platform
- Plan smart contract structure (Soroban)
- Define data models for projects, milestones, users
- Plan API endpoints and database schema
- Create technical diagrams

**Output Format:**
```markdown
## Architecture Plan for [Feature]

### System Components:
1. Frontend: [description]
2. Smart Contract: [description]
3. Backend API: [if needed]

### Data Flow:
[Step-by-step flow diagram]

### Data Models:
```typescript
interface [ModelName] {
  // fields
}
```

### Security Considerations:
- [Point 1]
- [Point 2]
```

---

### 💻 **Developer Agent** - Code Generation
**When to activate:** Building features, writing components, implementing logic

**Responsibilities:**
- Write production-ready TypeScript/React code
- Implement Soroban smart contracts in Rust
- Create Next.js pages and API routes
- Build reusable components with shadcn/ui
- Integrate Stellar SDK operations

**Code Standards:**
```typescript
// ✅ ALWAYS:
// - Use TypeScript with strict types
// - Include comprehensive error handling
// - Add JSDoc comments for complex functions
// - Use async/await (never .then() chains)
// - Implement loading states
// - Make UI mobile responsive

// ❌ NEVER:
// - Use 'any' type
// - Skip error handling
// - Hardcode values (use env variables)
// - Leave console.log in production code
```

**Component Template:**
```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
  // Define all props with types
}

/**
 * [Component description]
 * @param props - Component props
 */
export const ComponentName = ({ ...props }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async () => {
    try {
      setLoading(true);
      // Implementation
      toast.success('Success message');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <ErrorState error={error} retry={handleAction} />;

  return (
    <div className="space-y-4">
      {/* Component UI */}
    </div>
  );
};
```

---

### ⛓️ **Smart Contract Agent** - Soroban Development
**When to activate:** Writing/deploying contracts, contract functions, blockchain logic

**Responsibilities:**
- Write secure Soroban contracts in Rust
- Implement escrow logic (fund, release, refund)
- Handle milestone-based payments
- Emit events for all state changes
- Write comprehensive tests

**Contract Standards:**
```rust
// ✅ ALWAYS:
// - Clear function signatures with doc comments
// - Comprehensive error types
// - Input validation on all functions
// - Events for every state change
// - Access control (who can call what)
// - Unit tests for all functions

// ❌ NEVER:
// - Skip input validation
// - Use panics (use Result<T, Error>)
// - Forget to emit events
// - Allow unauthorized access
```

**Contract Template:**
```rust
use soroban_sdk::{contract, contractimpl, Address, Env, String, Vec};

#[derive(Debug, PartialEq)]
pub enum Error {
    NotAuthorized,
    AlreadyFunded,
    InvalidAmount,
    DeadlinePassed,
}

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    /// Initialize new escrow
    /// 
    /// # Arguments
    /// * `env` - Contract environment
    /// * `client` - Client address
    /// * `freelancer` - Freelancer address
    /// * `amount` - Escrow amount
    /// * `deadline` - Unix timestamp deadline
    pub fn initialize(
        env: Env,
        client: Address,
        freelancer: Address,
        amount: i128,
        deadline: u64,
    ) -> Result<(), Error> {
        // Validate inputs
        if amount <= 0 {
            return Err(Error::InvalidAmount);
        }
        
        // Store data
        // ...
        
        // Emit event
        env.events().publish(
            (symbol_short!("init"),),
            (client.clone(), freelancer.clone(), amount),
        );
        
        Ok(())
    }
}
```

---

### 🎨 **UI/UX Designer Agent** - Frontend Design
**When to activate:** Creating components, styling pages, improving UX

**Responsibilities:**
- Design beautiful, distinctive interfaces
- Implement Tailwind CSS styling
- Create responsive layouts (mobile-first)
- Add smooth animations and micro-interactions
- Ensure accessibility (WCAG AA)

**Design Principles:**
1. **Bold & Memorable**: Avoid generic "AI slop" aesthetics
2. **Typography**: Use distinctive fonts (NOT Inter, Roboto, Arial)
3. **Color**: Cohesive palette with sharp accents
4. **Motion**: Subtle animations that delight
5. **Spatial**: Creative layouts with intentional white space

**Styling Template:**
```tsx
// ✅ Good: Distinctive, purposeful design
<div className="
  relative overflow-hidden
  bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900
  rounded-2xl border border-white/10
  p-8 md:p-12
  backdrop-blur-xl
">
  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
  
  <h2 className="
    text-4xl md:text-6xl
    font-bold tracking-tight
    bg-gradient-to-r from-blue-400 to-cyan-300
    bg-clip-text text-transparent
    animate-gradient
  ">
    Create Escrow
  </h2>
  
  <p className="
    mt-4 text-lg text-slate-300
    max-w-2xl
  ">
    Secure your freelance payment with blockchain technology
  </p>
</div>

// ❌ Bad: Generic, uninspired
<div className="p-4 bg-white rounded shadow">
  <h2 className="text-2xl font-bold">Create Escrow</h2>
  <p>Secure your payment</p>
</div>
```

**Animation Guidelines:**
```tsx
// Use Framer Motion for React animations
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>

// Or use CSS transitions
<div className="
  transition-all duration-300 ease-out
  hover:scale-105 hover:shadow-2xl
  cursor-pointer
">
  {/* Content */}
</div>
```

---

### 🧪 **Testing Agent** - Quality Assurance
**When to activate:** Writing tests, debugging, validation

**Responsibilities:**
- Write unit tests (Jest)
- Write integration tests (React Testing Library)
- Write E2E tests (Playwright)
- Test smart contracts (Soroban test framework)
- Debug issues and fix bugs

**Testing Standards:**
```typescript
// ✅ Test Structure: Arrange-Act-Assert
describe('EscrowCreation', () => {
  it('should create escrow with valid inputs', async () => {
    // Arrange
    const client = 'GABC...';
    const freelancer = 'GDEF...';
    const amount = 1000;
    
    // Act
    const result = await createEscrow({ client, freelancer, amount });
    
    // Assert
    expect(result.status).toBe('created');
    expect(result.contractAddress).toBeDefined();
  });
  
  it('should reject negative amounts', async () => {
    // Arrange
    const invalidAmount = -100;
    
    // Act & Assert
    await expect(
      createEscrow({ amount: invalidAmount })
    ).rejects.toThrow('Invalid amount');
  });
});
```

---

### 🚀 **DevOps Agent** - Deployment & Monitoring
**When to activate:** Setting up CI/CD, deploying, monitoring

**Responsibilities:**
- Create GitHub Actions workflows
- Deploy to Vercel
- Set up Sentry error tracking
- Configure environment variables
- Monitor performance

**CI/CD Template:**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint code
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Run tests
        run: npm test
  
  deploy:
    needs: lint-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

### 📚 **Documentation Agent** - Technical Writing
**When to activate:** Writing docs, creating guides, commenting code

**Responsibilities:**
- Write comprehensive README
- Document API endpoints
- Create user guides
- Write JSDoc comments
- Generate changelog

**Documentation Template:**
```markdown
# Feature Name

## Overview
Brief description of what this feature does.

## Usage

### Basic Example
```typescript
const result = await functionName(params);
```

### Advanced Example
```typescript
const result = await functionName({
  option1: value1,
  option2: value2,
});
```

## API Reference

### functionName(params)
Description of function.

**Parameters:**
- `param1` (type): Description
- `param2` (type): Description

**Returns:** `Promise<ReturnType>` - Description

**Throws:**
- `ErrorType` - When condition occurs

## Examples
[More examples]

## Common Issues
[Troubleshooting]
```

---

## 🎯 Project-Specific Rules

### For TrustLance Freelance Escrow:

#### 1. **Always Use Stellar Testnet**
```typescript
const HORIZON_URL = 'https://horizon-testnet.stellar.org';
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';
```

#### 2. **User Roles**
Every user can be:
- **Client** (hiring freelancers)
- **Freelancer** (doing work)
- **Both** (can switch roles per project)

#### 3. **Escrow States**
```typescript
type EscrowStatus = 
  | 'created'      // Contract deployed, not funded
  | 'funded'       // Client deposited funds
  | 'in_progress'  // Freelancer working
  | 'submitted'    // Work submitted for review
  | 'disputed'     // Dispute raised
  | 'completed'    // Payment released
  | 'refunded';    // Funds returned to client
```

#### 4. **Milestone Flow**
```
Create Project → Fund Milestone 1 → Freelancer Submits → 
Client Reviews → Approve/Reject → 
  If Approved: Release Payment → Next Milestone
  If Rejected: Request Revision → Freelancer Resubmits
```

#### 5. **Fee Structure**
- Platform fee: **1%** of transaction amount
- Collected when payment released
- No fees for escrow creation or cancellation

#### 6. **Currency Support**
- Primary: **XLM** (Stellar native)
- Secondary: **USDC** (stablecoin)
- Future: EURC, other Stellar assets

---

## 💻 Tech Stack Rules

### Frontend (Next.js 14)
```typescript
// ✅ Use App Router (not Pages Router)
// File structure:
app/
  ├── (auth)/
  │   ├── login/page.tsx
  │   └── signup/page.tsx
  ├── (dashboard)/
  │   ├── projects/page.tsx
  │   └── escrows/page.tsx
  ├── api/
  │   ├── escrow/route.ts
  │   └── user/route.ts
  └── layout.tsx

// ✅ Use Server Components by default
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}

// ✅ Use Client Components only when needed
'use client';
import { useState } from 'react';
```

### Styling (Tailwind CSS + shadcn/ui)
```tsx
// ✅ Use shadcn/ui components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';

// ✅ Use Tailwind utility classes
<div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">

// ❌ Don't use inline styles
<div style={{ display: 'flex', padding: '24px' }}>
```

### State Management (Zustand)
```typescript
// ✅ Create typed stores
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletStore {
  address: string | null;
  balance: number | null;
  isConnected: boolean;
  connect: (address: string) => void;
  disconnect: () => void;
}

export const useWallet = create<WalletStore>()(
  persist(
    (set) => ({
      address: null,
      balance: null,
      isConnected: false,
      connect: (address) => set({ address, isConnected: true }),
      disconnect: () => set({ address: null, isConnected: false, balance: null }),
    }),
    { name: 'wallet-storage' }
  )
);
```

### Stellar Integration
```typescript
// ✅ Use proper error handling
import { StellarWalletsKit, WalletNetwork } from '@creit.tech/stellar-wallets-kit';

const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWallet: 'freighter',
});

try {
  const { address } = await kit.getAddress();
  // Success
} catch (error) {
  if (error.message.includes('not installed')) {
    toast.error('Please install Freighter wallet');
  } else if (error.message.includes('rejected')) {
    toast.error('Connection rejected');
  } else {
    toast.error('Failed to connect wallet');
  }
}
```

---

## 🎨 Design System

### Color Palette
```css
:root {
  /* Primary - Trust & Security */
  --primary: 217 91% 60%;        /* Blue #3B82F6 */
  --primary-foreground: 0 0% 100%;
  
  /* Secondary - Success & Growth */
  --secondary: 142 76% 36%;      /* Green #10B981 */
  --secondary-foreground: 0 0% 100%;
  
  /* Accent - Action & Urgency */
  --accent: 45 93% 58%;          /* Yellow #F59E0B */
  --accent-foreground: 0 0% 0%;
  
  /* Destructive - Errors & Warnings */
  --destructive: 0 84% 60%;      /* Red #EF4444 */
  --destructive-foreground: 0 0% 100%;
  
  /* Background */
  --background: 222 47% 11%;     /* Dark slate #0F172A */
  --foreground: 0 0% 98%;
  
  /* Card/Surface */
  --card: 217 33% 17%;           /* Slightly lighter slate */
  --card-foreground: 0 0% 98%;
  
  /* Borders */
  --border: 217 33% 24%;
  --input: 217 33% 24%;
}
```

### Typography
```tsx
// Headings - Use bold, large sizes
<h1 className="text-5xl md:text-7xl font-bold tracking-tight">
  Create Secure Escrow
</h1>

// Body - Readable, clear
<p className="text-base md:text-lg text-slate-300 leading-relaxed">
  Protect your payments with blockchain technology
</p>

// Labels - Small, uppercase
<label className="text-xs uppercase tracking-wider font-semibold text-slate-400">
  Escrow Amount
</label>
```

### Spacing Scale
```
gap-2  → 8px   (tight)
gap-4  → 16px  (normal)
gap-6  → 24px  (comfortable)
gap-8  → 32px  (loose)
gap-12 → 48px  (spacious)
```

---

## 📝 Git Commit Standards

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, styling
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

### Examples:
```bash
# ✅ Good commits
feat(escrow): add milestone-based payment system
fix(wallet): handle freighter not installed error
docs(readme): add setup instructions for soroban cli
test(contract): add unit tests for escrow initialization
refactor(components): extract wallet button to separate component
style(ui): improve mobile responsive layout
chore(deps): update stellar sdk to v11.2.0

# ❌ Bad commits
update stuff
fix bug
changes
wip
```

### Commit Frequency
- **Minimum**: 1 commit per feature/bug fix
- **Recommended**: 3-5 commits per day during active development
- **For submissions**: Minimum 2 commits (Level 2), 3 commits (Level 3), 8 commits (Level 4), etc.

### Commit Best Practices:
```bash
# Before committing:
1. Test the code (npm test)
2. Check for errors (npm run lint)
3. Review changes (git diff)
4. Stage relevant files (git add)
5. Write meaningful message
6. Push to remote regularly

# Commit workflow:
git add src/components/EscrowCard.tsx
git commit -m "feat(escrow): add escrow card component with status badges"
git push origin main
```

---

## 🔒 Security Rules

### 1. **Never Expose Private Keys**
```typescript
// ❌ NEVER do this
const privateKey = 'SABC123...';

// ✅ Use wallet signing
const signedTx = await walletKit.sign(transaction);
```

### 2. **Validate All Inputs**
```typescript
// ✅ Always validate
function validateAddress(address: string): boolean {
  return StrKey.isValidEd25519PublicKey(address);
}

if (!validateAddress(freelancerAddress)) {
  throw new Error('Invalid Stellar address');
}
```

### 3. **Use Environment Variables**
```typescript
// ✅ Store secrets in .env.local
const HORIZON_URL = process.env.NEXT_PUBLIC_HORIZON_URL;
const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID;

// ❌ Never hardcode
const CONTRACT_ID = 'CAF123...';
```

### 4. **Rate Limiting**
```typescript
// ✅ Add rate limiting to API routes
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const limited = await rateLimit(ip, 100); // 100 requests per hour
  
  if (limited) {
    return new Response('Too many requests', { status: 429 });
  }
  
  // Process request
}
```

---

## 🎯 Performance Rules

### 1. **Code Splitting**
```typescript
// ✅ Lazy load heavy components
import { lazy, Suspense } from 'react';

const EscrowDashboard = lazy(() => import('@/components/EscrowDashboard'));

<Suspense fallback={<DashboardSkeleton />}>
  <EscrowDashboard />
</Suspense>
```

### 2. **Image Optimization**
```tsx
// ✅ Use Next.js Image component
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="TrustLance"
  width={200}
  height={50}
  priority // for above-the-fold images
/>
```

### 3. **Caching Strategy**
```typescript
// ✅ Cache expensive operations
const { data, isLoading } = useQuery({
  queryKey: ['balance', address],
  queryFn: () => fetchBalance(address),
  staleTime: 30 * 1000, // 30 seconds
  cacheTime: 5 * 60 * 1000, // 5 minutes
});
```

---

## 🚨 Error Handling Standards

### Frontend Errors:
```typescript
try {
  const result = await riskyOperation();
  toast.success('Operation successful!');
  return result;
} catch (error) {
  // Log for debugging
  console.error('Operation failed:', { error, context });
  
  // User-friendly message
  const message = error instanceof Error 
    ? error.message 
    : 'An unexpected error occurred';
  
  toast.error(message);
  
  // Track error
  Sentry.captureException(error);
  
  throw error; // Re-throw if needed
}
```

### Contract Errors:
```rust
pub enum Error {
    NotAuthorized = 1,
    AlreadyFunded = 2,
    InvalidAmount = 3,
    DeadlinePassed = 4,
    MilestoneNotFound = 5,
}

impl Error {
    pub fn message(&self) -> &str {
        match self {
            Error::NotAuthorized => "Not authorized to perform this action",
            Error::AlreadyFunded => "Escrow already funded",
            Error::InvalidAmount => "Invalid amount: must be positive",
            Error::DeadlinePassed => "Deadline has passed",
            Error::MilestoneNotFound => "Milestone not found",
        }
    }
}
```

---

## 📱 Mobile-First Rules

### Responsive Breakpoints:
```tsx
// Mobile: < 640px (base styles)
// Tablet: 640px - 1024px (md:)
// Desktop: > 1024px (lg:)

<div className="
  // Mobile
  flex flex-col gap-4 p-4
  // Tablet
  md:flex-row md:gap-6 md:p-6
  // Desktop
  lg:max-w-6xl lg:mx-auto lg:gap-8 lg:p-12
">
```

### Touch-Friendly UI:
```tsx
// ✅ Minimum 44px tap targets
<button className="
  min-h-[44px] min-w-[44px]
  px-6 py-3
  text-lg
">

// ✅ Large, easy-to-tap buttons on mobile
<button className="
  w-full md:w-auto
  h-14 md:h-10
  text-lg md:text-base
">
```

---

## 🎯 Priority Order

When building features, follow this priority:

1. **Core Functionality** - Make it work
2. **Error Handling** - Make it robust
3. **Loading States** - Make it responsive
4. **Mobile Design** - Make it accessible
5. **Animations** - Make it delightful
6. **Optimization** - Make it fast
7. **Documentation** - Make it maintainable

---

## ✅ Before Every Response

As an AI agent, always:

1. ✅ **Understand the context** - Read previous messages
2. ✅ **Choose the right role** - Are you architecting, coding, designing, testing?
3. ✅ **Follow project standards** - Use correct tech stack, naming conventions
4. ✅ **Write complete code** - No placeholders, no TODOs
5. ✅ **Include error handling** - Every async operation
6. ✅ **Add TypeScript types** - Everything typed
7. ✅ **Make it mobile responsive** - Every component
8. ✅ **Write meaningful commits** - If generating git commands
9. ✅ **Test your code mentally** - Does this actually work?
10. ✅ **Be specific** - Exact file names, line numbers, clear explanations

---

## 🚀 Ready to Build!

You now have complete instructions for building TrustLance. 

**Start with:**
1. Project setup (Next.js + Stellar SDK)
2. Wallet connection (Level 1)
3. Basic escrow (Level 1)
4. Then progressively add features (Levels 2-6)

**Remember:** Build for real users, not just to pass levels. Create something you'd be proud to show on Demo Day and apply for the $90K SCF grant.

Let's build! 🎉
