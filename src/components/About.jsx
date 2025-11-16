import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Heart, TrendingUp, Users, AlertCircle, Zap } from 'lucide-react';

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

  const beeImpact = [
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "The Crisis",
      points: [
        "🐝 75% of bee species are in decline",
        "🌍 1 in 3 food crops depend on bee pollination",
        "⚠️ Bees pollinate 90% of wild plants",
        "💰 $15 billion in annual crop value at risk"
      ]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Why It Matters",
      points: [
        "🌱 Bees are essential for ecosystem health",
        "🥕 Without bees: no almonds, apples, cucumbers",
        "🌸 Pollination supports biodiversity",
        "🌍 Bee decline signals environmental damage"
      ]
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
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

        {/* Bee Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20 pt-20 border-t border-honey/20"
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Why <span className="text-gradient">Bees Matter</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beeImpact.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl p-8 border border-honey/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-honey">{section.icon}</div>
                  <h4 className="text-2xl font-bold text-honey">{section.title}</h4>
                </div>
                <ul className="space-y-3">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="text-text-secondary flex items-start gap-3">
                      <span className="text-honey mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Solution Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mt-12 bg-gradient-to-r from-soft-green/20 to-honey/20 backdrop-blur-sm rounded-xl p-8 border border-soft-green/50"
          >
            <h4 className="text-2xl font-bold text-soft-green mb-4">🌍 Our Solution</h4>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              BMBLANCE combines the power of cryptocurrency with real-world impact. Every transaction generates value that directly supports bee conservation projects, habitat restoration, and research initiatives worldwide.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              By holding BMBLANCE, you're not just investing—you're participating in a global movement to save one of Earth's most critical species. Together, we can reverse the decline and ensure a thriving future for bees and our planet.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
