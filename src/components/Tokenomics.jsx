import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';

const Tokenomics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const contractAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4";

  const tokenomicsData = [
    { label: "Total Supply", value: "1,000,000,000", color: "from-honey to-honey-dark", percentage: "100%" },
    { label: "Reflection", value: "3%", color: "from-soft-green to-honey", percentage: "3%" },
    { label: "Liquidity", value: "4%", color: "from-honey-dark to-soft-green", percentage: "4%" },
    { label: "Charity", value: "2%", color: "from-honey to-soft-green", percentage: "2%" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tokenomics" className="py-20 sm:py-32 relative overflow-hidden">
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
            Tokenomics
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            Designed for sustainability, rewards, and real-world impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Pie Chart Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-80 h-80">
              {/* Simplified Pie Chart Representation */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-honey via-honey-dark to-soft-green opacity-90 animate-pulse-slow"></div>
              <div className="absolute inset-8 rounded-full bg-charcoal flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-2">
                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                      <path d="M36 6L40 18L52 14L46 26L58 36L46 46L52 58L40 54L36 66L32 54L20 58L26 46L14 36L26 26L20 14L32 18L36 6Z" fill="#FFD54F" stroke="#FFCA28" strokeWidth="2"/>
                      <ellipse cx="36" cy="36" rx="14" ry="18" fill="#121212"/>
                      <rect x="31" y="26" width="10" height="4" rx="2" fill="#FFD54F"/>
                      <rect x="31" y="34" width="10" height="4" rx="2" fill="#FFD54F"/>
                      <rect x="31" y="42" width="10" height="4" rx="2" fill="#FFD54F"/>
                      <circle cx="32" cy="30" r="2" fill="white"/>
                      <circle cx="40" cy="30" r="2" fill="white"/>
                    </svg>
                  </div>
                  <div className="text-3xl font-bold text-gradient">BMBL</div>
                </div>
              </div>
              
              {/* Animated rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-dashed border-honey/30"
              ></motion.div>
            </div>
          </motion.div>

          {/* Tokenomics Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {tokenomicsData.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="overflow-hidden hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-text-primary">{item.label}</h3>
                      <span className="text-2xl font-bold text-honey">{item.value}</span>
                    </div>
                    <div className="w-full bg-charcoal/80 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: item.percentage } : {}}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                      ></motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contract Address */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="bg-gradient-to-r from-honey/10 to-soft-green/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-honey mb-4 text-center">Contract Address</h3>
              <div className="flex items-center justify-between gap-4 bg-charcoal/60 rounded-lg p-4">
                <code className="text-text-primary font-mono text-sm sm:text-base break-all">
                  {contractAddress}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 p-2 hover:bg-honey/20 rounded-lg transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-soft-green" />
                  ) : (
                    <Copy className="w-5 h-5 text-honey" />
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Tokenomics;
