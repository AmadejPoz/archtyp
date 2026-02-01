"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DataStream() {
  const [streams, setStreams] = useState<number[]>([]);

  useEffect(() => {
    setStreams(Array.from({ length: 20 }, (_, i) => i));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {streams.map((i) => (
        <motion.div
          key={i}
          className="absolute w-px bg-gradient-to-b from-transparent via-archtyp-purple-primary to-transparent"
          style={{
            left: `${(i * 5) % 100}%`,
            height: `${Math.random() * 300 + 100}px`,
          }}
          initial={{ y: -300, opacity: 0 }}
          animate={{
            y: "100vh",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
