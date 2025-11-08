import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { FileText, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 honeycomb-pattern opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/50 to-charcoal"></div>

      {/* Floating Bees Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            🐝
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-8 mt-16 sm:mt-20 md:mt-24 lg:mt-32"
        >
          <div className="text-9xl md:text-[12rem] animate-float">🐝</div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-gradient"
        >
          BMBLANCE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl text-text-primary mb-4 max-w-4xl mx-auto font-medium"
        >
          The Meme Coin with a Mission
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl text-honey mb-12 max-w-3xl mx-auto"
        >
          Saving the Bees, One Block at a Time 🌍
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="text-lg px-10 py-6 gap-2">
            Join the Hive (Presale)
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-10 py-6 gap-2">
            <FileText className="w-5 h-5" />
            Read Whitepaper
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="bg-honey/10 backdrop-blur-sm rounded-xl p-6 border border-honey/20">
            <div className="text-4xl font-bold text-honey mb-2">$1M+</div>
            <div className="text-text-secondary">Market Cap</div>
          </div>
          <div className="bg-honey/10 backdrop-blur-sm rounded-xl p-6 border border-honey/20">
            <div className="text-4xl font-bold text-honey mb-2">10K+</div>
            <div className="text-text-secondary">Holders</div>
          </div>
          <div className="bg-honey/10 backdrop-blur-sm rounded-xl p-6 border border-honey/20">
            <div className="text-4xl font-bold text-honey mb-2">$50K</div>
            <div className="text-text-secondary">Donated to Bees</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-honey text-4xl"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
