"use client";

import { motion } from "framer-motion";

export default function GeometricLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rotating triangle */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: "400px", originY: "400px" }}
        >
          <motion.path
            d="M400 200 L550 500 L250 500 Z"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Pulsing lines */}
        <motion.line
          x1="100"
          y1="400"
          x2="700"
          y2="400"
          stroke="url(#gradient)"
          strokeWidth="1"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <motion.line
          x1="400"
          y1="100"
          x2="400"
          y2="700"
          stroke="url(#gradient)"
          strokeWidth="1"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#C084FC" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#9333EA" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
