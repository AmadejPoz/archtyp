"use client";

import FadeIn from "../animations/FadeIn";
import { motion } from "framer-motion";

export default function PartnerWithUs() {
  return (
    <section id="team" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-display font-bold text-archtyp-text-primary mb-8"
            >
              Partner With Us
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-6 text-xl text-archtyp-text-secondary leading-relaxed"
            >
              <p>
                Deployed in hotels, airports, hospitals across Europe.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-archtyp-bg-card border-2 border-archtyp-purple-primary/20 rounded-lg p-6 hover:border-archtyp-purple-primary/50"
                >
                  <p className="text-archtyp-text-primary font-semibold mb-2">
                    Sell robots? Wish they were smarter?
                  </p>
                  <p className="text-archtyp-purple-light">Let's talk.</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-archtyp-bg-card border-2 border-archtyp-purple-primary/20 rounded-lg p-6 hover:border-archtyp-purple-primary/50"
                >
                  <p className="text-archtyp-text-primary font-semibold mb-2">
                    Build robots? Don't want to build AI?
                  </p>
                  <p className="text-archtyp-purple-light">Let's talk.</p>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="bg-archtyp-bg-card border border-archtyp-purple-primary/30 rounded-lg p-6 mt-8"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded border border-archtyp-purple-primary flex items-center justify-center">
                    <span className="text-xs font-mono text-archtyp-purple-primary">EU</span>
                  </div>
                  <p className="font-display font-semibold text-archtyp-text-primary">
                    Ljubljana, Slovenia | EU-based | GDPR-ready
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
