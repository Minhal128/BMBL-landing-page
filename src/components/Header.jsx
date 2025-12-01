import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectWallet, useConnectionStatus } from '@thirdweb-dev/react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const connectionStatus = useConnectionStatus();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Log connection status for debugging
  useEffect(() => {
    console.log('🔌 Connection status:', connectionStatus);
  }, [connectionStatus]);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Charity', href: '#charity' },
    { name: 'Presale', href: '#presale' },
    { name: 'Join Hive', href: '#community' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal/95 backdrop-blur-lg shadow-2xl shadow-honey/10' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection('#home')}
          >
            <div className="text-5xl animate-float">🐝</div>
            <span className="text-2xl font-bold text-gradient">BMBLANCE</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className="text-text-primary hover:text-honey transition-colors cursor-pointer font-medium"
              >
                {item.name}
              </motion.a>
            ))}
            <ConnectWallet
              theme="dark"
              btnTitle={connectionStatus === "connecting" ? "Connecting..." : "Connect Wallet"}
              modalTitle="Connect Your Wallet"
              modalTitleIconUrl=""
              detailsBtn={() => <span>Connected</span>}
              switchToActiveChain={true}
              welcomeScreen={{
                title: "BMBLANCE Token",
                subtitle: "Connect your wallet to participate in the presale",
                img: {
                  src: "https://raw.githubusercontent.com/Minhal128/BMBL-landing-page/main/public/logo.png",
                  width: 150,
                  height: 150,
                },
              }}
              modalSize="wide"
              style={{
                backgroundColor: '#FFD700',
                color: '#000',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
              }}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-honey p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block text-text-primary hover:text-honey transition-colors cursor-pointer py-2 font-medium"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="w-full">
                  <ConnectWallet
                    theme="dark"
                    btnTitle={connectionStatus === "connecting" ? "Connecting..." : "Connect Wallet"}
                    modalTitle="Connect Your Wallet"
                    switchToActiveChain={true}
                    welcomeScreen={{
                      title: "BMBLANCE Token",
                      subtitle: "Connect your wallet to participate in the presale",
                    }}
                    modalSize="compact"
                    style={{
                      backgroundColor: '#FFD700',
                      color: '#000',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      width: '100%',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
