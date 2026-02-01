"use client";

import FadeIn from "../animations/FadeIn";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WhatIsArchtyp() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-archtyp-purple-primary/5 rounded-full filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <FadeIn>
            <div className="space-y-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-display font-bold text-archtyp-text-primary mb-8"
              >
                What is ARCHTYP
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xl text-archtyp-text-secondary leading-relaxed"
              >
                <p>
                  The cognitive layer between robotic hardware and human interaction.
                  Hardware-agnostic. Works with any platform.
                </p>
              </motion.div>
            </div>
          </FadeIn>

          {/* Hero art image */}
          <FadeIn delay={0.4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10">
                <Image
                  src="/images/Untitled design (10).png"
                  alt="ARCHTYP Platform"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              {/* Decorative gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-archtyp-purple-primary/20 to-archtyp-purple-dark/20 rounded-lg blur-xl opacity-50" />
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
