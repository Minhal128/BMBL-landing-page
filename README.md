# 🐝 BMBLANCE - The Eco-Friendly Crypto Revolution

A revolutionary cryptocurrency token with built-in reflection rewards, eco-donations, and community-driven features. Built on blockchain with transparency and sustainability at its core.

## ✨ Features

- **💰 Reflection Rewards**: 2% of every transaction automatically distributed to all holders
- **🌳 Eco-Donations**: 2% goes to environmental causes
- **💧 Auto-Liquidity**: 2% adds to liquidity pool
- **🔥 Burnable**: Reduce supply by burning tokens
- **🔒 Secure**: Built with OpenZeppelin standards
- **🌐 Web3 Ready**: Full wallet integration on website

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MetaMask](https://metamask.io/) browser extension
- Sepolia ETH (get free from [Sepolia Faucet](https://sepoliafaucet.com/))

### Installation & Deployment

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure deployment**
   ```bash
   npm run setup
   ```
   Follow the prompts to enter your MetaMask private key.

3. **Deploy to Sepolia testnet**
   ```bash
   npm run deploy
   ```

4. **Start the website**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 Complete Guide

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🏗️ Project Structure

```
BMBL/
├── contracts/          # Smart contracts
│   └── BMBLANCE.sol   # Main token contract
├── scripts/           # Deployment scripts
│   ├── deploy.js     # Main deployment script
│   └── setup.js      # Interactive setup wizard
├── src/              # Website source
│   ├── components/   # React components
│   ├── contracts/    # Web3 integration
│   └── App.jsx      # Main app
├── hardhat.config.js # Hardhat configuration
└── package.json     # Dependencies
```

## 🔧 Available Commands

- `npm run setup` - Interactive deployment configuration
- `npm run deploy` - Deploy contract to Sepolia testnet
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 Contract Features

### Token Details
- **Name**: BMBLANCE
- **Symbol**: BMBL
- **Decimals**: 18
- **Total Supply**: 1,000,000,000,000 (1 Trillion)

### Tax Structure
- **Reflection Tax**: 2% (distributed to all holders)
- **Donation Tax**: 2% (sent to eco-wallet)
- **Liquidity Tax**: 2% (added to liquidity)
- **Total Tax**: 6%

### Owner Functions
- Update tax percentages (max 10% total)
- Change donation/liquidity wallets
- Exclude addresses from fees
- Emergency withdrawal functions

## 🎯 Testing on Testnet

1. **Get Sepolia ETH**
   - Visit https://sepoliafaucet.com/
   - Connect your MetaMask
   - Request test ETH

2. **Connect Wallet**
   - Go to Presale section on website
   - Click "Connect Wallet"
   - Approve in MetaMask

3. **Test Features**
   - View contract on Etherscan
   - Add BMBL to MetaMask
   - Simulate token purchase
   - Check your balance

## 📱 Web3 Integration

The website includes full Web3 functionality:

- ✅ MetaMask wallet connection
- ✅ Network detection (Sepolia)
- ✅ Token balance display
- ✅ Contract interaction
- ✅ Add token to wallet
- ✅ Real-time updates

## 🔒 Security

- Smart contract based on OpenZeppelin standards
- Reentrancy protection
- Owner-only functions for critical operations
- Transparent on blockchain
- Open source code

## ⚠️ Important Notes

### Testnet (Current)
- This is deployed on **Sepolia Testnet**
- No real money involved
- Free to test and experiment
- Perfect for demonstration

### Mainnet (Production)
- Requires professional audit
- Use hardware wallet
- Legal and compliance review
- Substantial gas fees

## 📚 Resources

- [Full Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Sepolia Explorer](https://sepolia.etherscan.io/)
- [MetaMask Guide](https://metamask.io/support/)
- [OpenZeppelin Docs](https://docs.openzeppelin.com/)

## 🤝 Support

For questions or issues:
1. Check the [Deployment Guide](./DEPLOYMENT_GUIDE.md)
2. Review Hardhat documentation
3. Check MetaMask support

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ for the environment 🌍🐝**
