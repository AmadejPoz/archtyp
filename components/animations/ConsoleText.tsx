"use client";

import { motion } from "framer-motion";

interface ConsoleTextProps {
  text: string;
  className?: string;
}

export default function ConsoleText({ text, className = "" }: ConsoleTextProps) {
  return (
    <motion.div
      className={`font-mono text-sm text-archtyp-purple-light/70 flex items-center gap-2 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <span className="text-archtyp-purple-primary">&gt;</span>
      <span>{text}</span>
      <motion.span
        className="inline-block w-2 h-4 bg-archtyp-purple-primary"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </motion.div>
  );
}
