"use client";

import FadeIn from "../animations/FadeIn";
import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-display font-bold text-archtyp-text-primary mb-8"
            >
              How It Works
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-archtyp-text-secondary leading-relaxed"
            >
              <p>Software-level integration. Days, not months. Cloud + edge processing. EU-hosted, GDPR-ready.</p>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
