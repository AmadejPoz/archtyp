"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 120 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let particleId = 0;
    let lastX = 0;
    let lastY = 0;
    let animationFrame: number;
    const particleTimeouts = new Map<number, NodeJS.Timeout>();

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Create particles at consistent intervals when mouse is moving
    const createParticle = () => {
      const currentX = cursorX.get();
      const currentY = cursorY.get();

      // Calculate distance moved
      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only create particle if mouse moved enough (prevents bunching when stationary)
      if (distance > 15) {
        const id = particleId++;
        const newParticle = {
          id,
          x: currentX,
          y: currentY,
        };

        setParticles((prev) => {
          const updated = [...prev, newParticle];
          return updated.slice(-10);
        });

        // Variable timeout for each particle to prevent simultaneous disappearance
        const baseTimeout = 1200;
        const variance = Math.random() * 400; // 0-400ms variance
        const timeout = setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== id));
          particleTimeouts.delete(id);
        }, baseTimeout + variance);

        particleTimeouts.set(id, timeout);

        lastX = currentX;
        lastY = currentY;
      }

      animationFrame = requestAnimationFrame(createParticle);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrame = requestAnimationFrame(createParticle);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
      // Clear all particle timeouts
      particleTimeouts.forEach(timeout => clearTimeout(timeout));
      particleTimeouts.clear();
    };
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence mode="popLayout">
        {particles.map((particle, index) => {
          const colors = ["#A855F7", "#C084FC", "#9333EA", "#E879F9"];
          const color = colors[index % colors.length];

          // Fixed position for each particle - never changes
          const fixedStyle = {
            position: "absolute" as const,
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: "translate(-50%, -50%)",
          };

          return (
            <motion.div
              key={particle.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Main circle particle with glow */}
              <motion.div
                className="rounded-full"
                initial={{
                  scale: 0.5,
                  opacity: 1,
                }}
                animate={{
                  scale: 1.5,
                  opacity: 0,
                }}
                transition={{
                  duration: 1.4,
                  ease: "easeOut",
                }}
                style={{
                  ...fixedStyle,
                  width: "8px",
                  height: "8px",
                  background: color,
                  boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
                }}
              />

              {/* Expanding ring pulse */}
              <motion.div
                className="rounded-full border-2"
                initial={{
                  width: 12,
                  height: 12,
                  opacity: 0.9,
                }}
                animate={{
                  width: 60,
                  height: 60,
                  opacity: 0,
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
                style={{
                  ...fixedStyle,
                  borderColor: color,
                  boxShadow: `0 0 10px ${color}`,
                }}
              />

              {/* Secondary ring - slower and smaller */}
              <motion.div
                className="rounded-full border-2"
                initial={{
                  width: 8,
                  height: 8,
                  opacity: 0.8,
                }}
                animate={{
                  width: 40,
                  height: 40,
                  opacity: 0,
                }}
                transition={{
                  duration: 1.0,
                  ease: "easeOut",
                  delay: 0.1,
                }}
                style={{
                  ...fixedStyle,
                  borderColor: color,
                }}
              />

              {/* Large glow effect that fades */}
              <motion.div
                className="rounded-full"
                initial={{
                  width: 30,
                  height: 30,
                  opacity: 0.6,
                }}
                animate={{
                  width: 50,
                  height: 50,
                  opacity: 0,
                }}
                transition={{
                  duration: 1.3,
                  ease: "easeOut",
                }}
                style={{
                  ...fixedStyle,
                  background: `radial-gradient(circle, ${color}60 0%, transparent 70%)`,
                  filter: "blur(12px)",
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
