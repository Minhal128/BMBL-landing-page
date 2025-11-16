import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Wallet, ArrowRight, CheckCircle, Zap, DollarSign, CreditCard, Gem, ExternalLink, Copy, Check } from 'lucide-react';
import { useWeb3Context } from '../context/Web3Context';
import { CONTRACT_ADDRESS } from '../contracts/config';
import { toast } from 'react-toastify';

const EXPLORER_URL = 'https://sepolia.etherscan.io';

const Presale = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [lastTxHash, setLastTxHash] = useState('');

  const { address, balance, balanceLoading, tokenName, tokenSymbol, transfer, connectWallet, presalePurchase, addTokenToWallet } = useWeb3Context();

  // Countdown timer (replace with actual presale end date)
  const [timeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 34,
    seconds: 22
  });

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const handleAddToken = async () => {
    try {
      await addTokenToWallet();
    } catch (error) {
      console.error('Add token error:', error);
    }
  };

  const handlePresalePurchaseClick = async () => {
    if (!address) {
      setError('Please connect your wallet first');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsTransferring(true);
    setError('');

    try {
      console.log('🎁 Processing presale purchase...');
      console.log('ETH Amount:', amount);
      
      // Call the presalePurchase function from Web3Context
      // This will trigger MetaMask to ask for approval
      const receipt = await presalePurchase(amount);
      
      console.log('✅ Transaction successful:', receipt);
      
      toast.success('✅ Presale Purchase Successful!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'dark',
      });
      
      setLastTxHash(receipt?.transactionHash || receipt?.hash || '');
      setAmount('');
    } catch (error) {
      console.error('Purchase error:', error);
      setError(error.message || 'Purchase failed');
      toast.error(error.message || 'Purchase failed');
    } finally {
      setIsTransferring(false);
    }
  };

  const handleRealTransfer = async () => {
    if (!address) {
      setError('Please connect your wallet first');
      return;
    }

    if (!transferTo || !transferAmount) {
      setError('Please enter recipient address and amount');
      return;
    }

    if (parseFloat(transferAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (parseFloat(transferAmount) > parseFloat(balance)) {
      setError('Insufficient balance');
      return;
    }

    setIsTransferring(true);
    setError('');

    try {
      const tx = await transfer(transferTo, transferAmount);
      
      // Clear form
      setTransferTo('');
      setTransferAmount('');
      setLastTxHash(tx?.receipt?.transactionHash || tx?.hash || '');
      
      toast.success('✅ Transfer Successful!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'dark',
      });
    } catch (error) {
      console.error('Transfer error:', error);
      setError(error.message || 'Transfer failed');
    } finally {
      setIsTransferring(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <section id="presale" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 honeycomb-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-charcoal/90"></div>

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Join the Presale
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            Get in early and be part of the buzz! Limited time offer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Presale Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-honey/10 to-soft-green/10 border-2 border-honey/30">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-honey">Buy BMBL Tokens</h3>
                  {address && (
                    <div className="text-sm">
                      <p className="text-text-secondary">Your Balance</p>
                      <p className="text-honey font-bold">{balance} BMBL</p>
                    </div>
                  )}
                </div>

                {/* Contract Address */}
                <div className="mb-6 p-4 bg-charcoal/60 rounded-lg">
                  <p className="text-text-secondary text-sm mb-2">Contract Address (Sepolia Testnet)</p>
                  <div className="flex items-center gap-2">
                    <code className="text-honey text-xs break-all flex-1">{CONTRACT_ADDRESS}</code>
                    <button 
                      onClick={copyAddress}
                      className="p-2 hover:bg-honey/20 rounded transition-colors"
                      title="Copy address"
                    >
                      {copied ? <Check className="w-4 h-4 text-soft-green" /> : <Copy className="w-4 h-4 text-honey" />}
                    </button>
                    <a 
                      href={`${EXPLORER_URL}/address/${CONTRACT_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-honey/20 rounded transition-colors"
                      title="View on Etherscan"
                    >
                      <ExternalLink className="w-4 h-4 text-honey" />
                    </a>
                  </div>
                </div>

                {/* Wallet Status */}
                {address && (
                  <div className="mb-6 p-4 bg-soft-green/10 rounded-lg border border-soft-green/30">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Connected:</span>
                      <span className="text-soft-green font-mono">{formatAddress(address)}</span>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
                
                {/* Presale Stats */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Network:</span>
                    <span className="text-honey font-bold">Sepolia Testnet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Token Symbol:</span>
                    <span className="text-honey font-bold">{tokenSymbol || 'BMBL'}</span>
                  </div>
                  {address && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Your Balance:</span>
                        <span className="text-honey font-bold">{balanceLoading ? 'Loading...' : balance} {tokenSymbol || 'BMBL'}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">Testnet Demo Progress</span>
                    <span className="text-honey font-bold">65% (Demo)</span>
                  </div>
                  <div className="w-full bg-charcoal/60 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "65%" } : {}}
                      transition={{ duration: 1.5, delay: 0.4 }}
                      className="h-full bg-gradient-to-r from-honey to-soft-green rounded-full"
                    ></motion.div>
                  </div>
                </div>

                {/* Input */}
                <div className="mb-6">
                  <label className="block text-text-primary mb-2 font-medium">
                    Amount (ETH - Testnet)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.01"
                    step="0.01"
                    min="0"
                    className="w-full bg-charcoal/60 border border-honey/30 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-honey transition-colors"
                  />
                  {amount && (
                    <p className="text-soft-green text-sm mt-2">
                      Estimated tokens: ~{(parseFloat(amount) / 0.0000001).toFixed(2)} BMBL
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  {!address ? (
                    <Button 
                      className="w-full gap-2" 
                      size="lg"
                      onClick={handleConnectWallet}
                    >
                      <Wallet className="w-5 h-5" />
                      Connect Wallet
                    </Button>
                  ) : (
                    <>
                      <Button 
                        className="w-full gap-2" 
                        size="lg"
                        onClick={handlePresalePurchaseClick}
                        disabled={isTransferring || !amount || parseFloat(amount) <= 0}
                      >
                        {isTransferring ? 'Processing...' : 'Transfer Tokens'}
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                      <Button 
                        className="w-full gap-2 bg-soft-green hover:bg-soft-green/80 text-charcoal font-bold" 
                        size="lg"
                        onClick={handleAddToken}
                        variant="secondary"
                      >
                        <Gem className="w-5 h-5" />
                        Add Token to Wallet
                      </Button>
                    </>
                  )}
                </div>

                {/* Testnet Notice */}
                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <p className="text-blue-400 text-sm text-center">
                    🧪 This is a <strong>TESTNET</strong> deployment on Sepolia. No real funds required!
                  </p>
                </div>

                {/* Benefits */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-text-secondary">
                    <CheckCircle className="w-5 h-5 text-soft-green flex-shrink-0" />
                    <span className="text-sm">Automatic reflection rewards to holders</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <CheckCircle className="w-5 h-5 text-soft-green flex-shrink-0" />
                    <span className="text-sm">2% of every transaction goes to eco-donations</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <CheckCircle className="w-5 h-5 text-soft-green flex-shrink-0" />
                    <span className="text-sm">Built-in liquidity mechanisms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Countdown & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Countdown Timer */}
            <Card className="bg-charcoal/80 border-2 border-honey/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-center text-honey mb-6">
                  Presale Ends In
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="text-center">
                      <div className="bg-honey/10 rounded-xl p-4 mb-2">
                        <div className="text-4xl font-bold text-honey">{value}</div>
                      </div>
                      <div className="text-text-secondary text-sm capitalize">{unit}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How to Buy */}
            <Card className="bg-charcoal/80">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-honey mb-6">How to Buy (Testnet)</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-honey/20 rounded-full flex items-center justify-center text-honey font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary mb-1">Get Sepolia ETH</h4>
                      <p className="text-text-secondary text-sm">Get free test ETH from <a href="https://sepoliafaucet.com/" target="_blank" rel="noopener noreferrer" className="text-honey hover:underline">Sepolia Faucet</a></p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-honey/20 rounded-full flex items-center justify-center text-honey font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary mb-1">Connect Wallet</h4>
                      <p className="text-text-secondary text-sm">Use MetaMask on Sepolia network</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-honey/20 rounded-full flex items-center justify-center text-honey font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary mb-1">Test the Contract</h4>
                      <p className="text-text-secondary text-sm">Simulate buying and see the contract in action</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-honey/20 rounded-full flex items-center justify-center text-honey font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary mb-1">Add to MetaMask</h4>
                      <p className="text-text-secondary text-sm">Track your BMBL tokens in your wallet</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accepted Payments */}
            <Card className="bg-gradient-to-br from-honey/10 to-soft-green/10">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-text-primary mb-4 text-center">
                  We Accept
                </h4>
                <div className="flex justify-center items-center gap-6">
                  <div title="BNB" className="p-3 bg-honey/20 rounded-lg hover:scale-110 transition-transform">
                    <Gem className="w-10 h-10 text-honey" />
                  </div>
                  <div title="ETH" className="p-3 bg-honey/20 rounded-lg hover:scale-110 transition-transform">
                    <Zap className="w-10 h-10 text-honey" />
                  </div>
                  <div title="USDT" className="p-3 bg-honey/20 rounded-lg hover:scale-110 transition-transform">
                    <DollarSign className="w-10 h-10 text-honey" />
                  </div>
                  <div title="Card" className="p-3 bg-honey/20 rounded-lg hover:scale-110 transition-transform">
                    <CreditCard className="w-10 h-10 text-honey" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Real Transfer Section */}
        {address && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-soft-green/10 to-honey/10 border-soft-green/30">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-soft-green mb-2">🔥 Real Token Transfer</h3>
                  <p className="text-text-secondary">Make actual blockchain transactions visible on Etherscan!</p>
                  <p className="text-sm text-honey mt-2">Your Balance: {balance} BMBL</p>
                </div>

                <div className="space-y-4">
                  {/* Recipient Address */}
                  <div>
                    <label className="block text-text-primary font-medium mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      value={transferTo}
                      onChange={(e) => setTransferTo(e.target.value)}
                      placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590e4CAb"
                      className="w-full bg-charcoal/60 border border-soft-green/30 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-soft-green transition-colors"
                    />
                  </div>

                  {/* Transfer Amount */}
                  <div>
                    <label className="block text-text-primary font-medium mb-2">
                      Amount (BMBL)
                    </label>
                    <input
                      type="number"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      placeholder="100"
                      step="1"
                      min="0"
                      max={balance}
                      className="w-full bg-charcoal/60 border border-soft-green/30 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-soft-green transition-colors"
                    />
                  </div>

                  {/* Transfer Button */}
                  <Button 
                    className="w-full gap-2 bg-soft-green hover:bg-soft-green/80 text-charcoal font-bold" 
                    size="lg"
                    onClick={handleRealTransfer}
                    disabled={isTransferring || !transferTo || !transferAmount}
                  >
                    {isTransferring ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-charcoal"></div>
                        Processing Transaction...
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-5 h-5" />
                        Send Real Transaction
                      </>
                    )}
                  </Button>

                  {/* Last Transaction */}
                  {lastTxHash && (
                    <div className="mt-4 p-4 bg-soft-green/10 rounded-lg border border-soft-green/30">
                      <p className="text-soft-green font-medium mb-2">✅ Transaction Successful!</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-text-secondary">TX Hash:</p>
                        <a 
                          href={`https://sepolia.etherscan.io/tx/${lastTxHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-honey hover:underline text-sm font-mono break-all"
                        >
                          {lastTxHash}
                        </a>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigator.clipboard.writeText(lastTxHash)}
                          className="ml-auto"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Error Display */}
                  {error && (
                    <div className="mt-4 p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Presale;
