import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Sepolia } from '@thirdweb-dev/chains'
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  rainbowWallet,
  trustWallet,
  walletConnect,
} from '@thirdweb-dev/react'
import { Web3ContextProvider } from './context/Web3Context'
import './index.css'
import App from './App.jsx'

console.log('🔧 Web3 Configuration:');
console.log('Chain: Sepolia (11155111)');
console.log('Provider: ThirdWeb SDK');

// dApp metadata for wallet connections
const dAppMetadata = {
  name: "BMBLANCE",
  description: "BMBLANCE - Bee-themed Charity Token Presale",
  url: window.location.origin,
  logoUrl: "https://raw.githubusercontent.com/Minhal128/BMBL-landing-page/main/public/logo.png",
  isDarkMode: true,
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID || "6050ee13a9535a355276835c37fd8b13"}
      dAppMeta={dAppMetadata}
      autoConnect={true}
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        walletConnect({
          recommended: false,
          projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "a8c9c34d63e003d6f7df64be69a96046",
        }),
        coinbaseWallet({
          recommended: false,
        }),
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
