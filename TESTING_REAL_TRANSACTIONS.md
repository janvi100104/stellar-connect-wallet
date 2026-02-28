# Testing Real Transactions - TrustLance

## ✅ Build Successful!

The application now has **REAL transaction support** on Stellar testnet!

---

## 🧪 How to Test Real Transactions

### 1. Start the Application
```bash
cd frontend
pnpm dev
```

Open **http://localhost:3000** in your browser.

### 2. Prerequisites

#### Install Freighter Wallet
- Chrome Extension: https://chrome.google.com/webstore/detail/freighter
- Make sure it's installed and visible in your browser

#### Create a Testnet Account
1. Open Freighter wallet
2. Click the network selector (top left)
3. Choose **Test Net**
4. If you don't have an account:
   - Go to: https://stellar.org/laboratory/#account-creator
   - Click "Generate Keypair"
   - Copy the **Public Key** (starts with G)
   - Click "Create Account" (this funds your account with 10,000 XLM)
   - Import the account into Freighter using the secret key

### 3. Test Payment Transaction

1. **Connect Wallet**
   - Click "Connect Wallet" button on the landing page
   - Freighter will prompt you to connect
   - Approve the connection

2. **View Balance**
   - Your XLM balance should appear
   - If it shows "No balance", your account needs funding (use the faucet above)

3. **Send a Payment**
   - Navigate to the payment form (or dashboard)
   - Get a **second testnet address** (you can generate another account in Freighter)
   - Enter the recipient address
   - Enter amount (e.g., `10` XLM)
   - Click "Send XLM"

4. **Verify Transaction**
   - Freighter will show a signing prompt
   - Review the transaction details
   - Click "Sign"
   - You should see a success message with:
     - ✅ Transaction hash
     - Link to view on Stellar Chain explorer
   - Click the link to see your transaction on the blockchain!

### 4. Test Escrow Creation

1. **Navigate to Dashboard**
   - Click "Go to Dashboard" button (appears when wallet is connected)

2. **Create Escrow**
   - Click "Create Escrow" or use the form
   - Enter:
     - Project Title: "Test Project"
     - Freelancer Address: (any G... address)
     - Amount: `100` XLM
     - Deadline: `7` days
   - Click "Create Escrow"

3. **Note**: The escrow contract is not deployed yet, so it will run in **demo mode**
   - You'll see an informative message
   - The escrow will be created in demo mode
   - Fund/Release/Refund buttons will work in simulation mode

---

## 🔍 What Makes This "Real"?

### Payment Transactions are REAL:
✅ Uses Stellar SDK to build actual transactions
✅ Queries your account from Horizon
✅ Creates transaction with real sequence number
✅ Signs with Freighter wallet
✅ Submits to Stellar network
✅ Returns real transaction hash
✅ Transaction is visible on blockchain explorer

### Escrow is in DEMO Mode:
⚠️ Contract code is complete but not deployed
⚠️ Frontend simulates the flow
⚠️ No real funds are locked (yet)

To enable real escrow:
1. Deploy the contract (see `trustLance/DEPLOYMENT.md`)
2. Update `NEXT_PUBLIC_ESCROW_CONTRACT_ID` in `.env.local`
3. Rebuild and redeploy

---

## 🐛 Troubleshooting

### "Freighter wallet not found"
- Make sure the Freighter extension is installed
- Refresh the page
- Check if extension is enabled in Chrome

### "Insufficient balance"
- Your account needs more testnet XLM
- Use the friendbot: https://friendbot.stellar.org/?addr=YOUR_ADDRESS

### "Transaction failed"
- Check if you're on Testnet network in Freighter
- Make sure you have enough XLM for the payment + fees (~0.00001 XLM)
- Try a smaller amount

### "Invalid address format"
- Stellar addresses start with `G` and are 56 characters
- Double-check you copied the full address

### Balance not showing
- Make sure wallet is connected
- Click "Refresh Balance"
- Check if account exists on the network

---

## 📊 Transaction Flow (Technical)

```
User clicks "Send XLM"
    ↓
Validate inputs (address, amount)
    ↓
Fetch account from Horizon (get sequence number)
    ↓
Build Transaction:
  - Source: Your account
  - Operation: Payment
  - Destination: Recipient address
  - Amount: XLM (in stroops)
  - Fee: 100 stroops
    ↓
Sign with Freighter
    ↓
Submit to Horizon
    ↓
Receive transaction hash
    ↓
Display success with explorer link
```

---

## 🎉 Success Indicators

You'll know it's working when you see:
- ✅ "Payment sent successfully!" toast
- ✅ Transaction hash displayed
- ✅ "View on Stellar Chain" link works
- ✅ Balance updates after transaction
- ✅ Transaction visible on blockchain explorer

---

## 🚀 Next Steps

1. **Test the payment flow** multiple times
2. **View transactions** on Stellar Chain explorer
3. **Deploy escrow contract** to enable real escrow
4. **Deploy to Vercel** for public access

---

## 📝 Environment Variables

Make sure these are set in `frontend/.env.local`:

```env
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_ESCROW_CONTRACT_ID=  # Leave empty for demo mode
```

---

**Happy Testing!** 🎊

Your transactions are now **100% real** on Stellar testnet!
