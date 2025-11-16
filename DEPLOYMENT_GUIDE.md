# 🐝 BMBLANCE Token - Complete Testnet Deployment Guide

## ✅ What's Been Created

Your BMBLANCE token project is now complete with:

1. **Smart Contract** (`contracts/BMBLANCE.sol`)
   - ERC-20 token with 1 trillion supply
   - 2% reflection rewards to all holders
   - 2% automatic donation to eco-wallet
   - 2% liquidity fund
   - Burn function
   - Owner controls

2. **Deployment Scripts** (`scripts/deploy.js`)
   - Automated deployment to Sepolia testnet
   - Contract verification support
   - Automatic config generation

3. **Web3 Integration** (`src/contracts/`)
   - Wallet connection (MetaMask)
   - Token balance display
   - Buy simulation
   - Add token to MetaMask
   - Real-time updates

4. **Updated Website UI**
   - Connected Presale component with wallet
   - Contract address display
   - Balance tracking
   - Testnet indicators

---

## 🚀 Deployment Steps

### Step 1: Setup Your Wallet

1. **Install MetaMask** (if not already installed)
   - Visit https://metamask.io/ and install the browser extension
   - Create a new wallet or import existing one
   - **SAVE YOUR SEED PHRASE SECURELY!**

2. **Add Sepolia Network to MetaMask**
   - Open MetaMask
   - Click the network dropdown (usually shows "Ethereum Mainnet")
   - Click "Add Network" or "Add Network Manually"
   - Enter these details:
     ```
     Network Name: Sepolia Test Network
     RPC URL: https://rpc.sepolia.org
     Chain ID: 11155111
     Currency Symbol: ETH
     Block Explorer: https://sepolia.etherscan.io/
     ```
   - Click "Save"

3. **Get Free Sepolia ETH**
   - Visit one of these faucets:
     - https://sepoliafaucet.com/
     - https://alchemy.com/faucets/ethereum-sepolia
     - https://www.infura.io/faucet/sepolia
   - Connect your MetaMask wallet
   - Request test ETH (you'll need ~0.01 ETH for deployment)
   - Wait for the transaction to complete

### Step 2: Configure Deployment

1. **Copy the environment file**
   ```powershell
   Copy-Item .env.example .env
   ```

2. **Get your private key from MetaMask**
   - Open MetaMask
   - Click the three dots menu
   - Go to "Account Details"
   - Click "Show Private Key"
   - Enter your password
   - **COPY THE PRIVATE KEY** (keep this SECRET!)

3. **Edit the `.env` file**
   Open `.env` in your editor and update:
   ```env
   SEPOLIA_RPC_URL=https://rpc.sepolia.org
   PRIVATE_KEY=your_private_key_here_without_0x
   ETHERSCAN_API_KEY=optional_for_verification
   
   # Leave these as is (will use deployer address as fallback)
   DONATION_WALLET=0x0000000000000000000000000000000000000000
   LIQUIDITY_WALLET=0x0000000000000000000000000000000000000000
   ```

   **⚠️ IMPORTANT:** Never commit the `.env` file to Git! It contains your private key.

### Step 3: Deploy the Contract

Run the deployment command:

```powershell
npm run deploy
```

You should see output like this:

```
🐝 Starting BMBLANCE Token Deployment on Sepolia Testnet...

📝 Deploying contracts with account: 0xYourAddress...
💰 Account balance: 0.05 ETH

🌳 Donation Wallet: 0xYourAddress
💧 Liquidity Wallet: 0xYourAddress

🚀 Deploying BMBLANCE Token...
✅ BMBLANCE Token deployed to: 0xContractAddress

📊 Token Details:
   Name: BMBLANCE
   Symbol: BMBL
   Decimals: 18
   Total Supply: 1000000000000 BMBL
   Owner Balance: 1000000000000 BMBL

💸 Tax Configuration:
   Reflection Tax: 2.00%
   Donation Tax: 2.00%
   Liquidity Tax: 2.00%
   Total Tax: 6.00%

💾 Deployment info saved to deployment.json
📝 Contract config saved to src/contracts/config.js

🎉 Deployment Complete!
```

### Step 4: Verify the Deployment

1. **Check the contract on Etherscan**
   - Open the URL shown in the deployment output
   - Example: `https://sepolia.etherscan.io/address/0xYourContractAddress`
   - You should see your contract with transactions

2. **Verify the contract source code (Optional)**
   - Get an Etherscan API key from https://etherscan.io/apis
   - Add it to your `.env` file
   - Run the verification command shown in the output

---

## 🌐 Testing Your Website

### Step 1: Start the Development Server

```powershell
npm run dev
```

The website will open at `http://localhost:5173`

### Step 2: Test Wallet Connection

1. Navigate to the **Presale** section
2. Click "Connect Wallet"
3. MetaMask will pop up - approve the connection
4. Make sure you're on **Sepolia Test Network**
5. Your wallet address and BMBL balance should appear

### Step 3: Test Token Features

1. **View Contract on Etherscan**
   - Click the external link icon next to the contract address
   - Verify the contract details

2. **Copy Contract Address**
   - Click the copy icon
   - Paste it somewhere to verify it copied

3. **Add Token to MetaMask**
   - Click "Add BMBL to MetaMask"
   - Approve in MetaMask popup
   - BMBL should now appear in your token list

4. **Simulate a Purchase**
   - Enter an amount (e.g., 0.01)
   - Click "Simulate Buy (Testnet)"
   - See the simulation results

### Step 4: Test Token Transfers

To test the reflection and donation features, you need to transfer tokens:

1. **Create a second wallet** (for testing)
   - In MetaMask, click "Create Account"
   - Name it "Test Account 2"
   - Copy the new address

2. **Send tokens from Remix or Etherscan**
   - Go to your contract on Etherscan
   - Click "Contract" > "Write Contract"
   - Connect your wallet
   - Use the `transfer` function:
     - `to`: Your second wallet address
     - `value`: 1000000000000000000000 (1000 tokens with 18 decimals)
   - Confirm the transaction

3. **Verify the tax was applied**
   - Check both wallets' balances
   - The receiver should get less than 1000 due to taxes
   - Donation wallet should receive 2%
   - All holders get reflection rewards

---

## 📋 Contract Functions You Can Test

Access these on Etherscan under "Write Contract":

### Owner Functions (Only you can call these)

- `updateTaxes(reflection, donation, liquidity)` - Change tax percentages
- `updateDonationWallet(address)` - Change donation wallet
- `updateLiquidityWallet(address)` - Change liquidity wallet
- `setExcludedFromFee(address, bool)` - Exclude/include from fees
- `withdrawETH()` - Withdraw any ETH sent to contract
- `rescueTokens(address, amount)` - Rescue tokens sent by mistake

### User Functions (Anyone can call)

- `transfer(to, amount)` - Transfer tokens
- `approve(spender, amount)` - Approve spending
- `burn(amount)` - Burn your tokens
- `balanceOf(address)` - Check balance
- `isExcludedFromFee(address)` - Check if address is fee-exempt

---

## 🎯 What to Show Your Client

### 1. Live Website
- Share the deployed website URL
- Show wallet connection working
- Demonstrate token balance display
- Show contract address and Etherscan link

### 2. Contract on Etherscan
- Show the deployed contract
- Point out the verified source code (if verified)
- Show transaction history
- Demonstrate token holders

### 3. Key Features
- **Reflection Rewards**: Every transaction redistributes 2% to all holders
- **Eco-Donation**: 2% goes to environmental causes
- **Anti-Rug Pull**: Owner functions are transparent and limited
- **Burnable**: Tokens can be burned to reduce supply
- **Secure**: Based on OpenZeppelin standards

### 4. Smart Contract Features
- Total supply: 1 trillion BMBL
- 6% total tax (2% reflection + 2% donation + 2% liquidity)
- Owner controls for tax adjustment
- Emergency functions for safety

---

## 🔒 Security Notes

### For Testnet (Current State)
✅ Safe to use your regular MetaMask account
✅ Private key in `.env` is okay for testing
✅ Free to experiment - no real money at risk

### For Mainnet (Production)
⚠️ **Never use the same private key as testnet**
⚠️ **Use a hardware wallet for deployment**
⚠️ **Get a professional audit before mainnet**
⚠️ **Test extensively on testnet first**
⚠️ **Have legal review of tokenomics**

---

## 🐛 Troubleshooting

### "Insufficient funds" error
- Make sure you have Sepolia ETH in your wallet
- Get more from the faucets listed above

### "Wrong network" error
- Switch to Sepolia in MetaMask
- The website will prompt you to switch

### Contract not deploying
- Check your private key in `.env`
- Ensure you have enough Sepolia ETH (>0.01)
- Check the RPC URL is correct

### Website can't connect to contract
- Make sure the contract is deployed
- Check that `src/contracts/config.js` was generated
- Refresh the page after deployment

### Tokens not showing in MetaMask
- Click "Add BMBL to MetaMask" button on website
- Or manually add: Contract Address, Symbol: BMBL, Decimals: 18

---

## 📦 Files Generated

After deployment, you'll have:

- `deployment.json` - Full deployment details
- `src/contracts/config.js` - Contract configuration for frontend
- `artifacts/` - Compiled contract artifacts
- `cache/` - Hardhat cache

---

## 🚀 Next Steps

### For Testing
1. ✅ Deploy to Sepolia (DONE after running deployment)
2. ✅ Test wallet connection (Use the website)
3. ✅ Test token transfers (Send to another address)
4. ✅ Verify reflection rewards work
5. ✅ Show client the live demo

### For Production (Later)
1. ⏳ Get professional smart contract audit
2. ⏳ Deploy to BSC or Ethereum mainnet
3. ⏳ List on DEX (Uniswap/PancakeSwap)
4. ⏳ Apply for CoinGecko/CoinMarketCap listing
5. ⏳ Launch marketing campaign

---

## 💡 Tips for Client Demo

1. **Prepare ahead**: Deploy and test everything before the meeting
2. **Use screen recording**: Record the process in case of connectivity issues
3. **Have backup**: Take screenshots of key moments
4. **Explain simply**: Avoid technical jargon
5. **Show Etherscan**: It proves the contract is real and deployed
6. **Demonstrate transfers**: Show the taxes in action
7. **Highlight features**: Reflection rewards, eco-donation, transparency

---

## 📞 Support Resources

- **Sepolia Faucets**: https://sepoliafaucet.com/
- **Sepolia Explorer**: https://sepolia.etherscan.io/
- **MetaMask Help**: https://metamask.io/support/
- **Hardhat Docs**: https://hardhat.org/docs
- **Ethers.js Docs**: https://docs.ethers.org/

---

**Good luck with your client presentation! 🚀🐝**
