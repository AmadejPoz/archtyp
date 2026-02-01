"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export default function HolographicCard({
  children,
  className = "",
  glowOnHover = true,
}: HolographicCardProps) {
  return (
    <motion.div
      whileHover={{ scale: glowOnHover ? 1.02 : 1 }}
      className={`relative group ${className}`}
    >
      {/* Glow effect on hover */}
      {glowOnHover && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-archtyp-purple-primary to-archtyp-purple-dark rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500" />
      )}

      {/* Card content */}
      <div className="relative bg-archtyp-bg-card border-2 border-archtyp-purple-primary/20 rounded-lg overflow-hidden group-hover:border-archtyp-purple-primary/50 transition-all duration-300">
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-archtyp-purple-primary/5 to-transparent animate-pulse-slow" />
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-archtyp-purple-primary opacity-50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-archtyp-purple-primary opacity-50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-archtyp-purple-primary opacity-50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-archtyp-purple-primary opacity-50" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}
