import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CountUp from 'react-countup';
import { DollarSign, Home, Globe, Sparkles, TreePine, GraduationCap } from 'lucide-react';

const EcoImpact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    {
      icon: <DollarSign className="w-10 h-10" />,
      value: 52000,
      prefix: "$",
      suffix: "",
      label: "Total Donated",
      color: "from-honey to-honey-dark"
    },
    {
      icon: <Home className="w-10 h-10" />,
      value: 347,
      prefix: "",
      suffix: "",
      label: "Beehives Sponsored",
      color: "from-soft-green to-honey"
    },
    {
      icon: <Globe className="w-10 h-10" />,
      value: 23,
      prefix: "",
      suffix: "",
      label: "Countries Reached",
      color: "from-honey-dark to-soft-green"
    }
  ];

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/95 via-charcoal to-charcoal/90"></div>
      <div className="absolute inset-0 honeycomb-pattern opacity-5"></div>

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Our Eco-Impact
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            Real numbers, real impact. See how BMBLANCE is making a difference.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
              <div className="relative bg-charcoal/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-honey/20 hover:border-honey/50 transition-all">
                <div className="text-honey mb-4 flex justify-center">{metric.icon}</div>
                <div className="text-5xl font-bold text-honey mb-2 text-center">
                  {isInView && (
                    <>
                      {metric.prefix}
                      <CountUp end={metric.value} duration={2.5} separator="," />
                      {metric.suffix}
                    </>
                  )}
                </div>
                <div className="text-text-secondary text-center font-medium">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Infographic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-br from-honey/10 to-soft-green/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-honey/20">
            <h3 className="text-3xl font-bold text-center text-honey mb-12">Impact Breakdown</h3>
            
            <div className="space-y-8">
              {/* Bees Saved */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-text-primary font-medium flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-honey" />
                    Bees Saved
                  </span>
                  <span className="text-honey font-bold text-xl">~2.5M</span>
                </div>
                <div className="w-full bg-charcoal/60 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "85%" } : {}}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="h-full bg-gradient-to-r from-honey to-soft-green rounded-full"
                  ></motion.div>
                </div>
              </div>

              {/* Habitats Restored */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-text-primary font-medium flex items-center gap-2">
                    <TreePine className="w-5 h-5 text-soft-green" />
                    Habitats Restored
                  </span>
                  <span className="text-honey font-bold text-xl">150 acres</span>
                </div>
                <div className="w-full bg-charcoal/60 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "65%" } : {}}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="h-full bg-gradient-to-r from-soft-green to-honey rounded-full"
                  ></motion.div>
                </div>
              </div>

              {/* Education Programs */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-text-primary font-medium flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-honey" />
                    Education Programs Funded
                  </span>
                  <span className="text-honey font-bold text-xl">47</span>
                </div>
                <div className="w-full bg-charcoal/60 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "45%" } : {}}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    className="h-full bg-gradient-to-r from-honey-dark to-honey rounded-full"
                  ></motion.div>
                </div>
              </div>
            </div>

            {/* Global Reach Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-12 text-center"
            >
              <div className="mb-4 flex justify-center">
                <Globe className="w-20 h-20 text-soft-green" />
              </div>
              <p className="text-text-secondary text-lg">
                Operating in <span className="text-honey font-bold">23 countries</span> across 
                <span className="text-honey font-bold"> 5 continents</span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <blockquote className="text-2xl text-text-primary italic">
            "If the bee disappeared off the face of the Earth, man would only have four years left to live."
          </blockquote>
          <p className="text-honey mt-4 font-medium">- Often attributed to Einstein</p>
        </motion.div>
      </div>
    </section>
  );
};

export default EcoImpact;
