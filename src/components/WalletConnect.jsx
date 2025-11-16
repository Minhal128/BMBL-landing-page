import { ConnectWallet } from '@thirdweb-dev/react';
import { Wallet } from 'lucide-react';

export const WalletConnectButton = () => {
  return (
    <ConnectWallet
      theme="dark"
      btnTitle="Connect Wallet"
      modalTitle="Connect Your Wallet"
      welcomeScreen={{
        title: 'Connect Wallet',
        subtitle: 'Connect your wallet to participate in BMBLANCE',
      }}
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
