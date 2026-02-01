"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Particles from "../animations/Particles";
import GlowButton from "../animations/GlowButton";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <Particles />

      {/* Geometric background accents */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 left-10 w-32 h-32 border border-archtyp-purple-primary/10 rotate-45"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        className="absolute bottom-20 right-10 w-40 h-40 border border-archtyp-purple-primary/10"
      />

      {/* Subtle gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-archtyp-purple-primary rounded-full filter blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.12, 0.08]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-archtyp-purple-dark rounded-full filter blur-3xl"
      />

      {/* Main Content Container with animated border */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Tagline - completely separate, positioned at top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -top-32 left-0 right-0 z-30 text-center"
          >
            <p className="text-lg sm:text-xl font-mono text-archtyp-purple-light tracking-[0.3em] uppercase">
              Cognitive Layer for Robots
            </p>
          </motion.div>

          {/* Animated corner accents */}
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute -top-8 -left-8 w-20 h-20"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.path
                d="M 0 20 L 0 0 L 20 0"
                stroke="#A855F7"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </svg>
          </motion.div>
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.7 }}
            className="absolute -top-8 -right-8 w-20 h-20"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.path
                d="M 80 0 L 100 0 L 100 20"
                stroke="#A855F7"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
            </svg>
          </motion.div>
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.9 }}
            className="absolute -bottom-8 -left-8 w-20 h-20"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.path
                d="M 0 80 L 0 100 L 20 100"
                stroke="#A855F7"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.9 }}
              />
            </svg>
          </motion.div>
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 1.1 }}
            className="absolute -bottom-8 -right-8 w-20 h-20"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.path
                d="M 100 80 L 100 100 L 80 100"
                stroke="#A855F7"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.1 }}
              />
            </svg>
          </motion.div>

          {/* Main content */}
          <div className="relative text-center py-20">

            {/* Logo - behind title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Image
                src="/images/Untitled design (9).png"
                alt="ARCHTYP Logo"
                width={700}
                height={700}
                className="w-auto h-[500px] lg:h-[700px] object-contain"
                priority
              />
            </motion.div>

            {/* Title - centered on logo */}
            <div className="relative z-10 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <motion.h1
                  className="text-7xl sm:text-8xl lg:text-9xl font-display font-bold text-archtyp-text-primary mb-8"
                  initial={{ letterSpacing: "0.5em", opacity: 0 }}
                  animate={{ letterSpacing: "0.05em", opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                >
                  ARCHTYP
                </motion.h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-archtyp-purple-primary to-transparent"
              />
            </div>

            {/* CTA Buttons with enhanced animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16 relative z-20"
            >
              <GlowButton variant="primary" onClick={() => scrollToSection("#contact")}>
                Request Demo
              </GlowButton>
              <GlowButton variant="secondary" onClick={() => scrollToSection("#solution")}>
                Explore Capabilities
              </GlowButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-archtyp-bg-primary to-transparent pointer-events-none" />
    </section>
  );
}
