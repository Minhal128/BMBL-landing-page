import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, NETWORK_ID, RPC_URL, TOKEN_INFO } from './config';
import { BMBLANCE_ABI } from './abi';

class Web3Service {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.account = null;
    this.web3modal = null;
  }

  // Initialize Web3Modal
  initWeb3Modal(web3modal) {
    this.web3modal = web3modal;
  }

  // Check if any wallet provider is available
  isWalletAvailable() {
    return typeof window.ethereum !== 'undefined' || this.web3modal;
  }

  // Get provider
  getProvider() {
    if (!this.provider) {
      if (typeof window.ethereum !== 'undefined') {
        this.provider = new ethers.BrowserProvider(window.ethereum);
      } else {
        // Fallback to read-only provider
        this.provider = new ethers.JsonRpcProvider(RPC_URL);
      }
    }
    return this.provider;
  }

  // Connect wallet using Web3Modal
  async connectWallet() {
    try {
      if (!this.web3modal) {
        throw new Error('Web3Modal not initialized. Please refresh the page.');
      }

      // Open Web3Modal to let user select wallet
      const result = await this.web3modal.open();
      
      if (!result) {
        throw new Error('Wallet connection cancelled');
      }

      // Get the provider - it could be result.provider or result itself
      const rawProvider = result.provider || result;
      
      if (!rawProvider) {
        throw new Error('No provider returned from Web3Modal');
      }

      // Get the connected wallet provider
      const provider = new ethers.BrowserProvider(rawProvider);
      const accounts = await provider.listAccounts();

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Check network
      const network = await provider.getNetwork();
      if (network.chainId !== NETWORK_ID) {
        await this.switchNetwork(rawProvider);
      }

      // Handle both string and object account formats
      this.account = typeof accounts[0] === 'string' ? accounts[0] : accounts[0].address;
      this.provider = provider;
      this.signer = await this.provider.getSigner();
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, BMBLANCE_ABI, this.signer);

      return this.account;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  // Switch to Sepolia network
  async switchNetwork(provider = null) {
    try {
      const ethereumProvider = provider || window.ethereum;
      if (!ethereumProvider) {
        throw new Error('No Ethereum provider available');
      }

      await ethereumProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${NETWORK_ID.toString(16)}` }],
      });
    } catch (switchError) {
      // Network not added, add it
      if (switchError.code === 4902) {
        const ethereumProvider = provider || window.ethereum;
        await ethereumProvider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${NETWORK_ID.toString(16)}`,
              chainName: 'Sepolia Test Network',
              nativeCurrency: {
                name: 'Sepolia ETH',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: [RPC_URL],
              blockExplorerUrls: ['https://sepolia.etherscan.io']
            }
          ]
        });
      } else {
        throw switchError;
      }
    }
  }

  // Get token balance
  async getBalance(address) {
    try {
      const provider = this.getProvider();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, BMBLANCE_ABI, provider);
      const balance = await contract.balanceOf(address);
      return ethers.utils.formatUnits(balance, TOKEN_INFO.decimals);
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  // Get token info
  async getTokenInfo() {
    try {
      const provider = this.getProvider();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, BMBLANCE_ABI, provider);

      const [name, symbol, decimals, totalSupply, reflectionTax, donationTax, liquidityTax] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.totalSupply(),
        contract.reflectionTax(),
        contract.donationTax(),
        contract.liquidityTax()
      ]);

      return {
        name,
        symbol,
        decimals: Number(decimals),
        totalSupply: ethers.utils.formatUnits(totalSupply, decimals),
        taxes: {
          reflection: Number(reflectionTax) / 100,
          donation: Number(donationTax) / 100,
          liquidity: Number(liquidityTax) / 100,
          total: (Number(reflectionTax) + Number(donationTax) + Number(liquidityTax)) / 100
        }
      };
    } catch (error) {
      console.error('Error getting token info:', error);
      throw error;
    }
  }

  // Transfer tokens
  async transfer(to, amount) {
    if (!this.contract) {
      throw new Error('Please connect your wallet first');
    }

    try {
      if (!ethers.utils.isAddress(to)) {
        throw new Error('Invalid recipient address');
      }

      // Convert amount to wei
      const amountInWei = ethers.utils.parseUnits(amount.toString(), TOKEN_INFO.decimals);
      
      // Check balance first
      const balance = await this.contract.balanceOf(this.account);
      if (balance < amountInWei) {
        throw new Error(`Insufficient balance. You have ${ethers.utils.formatUnits(balance, TOKEN_INFO.decimals)} BMBL`);
      }

      // Estimate gas first
      let gasEstimate;
      try {
        gasEstimate = await this.contract.transfer.estimateGas(to, amountInWei);
        // Add 20% buffer to gas estimate
        gasEstimate = gasEstimate * 120n / 100n;
      } catch (gasError) {
        console.error('Gas estimation failed:', gasError);
        // Use a default gas limit if estimation fails
        gasEstimate = 100000n;
      }

      // Send transaction with explicit gas limit
      const tx = await this.contract.transfer(to, amountInWei, {
        gasLimit: gasEstimate
      });
      
      // Wait for confirmation
      const receipt = await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error transferring tokens:', error);
      
      // Provide user-friendly error messages
      if (error.message.includes('insufficient funds')) {
        throw new Error('Insufficient ETH for gas fees. Please add some Sepolia ETH to your wallet.');
      } else if (error.message.includes('execution reverted')) {
        throw new Error('Transaction failed. This might be due to insufficient token balance or contract restrictions.');
      } else if (error.message.includes('user rejected')) {
        throw new Error('Transaction cancelled by user.');
      } else {
        throw new Error(error.message || 'Transfer failed. Please try again.');
      }
    }
  }

  // Simulate buy (for testnet demonstration)
  async simulateBuy(amountInETH) {
    if (!this.contract) {
      throw new Error('Please connect your wallet first');
    }

    try {
      // This is a simulation - in production, this would interact with a DEX
      // For testnet, we'll just show how much tokens they would get
      const ethAmount = parseFloat(amountInETH);
      const tokenPrice = 0.0000001; // Example price: 1 BMBL = 0.0000001 ETH
      const tokensToReceive = ethAmount / tokenPrice;
      
      return {
        ethAmount,
        tokensToReceive: tokensToReceive.toFixed(2),
        message: 'This is a testnet simulation. In production, tokens would be purchased from a DEX like Uniswap.'
      };
    } catch (error) {
      console.error('Error simulating buy:', error);
      throw error;
    }
  }

  // Add token to wallet
  async addTokenToWallet() {
    if (!this.provider || !window.ethereum) {
      throw new Error('No wallet connected');
    }

    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: CONTRACT_ADDRESS,
            symbol: TOKEN_INFO.symbol,
            decimals: TOKEN_INFO.decimals,
            image: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000000000000000000000000000000000/logo.png', // Generic token icon
          },
        },
      });
      
      if (wasAdded) {
        return { success: true, message: 'Token successfully added to your wallet!' };
      } else {
        throw new Error('User declined to add the token');
      }
    } catch (error) {
      console.error('Error adding token to wallet:', error);
      
      // Provide user-friendly error messages
      if (error.code === 4001) {
        throw new Error('You declined the request to add the token');
      } else if (error.message?.includes('User rejected')) {
        throw new Error('You declined the request to add the token');
      } else if (error.message?.includes('already pending')) {
        throw new Error('A wallet request is already pending. Please check your wallet.');
      } else {
        throw new Error(error.message || 'Failed to add token to wallet. Please try again.');
      }
    }
  }

  // Listen to account changes
  onAccountsChanged(callback) {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          this.account = accounts[0];
          callback(accounts[0]);
        } else {
          this.disconnect();
          callback(null);
        }
      });
    }
  }

  // Listen to chain changes
  onChainChanged(callback) {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('chainChanged', callback);
    }
  }

  // Disconnect wallet
  disconnect() {
    this.account = null;
    this.signer = null;
    this.contract = null;
  }

  // Get current account
  getCurrentAccount() {
    return this.account;
  }

  // Format address for display
  formatAddress(address) {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }
}

export default new Web3Service();
