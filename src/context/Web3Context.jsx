import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAddress, useContract, useDisconnect } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { CONTRACT_ADDRESS } from '../contracts/config';
import { BMBLANCE_ABI } from '../contracts/abi';

const Web3Context = createContext();

export const Web3ContextProvider = ({ children }) => {
  // ThirdWeb hooks
  const address = useAddress();
  const disconnect = useDisconnect();
  const { contract } = useContract(CONTRACT_ADDRESS, BMBLANCE_ABI);

  // Local state
  const [balance, setBalance] = useState('0');
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [tokenName, setTokenName] = useState('BMBL');
  const [tokenSymbol, setTokenSymbol] = useState('BMBL');
  const [tokenDecimals, setTokenDecimals] = useState(18);

  // Fetch token info on contract load
  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        if (contract) {
          const name = await contract?.call('name');
          const symbol = await contract?.call('symbol');
          const decimals = await contract?.call('decimals');
          setTokenName(name || 'BMBL');
          setTokenSymbol(symbol || 'BMBL');
          setTokenDecimals(decimals || 18);
        }
      } catch (error) {
        console.error('Error fetching token info:', error);
      }
    };
    fetchTokenInfo();
  }, [contract]);

  // Fetch balance when address or contract changes
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (address && contract) {
          setBalanceLoading(true);
          const bal = await contract?.call('balanceOf', [address]);
          const formatted = ethers.utils.formatUnits(bal.toString(), tokenDecimals || 18);
          setBalance(formatted);
        } else {
          setBalance('0');
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance('0');
      } finally {
        setBalanceLoading(false);
      }
    };
    fetchBalance();
  }, [address, contract, tokenDecimals]);

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setBalance('0');
      toast.info('Wallet disconnected');
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  const handleTransfer = async (to, amount) => {
    try {
      if (!address || !contract) {
        throw new Error('Wallet not connected');
      }

      if (!ethers.utils.isAddress(to)) {
        throw new Error('Invalid recipient address');
      }

      const amountInWei = ethers.utils.parseUnits(amount.toString(), tokenDecimals || 18);
      
      console.log('📤 Sending transfer to:', to);
      console.log('Amount in Wei:', amountInWei.toString());
      
      const tx = await contract?.call('transfer', [to, amountInWei]);
      
      console.log('✅ Transfer sent:', tx);
      toast.success('Transfer successful!');

      // Refresh balance
      const bal = await contract?.call('balanceOf', [address]);
      const formatted = ethers.utils.formatUnits(bal.toString(), tokenDecimals || 18);
      setBalance(formatted);

      return tx;
    } catch (error) {
      console.error('Transfer error:', error);
      toast.error('Transfer failed');
      throw error;
    }
  };

  const handlePresalePurchase = async (ethAmount) => {
    try {
      if (!address || !contract) {
        throw new Error('Wallet not connected');
      }

      // For presale: calculate tokens based on ETH amount
      // Using a simple ratio: 1 ETH = 10,000,000 BMBL (adjust as needed)
      const tokensPerEth = 10000000;
      const tokenAmount = parseFloat(ethAmount) * tokensPerEth;
      
      const amountInWei = ethers.utils.parseUnits(tokenAmount.toString(), tokenDecimals || 18);
      
      console.log('🎁 Processing presale purchase...');
      console.log('ETH Amount:', ethAmount);
      console.log('Token Amount:', tokenAmount);
      console.log('Amount in Wei:', amountInWei.toString());
      
      // Send tokens to the user's address
      const tx = await contract?.call('transfer', [address, amountInWei]);
      
      console.log('✅ Presale purchase confirmed:', tx);
      toast.success('Presale purchase successful!');

      // Refresh balance
      const bal = await contract?.call('balanceOf', [address]);
      const formatted = ethers.utils.formatUnits(bal.toString(), tokenDecimals || 18);
      setBalance(formatted);

      return tx;
    } catch (error) {
      console.error('Presale purchase error:', error);
      toast.error('Presale purchase failed');
      throw error;
    }
  };

  const addTokenToWallet = async () => {
    try {
      // Check if we're on mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (!window.ethereum) {
        // On mobile without direct ethereum access, show manual instructions
        if (isMobile) {
          toast.info(
            <div>
              <p><strong>Add Token Manually:</strong></p>
              <p style={{fontSize: '12px', marginTop: '8px'}}>
                1. Open MetaMask<br/>
                2. Go to "Import Tokens"<br/>
                3. Paste: {CONTRACT_ADDRESS.slice(0, 10)}...
              </p>
            </div>,
            { autoClose: 10000 }
          );
          // Copy address to clipboard
          navigator.clipboard.writeText(CONTRACT_ADDRESS);
          return true;
        }
        throw new Error('Please open this site in MetaMask browser or install MetaMask extension');
      }

      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: CONTRACT_ADDRESS,
            symbol: tokenSymbol || 'BMBL',
            decimals: tokenDecimals || 18,
            image: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000000000000000000000000000000000/logo.png',
          },
        },
      });

      if (wasAdded) {
        toast.success('✅ Token added to your wallet!');
        return true;
      }
    } catch (error) {
      console.error('Error adding token:', error);
      
      // On mobile, if the method fails, show manual instructions
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile || error.code === -32601 || error.message?.includes('not supported')) {
        toast.info(
          <div>
            <p><strong>Add Token Manually:</strong></p>
            <p style={{fontSize: '12px', marginTop: '8px'}}>
              Contract: {CONTRACT_ADDRESS.slice(0, 15)}...<br/>
              Symbol: BMBL | Decimals: 18
            </p>
          </div>,
          { autoClose: 10000 }
        );
        navigator.clipboard.writeText(CONTRACT_ADDRESS);
        return true;
      }
      
      if (error.code === 4001) {
        toast.error('You declined to add the token');
      } else {
        toast.error(error.message || 'Failed to add token');
      }
      throw error;
    }
  };

  const value = {
    address,
    balance,
    balanceLoading,
    tokenName,
    tokenSymbol,
    tokenDecimals,
    contract,
    disconnect: handleDisconnect,
    transfer: handleTransfer,
    presalePurchase: handlePresalePurchase,
    addTokenToWallet,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3Context must be used within Web3ContextProvider');
  }
  return context;
};
