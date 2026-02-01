"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function GlowButton({
  children,
  variant = "primary",
  className = "",
  onClick,
  href,
}: GlowButtonProps) {
  const Component = href ? "a" : "button";

  return (
    <Component href={href} onClick={onClick} className="relative group">
      {/* Minimal outer glow - only on hover */}
      <div className="absolute -inset-0.5 bg-archtyp-purple-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Button */}
      <motion.div
        className={`relative ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className={`relative px-8 py-3.5 font-display font-medium text-sm tracking-wide rounded-lg overflow-hidden transition-all duration-300 ${
            variant === "primary"
              ? "bg-archtyp-purple-primary/90 text-white border border-archtyp-purple-primary/50 hover:bg-archtyp-purple-primary hover:border-archtyp-purple-light/50"
              : "bg-black/50 border border-archtyp-purple-primary/30 text-archtyp-purple-light backdrop-blur-sm hover:border-archtyp-purple-primary/60 hover:bg-archtyp-purple-primary/5"
          }`}
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-archtyp-purple-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {children}
            <motion.span
              className="inline-block text-xs"
              animate={{ x: [0, 3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              →
            </motion.span>
          </span>

          {/* Minimal corner accent - single corner */}
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-archtyp-purple-light/40 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-archtyp-purple-light/40 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </div>
      </motion.div>
    </Component>
  );
}
