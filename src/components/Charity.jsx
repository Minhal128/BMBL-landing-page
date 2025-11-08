import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Eye, Shield, TrendingUp, Globe, Flower2, Building2, Leaf } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const Charity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const charityWallet = "0xCharity742d35Cc6634C0532925a3b844Bc9e";

  const partners = [
    { name: "World Bee Project", icon: <Globe className="w-12 h-12 text-honey" /> },
    { name: "Pollinator Partnership", icon: <Flower2 className="w-12 h-12 text-honey" /> },
    { name: "Bee Conservancy", icon: <Building2 className="w-12 h-12 text-honey" /> },
    { name: "Save the Bees", icon: <Leaf className="w-12 h-12 text-honey" /> }
  ];

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "2% Auto-Donation",
      description: "Every transaction automatically contributes to bee conservation"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Full Transparency",
      description: "Track every donation on-chain in real-time"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Partners",
      description: "Working with established bee conservation organizations"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Growing Impact",
      description: "Saving 10,000 bees per 1,000 BMBL traded"
    }
  ];

  return (
    <section id="charity" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 honeycomb-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-charcoal/95"></div>

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Charity Transparency
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            Every transaction makes a difference. See exactly where your contribution goes.
          </p>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-honey/10 to-soft-green/10">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-honey mb-6 text-center">
                How Our Donation System Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-honey/20 rounded-full flex items-center justify-center text-honey font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary mb-1">Automatic Deduction</h4>
                    <p className="text-text-secondary">2% of every transaction is automatically set aside for charity</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-honey/20 rounded-full flex items-center justify-center text-honey font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary mb-1">Smart Contract Transfer</h4>
                    <p className="text-text-secondary">Funds are sent directly to our verified charity wallet</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-honey/20 rounded-full flex items-center justify-center text-honey font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary mb-1">Partner Distribution</h4>
                    <p className="text-text-secondary">Quarterly distributions to vetted bee conservation partners</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="h-full hover:scale-105 transition-transform bg-charcoal/60">
                <CardContent className="p-6">
                  <div className="text-honey mb-4">{feature.icon}</div>
                  <h4 className="text-lg font-bold text-text-primary mb-2">{feature.title}</h4>
                  <p className="text-text-secondary text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-text-primary mb-8">Our Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className="bg-honey/10 backdrop-blur-sm rounded-xl p-6 border border-honey/20 hover:border-honey/50 transition-all hover:scale-105"
              >
                <div className="mb-3 flex justify-center">{partner.icon}</div>
                <div className="text-sm font-medium text-text-primary">{partner.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Charity Wallet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-soft-green/10 to-honey/10">
            <CardContent className="p-6 text-center">
              <h4 className="text-xl font-bold text-honey mb-3">Charity Wallet Address</h4>
              <code className="text-text-secondary font-mono text-sm break-all block">
                {charityWallet}
              </code>
              <p className="text-text-secondary text-sm mt-3">Track donations on BSCScan</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Charity;
