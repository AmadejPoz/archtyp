"use client";

import FadeIn from "../animations/FadeIn";
import { motion } from "framer-motion";

const capabilities = [
  {
    title: "Speech",
    description:
      "Natural conversation in any language. Real pronunciation, appropriate formality.",
    number: "01",
  },
  {
    title: "Understanding",
    description:
      "LLM-powered comprehension. Handles accents, context, incomplete sentences.",
    number: "02",
  },
  {
    title: "Memory",
    description:
      "Remembers across conversations. Recognizes returning users, builds relationships.",
    number: "03",
  },
  {
    title: "Personality",
    description:
      "Defined character matching your brand. Consistent across every interaction.",
    number: "04",
  },
  {
    title: "Awareness",
    description:
      "Semantic location understanding. Knows capabilities and limitations.",
    number: "05",
  },
  {
    title: "Control",
    description:
      "Physical body awareness. ARCHTYP controls robot movement, navigation, and embodied actions.",
    number: "06",
  },
];

export default function Solution() {
  return (
    <section id="solution" className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-archtyp-purple-primary/5 rounded-full filter blur-3xl pulse-glow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-archtyp-purple-dark/5 rounded-full filter blur-3xl pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl sm:text-6xl font-display font-bold text-archtyp-text-primary mb-6">
              Six Capabilities
            </h2>
            <p className="text-xl text-archtyp-text-secondary max-w-3xl mx-auto">
              Complete cognitive stack. Installs on any platform.
            </p>
            <div className="mt-4 font-mono text-sm text-archtyp-purple-light/50">
              &gt; archtyp.init()
            </div>
          </motion.div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-8 mt-16 max-w-4xl mx-auto">
          {capabilities.map((capability, index) => {
            // Define abstract/avant-garde SVG icons for each capability
            const icons: Record<string, JSX.Element> = {
              Speech: (
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  {/* Oscillating waveforms */}
                  <motion.path
                    d="M10 50 Q20 30, 30 50 T50 50 T70 50 T90 50"
                    stroke="#A855F7"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: index * 0.2 }}
                  />
                  <motion.path
                    d="M10 50 Q20 60, 30 50 T50 50 T70 50 T90 50"
                    stroke="#C084FC"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, delay: index * 0.2 + 0.3 }}
                  />
                  <motion.path
                    d="M10 50 Q20 40, 30 50 T50 50 T70 50 T90 50"
                    stroke="#9333EA"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ duration: 2, delay: index * 0.2 + 0.5 }}
                  />
                </svg>
              ),
              Understanding: (
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  {/* Neural network nodes */}
                  <motion.circle cx="30" cy="30" r="4" fill="#A855F7" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.2 }} />
                  <motion.circle cx="70" cy="30" r="4" fill="#A855F7" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.2 + 0.1 }} />
                  <motion.circle cx="50" cy="50" r="4" fill="#C084FC" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.2 + 0.2 }} />
                  <motion.circle cx="30" cy="70" r="4" fill="#A855F7" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.2 + 0.3 }} />
                  <motion.circle cx="70" cy="70" r="4" fill="#A855F7" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.2 + 0.4 }} />
                  <motion.line x1="30" y1="30" x2="50" y2="50" stroke="#A855F7" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * 0.2 + 0.5 }} />
                  <motion.line x1="70" y1="30" x2="50" y2="50" stroke="#A855F7" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * 0.2 + 0.6 }} />
                  <motion.line x1="50" y1="50" x2="30" y2="70" stroke="#A855F7" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * 0.2 + 0.7 }} />
                  <motion.line x1="50" y1="50" x2="70" y2="70" stroke="#A855F7" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * 0.2 + 0.8 }} />
                </svg>
              ),
              Memory: (
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  {/* Interconnected data blocks */}
                  <motion.rect x="20" y="20" width="20" height="20" stroke="#A855F7" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: index * 0.2 }} />
                  <motion.rect x="60" y="20" width="20" height="20" stroke="#A855F7" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: index * 0.2 + 0.2 }} />
                  <motion.rect x="20" y="60" width="20" height="20" stroke="#A855F7" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: index * 0.2 + 0.4 }} />
                  <motion.rect x="60" y="60" width="20" height="20" stroke="#A855F7" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: index * 0.2 + 0.6 }} />
                  <motion.path d="M40 30 L60 30" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="2,2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * 0.2 + 0.8 }} />
                  <motion.path d="M30 40 L30 60" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="2,2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * 0.2 + 0.9 }} />
                  <motion.path d="M40 70 L60 70" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="2,2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * 0.2 + 1 }} />
                  <motion.path d="M70 40 L70 60" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="2,2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * 0.2 + 1.1 }} />
                </svg>
              ),
              Personality: (
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  {/* Morphing hexagon */}
                  <motion.path
                    d="M50 10 L80 30 L80 70 L50 90 L20 70 L20 30 Z"
                    stroke="#A855F7"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, rotate: 0 }}
                    animate={{ pathLength: 1, rotate: 360 }}
                    transition={{ duration: 3, delay: index * 0.2, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="15"
                    stroke="#C084FC"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.1, 1] }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                  />
                  <motion.path
                    d="M50 35 L50 65 M35 50 L65 50"
                    stroke="#9333EA"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.8 }}
                  />
                </svg>
              ),
              Awareness: (
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  {/* Expanding radar circles */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#A855F7"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 1 }}
                    animate={{ pathLength: 1, opacity: [1, 0.3] }}
                    transition={{ duration: 2, delay: index * 0.2, opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="25"
                    stroke="#C084FC"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 1 }}
                    animate={{ pathLength: 1, opacity: [1, 0.5] }}
                    transition={{ duration: 2, delay: index * 0.2 + 0.3, opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="10"
                    stroke="#9333EA"
                    strokeWidth="2"
                    fill="none"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1, 1] }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.6 }}
                  />
                </svg>
              ),
              Control: (
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  {/* Coordinate system with vector field */}
                  <motion.line x1="50" y1="10" x2="50" y2="90" stroke="#A855F7" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: index * 0.2 }} />
                  <motion.line x1="10" y1="50" x2="90" y2="50" stroke="#A855F7" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: index * 0.2 + 0.2 }} />
                  <motion.circle cx="50" cy="50" r="8" stroke="#C084FC" strokeWidth="2" fill="#9333EA" fillOpacity="0.3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.2 + 0.5 }} />
                  <motion.path d="M50 25 L55 30 M50 25 L45 30" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * 0.2 + 0.7 }} />
                  <motion.path d="M50 75 L55 70 M50 75 L45 70" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * 0.2 + 0.8 }} />
                  <motion.path d="M25 50 L30 55 M25 50 L30 45" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * 0.2 + 0.9 }} />
                  <motion.path d="M75 50 L70 55 M75 50 L70 45" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * 0.2 + 1 }} />
                </svg>
              ),
            };

            return (
              <FadeIn key={capability.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-archtyp-purple-primary/20 to-archtyp-purple-dark/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-glow" />
                  <div className="relative bg-archtyp-bg-card border-2 border-archtyp-purple-primary/20 rounded-lg p-8 h-full hover:border-archtyp-purple-primary/70 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-archtyp-purple-primary/30">
                    <div className="flex items-center gap-4 mb-6">
                      {/* Animated SVG Icon */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 flex items-center justify-center"
                      >
                        {icons[capability.title]}
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-mono text-archtyp-purple-light/50">
                            {capability.number}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-archtyp-purple-primary/30 to-transparent" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-archtyp-text-primary">
                          {capability.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-archtyp-text-secondary leading-relaxed text-base">
                      {capability.description}
                    </p>
                    <div className="mt-6 font-mono text-xs text-archtyp-purple-primary/50">
                      &gt; cognitive_layer.{capability.title.toLowerCase()}()
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
