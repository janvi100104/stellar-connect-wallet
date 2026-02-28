# Escrow Contract Deployment Guide

This guide explains how to deploy the TrustLance escrow contract to Stellar testnet.

## Prerequisites

1. **Install Rust** (if not already installed):
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   source $HOME/.cargo/env
   ```

2. **Install Stellar CLI**:
   ```bash
   # Using Homebrew (macOS)
   brew install stellar

   # Or using cargo
   cargo install --locked stellar-cli
   ```

3. **Set up Stellar wallet**:
   - Install Freighter wallet extension
   - Create a testnet account
   - Fund it with testnet XLM from: https://stellar.org/laboratory/#account-creator

4. **Configure Stellar CLI**:
   ```bash
   # Add testnet network
   stellar network add testnet

   # Set default network
   stellar config identity generate testnet
   ```

## Step 1: Build the Contract

Navigate to the contracts directory:

```bash
cd trustLance/contracts/escrow
```

Build the contract:

```bash
# Build for production
stellar contract build

# Or using cargo directly
cargo build --release --target wasm32-unknown-unknown
```

The compiled contract will be at:
`target/wasm32-unknown-unknown/release/escrow.wasm`

## Step 2: Run Tests

Before deploying, run the tests:

```bash
cd ../../
cargo test --package escrow
```

All tests should pass. If any fail, fix the issues before deploying.

## Step 3: Deploy to Testnet

### Option A: Using Stellar CLI (Recommended)

```bash
# Deploy the contract
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/escrow.wasm \
  --network testnet \
  --source YOUR_WALLET_ADDRESS
```

This will output the contract ID. Save it!

### Option B: Using Soroban CLI

```bash
# Upload contract Wasm
stellar contract upload \
  --wasm target/wasm32-unknown-unknown/release/escrow.wasm \
  --network testnet \
  --source YOUR_WALLET_ADDRESS

# Note the contract ID from the output
```

## Step 4: Configure Frontend

After deployment, update the frontend environment variables:

```bash
# In frontend/.env.local
NEXT_PUBLIC_ESCROW_CONTRACT_ID=<YOUR_DEPLOYED_CONTRACT_ID>
```

Example:
```
NEXT_PUBLIC_ESCROW_CONTRACT_ID=CDZBQK7ZVQXN...
```

## Step 5: Verify Deployment

Verify the contract is deployed:

```bash
stellar contract inspect \
  --id <YOUR_CONTRACT_ID> \
  --network testnet
```

You should see the contract functions:
- `initialize`
- `fund`
- `release_payment`
- `request_revision`
- `refund`
- `raise_dispute`
- `get_escrow`
- `get_status`
- `get_escrow_count`

## Step 6: Test Contract Interaction

Test initializing an escrow:

```bash
stellar contract invoke \
  --id <YOUR_CONTRACT_ID> \
  --network testnet \
  --source YOUR_WALLET_ADDRESS \
  -- \
  initialize \
  --freelancer <FREELANCER_ADDRESS> \
  --amount 10000000 \
  --deadline <UNIX_TIMESTAMP> \
  --metadata "Test escrow"
```

## Troubleshooting

### Error: "Account not found"
Your account doesn't exist on the network. Fund it first:
- Go to https://stellar.org/laboratory/#account-creator
- Enter your public key
- Click "Create Account"

### Error: "Insufficient balance"
You need more testnet XLM. Use the friendbot:
```bash
curl -X POST "https://friendbot.stellar.org?addr=<YOUR_ADDRESS>"
```

### Error: "Contract already exists"
The contract is already deployed. Use the existing contract ID.

### Error: "Wasm too large"
Optimize the build:
```bash
cargo install wasm-opt
wasm-opt -Oz target/wasm32-unknown-unknown/release/escrow.wasm -o escrow.optimized.wasm
```

## Contract Functions Reference

### initialize
Creates a new escrow.
```
--freelancer <ADDRESS>
--amount <STROOPS>
--deadline <UNIX_TIMESTAMP>
--metadata <STRING>
```

### fund
Funds the escrow (must be called by client).
```
--escrow_id <U64>
```

### release_payment
Releases payment to freelancer (must be called by client).
```
--escrow_id <U64>
```

### request_revision
Requests changes to the work.
```
--escrow_id <U64>
--note <STRING>
```

### refund
Refunds client after deadline.
```
--escrow_id <U64>
```

### raise_dispute
Raises a dispute.
```
--escrow_id <U64>
--reason <STRING>
```

### get_escrow
Gets escrow details.
```
--escrow_id <U64>
```

### get_status
Gets escrow status.
```
--escrow_id <U64>
```

### get_escrow_count
Gets total number of escrows.
```
(no arguments)
```

## Next Steps

After successful deployment:

1. Update `frontend/.env.local` with the contract ID
2. Rebuild the frontend: `pnpm build`
3. Test the full escrow flow in the UI
4. Deploy to production (Vercel, Netlify, etc.)

## Security Notes

- Always test on testnet before mainnet deployment
- Audit the contract code before handling real funds
- Consider multi-sig for production contracts
- Monitor contract events for suspicious activity
