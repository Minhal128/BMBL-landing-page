import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Wallet, ArrowRight, CheckCircle, Zap, DollarSign, CreditCard, Gem } from 'lucide-react';

const Presale = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [amount, setAmount] = useState('');

  // Countdown timer (replace with actual presale end date)
  const [timeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 34,
    seconds: 22
  });

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
                <h3 className="text-2xl font-bold text-honey mb-6">Buy BMBL Tokens</h3>
                
                {/* Presale Stats */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Presale Price:</span>
                    <span className="text-honey font-bold">1 BNB = 50,000 BMBL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Minimum Buy:</span>
                    <span className="text-text-primary font-bold">0.1 BNB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Maximum Buy:</span>
                    <span className="text-text-primary font-bold">10 BNB</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">Progress</span>
                    <span className="text-honey font-bold">65% (325 BNB / 500 BNB)</span>
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
                    Amount (BNB)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.1"
                    className="w-full bg-charcoal/60 border border-honey/30 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-honey transition-colors"
                  />
                  {amount && (
                    <p className="text-soft-green text-sm mt-2">
                      You will receive: {parseFloat(amount) * 50000} BMBL
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <Button className="w-full gap-2" size="lg">
                    <Wallet className="w-5 h-5" />
                    Connect Wallet
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2" 
                    size="lg"
                    disabled={!amount}
                  >
                    Buy Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Benefits */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-text-secondary">
                    <CheckCircle className="w-5 h-5 text-soft-green flex-shrink-0" />
                    <span className="text-sm">20% bonus tokens during presale</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <CheckCircle className="w-5 h-5 text-soft-green flex-shrink-0" />
                    <span className="text-sm">Early access to NFT collection</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <CheckCircle className="w-5 h-5 text-soft-green flex-shrink-0" />
                    <span className="text-sm">Exclusive community rewards</span>
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
                <h3 className="text-2xl font-bold text-honey mb-6">How to Buy</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-honey/20 rounded-full flex items-center justify-center text-honey font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary mb-1">Connect Wallet</h4>
                      <p className="text-text-secondary text-sm">Use MetaMask or WalletConnect</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-honey/20 rounded-full flex items-center justify-center text-honey font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary mb-1">Enter Amount</h4>
                      <p className="text-text-secondary text-sm">Choose how much BNB to spend</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-honey/20 rounded-full flex items-center justify-center text-honey font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary mb-1">Confirm Purchase</h4>
                      <p className="text-text-secondary text-sm">Receive BMBL tokens instantly</p>
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
      </div>
    </section>
  );
};

export default Presale;
