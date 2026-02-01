"use client";

import FadeIn from "../animations/FadeIn";
import { motion } from "framer-motion";

const highlights = [
  "Live customer (DORMEO)",
  "Distribution partner signed (INEEDROBOT)",
  "OEMs already interested (KEENON, PUDU, TEMI)",
  "The team behind the #1 humanoid brand in Adria",
  "Major media coverage",
  "EU-native (GDPR, AI Act ready)",
];

const partners = ["KEENON", "PUDU", "TEMI", "DORMEO", "INEEDROBOT"];

export default function Partners() {
  return (
    <section id="partners" className="py-24 bg-archtyp-bg-primary relative overflow-hidden grid-bg scanlines">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-display font-bold text-archtyp-text-primary mb-6">
              WHY US.
            </h2>
          </div>
        </FadeIn>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {highlights.map((highlight, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-archtyp-bg-card border-2 border-archtyp-purple-primary/20 rounded-lg p-6 hover:border-archtyp-purple-primary/70 transition-all duration-300 group hover:shadow-lg hover:shadow-archtyp-purple-primary/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border border-archtyp-purple-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-archtyp-purple-primary rounded-full" />
                  </div>
                  <p className="text-archtyp-text-secondary group-hover:text-archtyp-text-primary transition-colors">
                    {highlight}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Partner Logos */}
        <FadeIn delay={0.6}>
          <div className="mt-20">
            <p className="text-center text-archtyp-text-muted mb-8 font-mono text-sm">
              &gt; partners.ecosystem()
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="group cursor-pointer"
                >
                  <div className="text-2xl font-display font-bold text-archtyp-text-muted group-hover:text-archtyp-purple-primary transition-colors">
                    {partner}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
