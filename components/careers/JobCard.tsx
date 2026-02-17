"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CardNeuralNetwork from "../animations/CardNeuralNetwork";

interface JobCardProps {
  position: {
    id: number;
    title: string;
    type: string;
    description: string;
    requirements: string[];
    color: string;
  };
  index: number;
  onApply: () => void;
}

export default function JobCard({ position, index, onApply }: JobCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group h-full"
    >
      <div className="relative bg-archtyp-bg-secondary/60 backdrop-blur-sm border border-archtyp-purple-primary/30 rounded-xl overflow-hidden h-full flex flex-col">
        {/* Neural Network Background */}
        <div className="absolute inset-0">
          <CardNeuralNetwork color="168, 85, 247" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-archtyp-text-primary mb-2">
              {position.title}
            </h3>
            <p className="text-sm text-archtyp-purple-light font-mono">
              {position.type}
            </p>
          </div>

          <p className="text-archtyp-text-secondary mb-6 leading-relaxed">
            {position.description}
          </p>

          <div className="mb-6 flex-grow">
            <h4 className="text-sm font-bold text-archtyp-text-primary mb-3 uppercase tracking-wider">
              Looking for:
            </h4>
            <ul className="space-y-2">
              {position.requirements.map((req, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                  className="flex items-center"
                >
                  <span className="text-archtyp-purple-primary mr-2 flex-shrink-0">▸</span>
                  <span className="text-sm text-archtyp-text-secondary">{req}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <button
            onClick={onApply}
            className="w-full py-3 px-4 bg-gradient-to-r from-archtyp-purple-primary to-archtyp-purple-dark rounded-lg font-medium text-white hover:shadow-lg hover:shadow-archtyp-purple-primary/25 transition-all duration-300 group mt-auto"
          >
            <span className="flex items-center justify-center">
              Apply Now
              <motion.span
                animate={isHovered ? { x: 5 } : { x: 0 }}
                className="ml-2"
              >
                →
              </motion.span>
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}