import { ConnectWallet, useConnectionStatus, useAddress, useDisconnect } from '@thirdweb-dev/react';
import { Wallet } from 'lucide-react';

export const WalletConnectButton = ({ compact = false }) => {
  const connectionStatus = useConnectionStatus();
  const address = useAddress();
  const disconnect = useDisconnect();

  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <ConnectWallet
      theme="dark"
      btnTitle={
        connectionStatus === "connecting" 
          ? "Connecting..." 
          : connectionStatus === "connected" && address
            ? formatAddress(address)
            : "Connect Wallet"
      }
      modalTitle="Connect Your Wallet"
      switchToActiveChain={true}
      welcomeScreen={{
        title: 'BMBLANCE Token',
        subtitle: 'Connect your wallet to participate in the presale',
        img: {
          src: "https://raw.githubusercontent.com/Minhal128/BMBL-landing-page/main/public/logo.png",
          width: 150,
          height: 150,
        },
      }}
      modalSize={compact ? "compact" : "wide"}
      termsOfServiceUrl="https://bmblance.com/terms"
      privacyPolicyUrl="https://bmblance.com/privacy"
      style={{
        backgroundColor: '#FFD700',
        color: '#000',
        borderRadius: '8px',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: '600',
      }}
    />
  );
};
