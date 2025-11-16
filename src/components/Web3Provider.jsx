import { useEffect, useRef } from 'react';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import web3Service from '../contracts/web3Service';
import { NETWORK_ID, RPC_URL } from '../contracts/config';

let web3modal = null;

export function Web3Provider({ children }) {
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    try {
      // Get the chain ID in the correct format
      const chainId = NETWORK_ID;

      // Create Web3Modal configuration
      const metadata = {
        name: 'BMBLANCE',
        description: 'BMBLANCE - Bee-themed Charity Token',
        url: window.location.origin,
        icons: ['https://avatars.githubusercontent.com/u/37784886']
      };

      const chains = [
        {
          chainId: chainId,
          name: 'Sepolia',
          currency: 'ETH',
          explorerUrl: 'https://sepolia.etherscan.io',
          rpcUrl: RPC_URL
        }
      ];

      // Initialize Web3Modal
      web3modal = createWeb3Modal({
        ethersConfig: defaultConfig({
          metadata,
          defaultChainId: chainId,
          rpcUrl: RPC_URL,
          chains: chains
        }),
        chains: chains,
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'a8c9c34d63e003',
        enableAnalytics: true,
        themeMode: 'dark'
      });

      // Create a wrapper object that matches the expected interface
      const web3ModalWrapper = {
        open: async () => {
          try {
            // Web3Modal.open() opens the modal and returns the provider
            const provider = await web3modal.open();
            
            // If provider is null, user cancelled
            if (!provider) {
              throw new Error('Wallet connection cancelled');
            }
            
            return {
              provider: provider,
              disconnect: () => web3modal.disconnect()
            };
          } catch (error) {
            console.error('Web3Modal connection error:', error);
            throw error;
          }
        },
        disconnect: () => web3modal?.disconnect()
      };

      // Initialize web3Service with Web3Modal
      web3Service.initWeb3Modal(web3ModalWrapper);
    } catch (error) {
      console.error('Failed to initialize Web3Modal:', error);
    }
  }, []);

  return <>{children}</>;
}

export default Web3Provider;
