import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Heart, TrendingUp, Users } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Eco-Friendly",
      description: "Supporting bee conservation worldwide"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community Driven",
      description: "Built by the people, for the planet"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Deflationary",
      description: "Automatic burns & reflections"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Transparent",
      description: "Open donations & partnerships"
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal"></div>
      
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            What is <span className="text-gradient">BMBLANCE</span>?
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            BMBLANCE is more than just a meme coin—it's a movement to save the bees and support 
            eco-humanitarian causes through blockchain technology. Every transaction contributes 
            to bee conservation efforts worldwide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="relative">
            <div className="text-9xl animate-float">🐝</div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 text-4xl"
            >
              🌸
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 text-4xl"
            >
              🌼
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-honey mb-4">
            Supporting The World Bee Project
          </h3>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Through crypto impact and community engagement, we're making a real difference 
            in protecting pollinators and their habitats.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="bg-gradient-to-br from-honey/10 to-soft-green/10 backdrop-blur-sm rounded-xl p-6 border border-honey/20 hover:border-honey/50 transition-all hover:scale-105"
            >
              <div className="text-honey mb-4">{feature.icon}</div>
              <h4 className="text-xl font-bold mb-2 text-text-primary">{feature.title}</h4>
              <p className="text-text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
