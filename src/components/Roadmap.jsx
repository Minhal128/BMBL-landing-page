import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Users, Handshake, Image, ChevronRight, CheckCircle, Zap, ClipboardList } from 'lucide-react';

const Roadmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const phases = [
    {
      phase: "Phase 1",
      title: "Launch & Community Building",
      icon: <Rocket className="w-8 h-8" />,
      items: [
        "Smart Contract Deployment",
        "Website & Social Media Launch",
        "Community Growth Campaign",
        "Initial Marketing Push"
      ],
      status: "completed"
    },
    {
      phase: "Phase 2",
      title: "Presale & DEX Listing",
      icon: <Users className="w-8 h-8" />,
      items: [
        "Presale Event",
        "PancakeSwap Listing",
        "CoinGecko & CMC Listing",
        "Audit & KYC Completion"
      ],
      status: "active"
    },
    {
      phase: "Phase 3",
      title: "Partnerships & Charity",
      icon: <Handshake className="w-8 h-8" />,
      items: [
        "Partner with Bee Conservation NGOs",
        "First Major Donation Event",
        "Influencer Collaborations",
        "CEX Listings"
      ],
      status: "upcoming"
    },
    {
      phase: "Phase 4",
      title: "NFTs & Bee Rescue Fund",
      icon: <Image className="w-8 h-8" />,
      items: [
        "BMBL NFT Collection Launch",
        "Bee Rescue Fund Establishment",
        "Global Expansion",
        "DAO Governance Launch"
      ],
      status: "upcoming"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'from-soft-green to-honey';
      case 'active': return 'from-honey to-honey-dark animate-pulse-slow';
      case 'upcoming': return 'from-text-secondary to-honey/50';
      default: return 'from-honey to-honey-dark';
    }
  };

  return (
    <section id="roadmap" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal to-charcoal/90"></div>

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Roadmap
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            Our journey to revolutionize crypto philanthropy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Honeycomb Shape Card */}
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(phase.status)} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                <div className="relative bg-charcoal/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-honey/20 hover:border-honey/50 transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-gradient-to-br from-honey to-honey-dark p-4 rounded-xl text-charcoal">
                      {phase.icon}
                    </div>
                    <div>
                      <div className="text-honey text-sm font-bold mb-1">{phase.phase}</div>
                      <h3 className="text-2xl font-bold text-text-primary">{phase.title}</h3>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {phase.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.15 + i * 0.05 }}
                        className="flex items-start gap-3 text-text-secondary"
                      >
                        <ChevronRight className="w-5 h-5 text-honey mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Status Badge */}
                  <div className="mt-6">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 w-fit ${
                      phase.status === 'completed' ? 'bg-soft-green/20 text-soft-green' :
                      phase.status === 'active' ? 'bg-honey/20 text-honey' :
                      'bg-text-secondary/20 text-text-secondary'
                    }`}>
                      {phase.status === 'completed' ? (
                        <><CheckCircle className="w-4 h-4" /> Completed</>
                      ) : phase.status === 'active' ? (
                        <><Zap className="w-4 h-4" /> In Progress</>
                      ) : (
                        <><ClipboardList className="w-4 h-4" /> Upcoming</>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
