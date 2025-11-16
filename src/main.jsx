import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Sepolia } from '@thirdweb-dev/chains'
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  rainbowWallet,
  trustWallet,
} from '@thirdweb-dev/react'
import { Web3ContextProvider } from './context/Web3Context'
import './index.css'
import App from './App.jsx'

console.log('🔧 Web3 Configuration:');
console.log('Chain: Sepolia (11155111)');
console.log('Provider: ThirdWeb SDK');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId={`${import.meta.env.VITE_THIRDWEB_CLIENT_ID}`}
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        coinbaseWallet(),
        rainbowWallet(),
        trustWallet(),
      ]}
    >
      <Web3ContextProvider>
        <App />
      </Web3ContextProvider>
    </ThirdwebProvider>
  </StrictMode>,
)
