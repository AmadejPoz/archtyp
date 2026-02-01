"use client";

import FadeIn from "../animations/FadeIn";
import { motion } from "framer-motion";

export default function ForManufacturers() {
  return (
    <section className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-display font-bold text-archtyp-text-primary mb-8"
            >
              For Manufacturers & Distributors
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-6 text-xl text-archtyp-text-secondary leading-relaxed"
            >
              <p>
                Complete solution, not just hardware. Differentiate, charge more, support less.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-archtyp-bg-card border-2 border-archtyp-purple-primary/20 rounded-lg p-8 my-8"
              >
                <h3 className="text-2xl font-display font-bold text-archtyp-text-primary mb-4">
                  Business Model
                </h3>
                <p className="text-archtyp-text-secondary">
                  Per-robot subscription. You set prices, retain margin. We provide platform, updates, support.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
