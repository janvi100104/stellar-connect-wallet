# TrustLance - Freelance Escrow Platform

TrustLance is a blockchain-based escrow platform built on Stellar that enables secure freelance payments with lower fees and instant settlements.

## Features

- Wallet connection with Freighter
- XLM balance display
- Simple escrow creation
- Funding and payment release
- Multi-wallet support
- Real-time status tracking

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- @stellar/stellar-sdk
- @stellar/freighter-api
- @creit.tech/stellar-wallets-kit
- Zustand for state management
- Sonner for notifications

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd stellar-connect-wallet
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

5. Run the development server:
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Setup Instructions

1. Install the [Freighter wallet extension](https://chrome.google.com/webstore/detail/freighter/xexzokzghmdukkyscdfjteluazmyijvw)
2. Create a testnet account using the [Stellar Laboratory](https://laboratory.stellar.org/) or [Stellar Quest faucet](https://dashboard.stellar.org/)
3. Fund your testnet account with testnet lumens using the faucet
4. Connect your wallet to the application

## Project Structure

- `app/page.tsx` - Main landing page
- `components/wallet/` - Wallet-related components
- `components/escrow/` - Escrow functionality components
- `store/useWallet.ts` - Wallet state management
- `lib/utils.ts` - Utility functions

## Level 1 Features (White Belt)

- ✅ Wallet connection with Freighter
- ✅ Display wallet address (truncated)
- ✅ Show XLM balance
- ✅ Simple payment form
- ✅ Create simple escrow
- ✅ Fund escrow functionality
- ✅ Release payment functionality
- ✅ Success/error notifications
- ✅ Mobile responsive design

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT