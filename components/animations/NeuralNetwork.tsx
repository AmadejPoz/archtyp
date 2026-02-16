"use client";

import { useEffect, useRef } from "react";

interface Neuron3D {
  // 3D position
  x: number;
  y: number;
  z: number;
  // 2D projection for rendering
  screenX: number;
  screenY: number;
  depth: number; // for depth sorting
  size: number;
  connections: number[];
  brightness: number;
  baseBrightness: number;
  pulsePhase: number;
}

interface ActiveRegion {
  x: number;
  y: number;
  z: number;
  radius: number;
  strength: number;
  decay: number;
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const neuronsRef = useRef<Neuron3D[]>([]);
  const activeRegionsRef = useRef<ActiveRegion[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create neurons in a 3D sphere (brain-like structure)
    const neurons: Neuron3D[] = [];
    const neuronCount = 800; // Reduced for better performance
    const sphereRadius = canvas.width * 0.6; // Cover full width

    // Create neurons distributed in a sphere
    for (let i = 0; i < neuronCount; i++) {
      // Use golden angle spiral for even distribution
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * i / neuronCount);

      // Add some randomness for organic feel
      const radiusVariation = 0.5 + Math.random() * 0.5;
      const r = sphereRadius * radiusVariation;

      // Convert spherical to Cartesian coordinates - make it wider (ellipsoid)
      const x = r * Math.sin(phi) * Math.cos(theta) * 1.2; // Wider on X axis
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.6; // Compressed on Y axis
      const z = r * Math.cos(phi) * 0.8; // Slightly compressed on Z axis

      // Smaller neurons for more realistic look
      const size = 0.05 + Math.random() * 0.15;

      neurons.push({
        x, y, z,
        screenX: 0,
        screenY: 0,
        depth: 0,
        size,
        connections: [],
        brightness: 0.1,
        baseBrightness: 0.02 + Math.random() * 0.02,  // Brighter base glow
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Create connections between neurons
    neurons.forEach((neuron, i) => {
      const maxConnections = 5 + Math.floor(Math.random() * 5); // 5-10 connections per neuron for better performance
      const connectionRadius = sphereRadius * 0.4; // Smaller radius for fewer connections
      const connections: number[] = [];

      // Find nearby neurons
      const distances: { index: number; dist: number }[] = [];
      neurons.forEach((otherNeuron, j) => {
        if (i !== j) {
          const dist = Math.sqrt(
            Math.pow(neuron.x - otherNeuron.x, 2) +
            Math.pow(neuron.y - otherNeuron.y, 2) +
            Math.pow(neuron.z - otherNeuron.z, 2)
          );
          if (dist < connectionRadius) {
            distances.push({ index: j, dist });
          }
        }
      });

      // Sort by distance and connect to closest neurons
      distances.sort((a, b) => a.dist - b.dist);
      for (let k = 0; k < Math.min(maxConnections, distances.length); k++) {
        if (Math.random() > 0.5) { // 50% chance of connection for fewer total connections
          connections.push(distances[k].index);
        }
      }

      neuron.connections = connections;
    });

    neuronsRef.current = neurons;
    const sphereRadiusRef = sphereRadius;

    // Give some random neurons initial brightness to start activity immediately
    for (let i = 0; i < 30; i++) {
      const randomNeuron = neurons[Math.floor(Math.random() * neurons.length)];
      randomNeuron.brightness = 0.6 + Math.random() * 0.4;
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 3D to 2D projection
    const project3D = (x: number, y: number, z: number, centerX: number, centerY: number) => {
      const perspective = 1000; // Adjusted for wider view
      const scale = perspective / (perspective + z);
      const screenX = x * scale + centerX;
      const screenY = y * scale + centerY;
      return { screenX, screenY, scale };
    };


    // Project neurons to static positions
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Initial projection of neurons (static positions)
    neurons.forEach((neuron) => {
      const projected = project3D(neuron.x, neuron.y, neuron.z, centerX, centerY);
      neuron.screenX = projected.screenX;
      neuron.screenY = projected.screenY;
      neuron.depth = neuron.z;
    });

    const animate = () => {
      frameRef.current++;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 5, 0.98)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const neurons = neuronsRef.current;
      const activeRegions = activeRegionsRef.current;
      const mouse = mouseRef.current;
      const time = frameRef.current * 0.01;

      // Create random active regions (brain activity) - much less frequent for performance
      if (Math.random() > 0.999) {
        const randomNeuron = neurons[Math.floor(Math.random() * neurons.length)];
        activeRegions.push({
          x: randomNeuron.x,
          y: randomNeuron.y,
          z: randomNeuron.z,
          radius: 60 + Math.random() * 80,
          strength: 0.5 + Math.random() * 0.2,
          decay: 0.96
        });
      }

      // Update and filter active regions
      activeRegionsRef.current = activeRegions.filter(region => {
        region.strength *= region.decay;
        region.radius *= 0.99;
        return region.strength > 0.01;
      });

      // Update neuron brightness
      neurons.forEach((neuron) => {
        // Calculate distance from mouse in 2D space
        const mouseDistance = Math.hypot(
          neuron.screenX - mouse.x,
          neuron.screenY - mouse.y
        );

        // Mouse interaction - increased by 20%
        const maxMouseDistance = 250;
        const mouseBrightness = mouseDistance < maxMouseDistance
          ? Math.pow(1 - mouseDistance / maxMouseDistance, 0.8) * 1.1 // Increased from 0.9 to 1.1 (20% more)
          : 0;

        // Check if neuron is in any active region
        let regionBrightness = 0;
        activeRegions.forEach(region => {
          const dist = Math.sqrt(
            Math.pow(neuron.x - region.x, 2) +
            Math.pow(neuron.y - region.y, 2) +
            Math.pow(neuron.z - region.z, 2)
          );
          if (dist < region.radius) {
            regionBrightness = Math.max(regionBrightness,
              (1 - dist / region.radius) * region.strength * 0.5);
          }
        });

        // Subtle pulse effect
        const pulse = Math.sin(time * 2 + neuron.pulsePhase) * 0.01;

        // Combine all brightness sources
        const targetBrightness = Math.max(mouseBrightness, regionBrightness) + neuron.baseBrightness + pulse;

        // Faster response when lighting up, slower fade out
        if (targetBrightness > neuron.brightness) {
          neuron.brightness = neuron.brightness * 0.7 + targetBrightness * 0.3;
        } else {
          neuron.brightness = neuron.brightness * 0.92 + targetBrightness * 0.08;
        }

        // Removed signal creation to improve performance
      });

      // Sort neurons by depth (back to front)
      const sortedNeurons = [...neurons].sort((a, b) => a.depth - b.depth);

      // Draw connections only for neurons closer to viewer for performance
      sortedNeurons.forEach((neuron) => {
        // Skip drawing connections for neurons too far back
        if (Math.abs(neuron.depth) > sphereRadiusRef * 0.7) return;

        neuron.connections.forEach((connIndex) => {
          const connectedNeuron = neurons[connIndex];

          // Only draw if connected neuron is behind current neuron (for depth sorting)
          if (connectedNeuron.depth <= neuron.depth) {
            // Calculate mouse proximity for this neuron
            const mouseDistance = Math.hypot(
              neuron.screenX - mouse.x,
              neuron.screenY - mouse.y
            );

            // Base brightness always visible, increase near mouse
            const nearMouse = mouseDistance < 250;

            ctx.beginPath();
            ctx.moveTo(neuron.screenX, neuron.screenY);
            ctx.lineTo(connectedNeuron.screenX, connectedNeuron.screenY);

            // Calculate depth-based opacity
            const depthFactor = 1 - (Math.abs(neuron.depth) / (sphereRadiusRef * 1.5));

            // Base opacity for all connections, higher near mouse
            let baseOpacity = 0.25; // Brighter base for all connections
            if (nearMouse) baseOpacity = 0.35;

            // Purple gradient for connections
            const gradient = ctx.createLinearGradient(
              neuron.screenX, neuron.screenY,
              connectedNeuron.screenX, connectedNeuron.screenY
            );
            gradient.addColorStop(0, `rgba(168, 85, 247, ${baseOpacity * depthFactor})`);
            gradient.addColorStop(0.5, `rgba(180, 130, 250, ${baseOpacity * 0.7 * depthFactor})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${baseOpacity * 0.4 * depthFactor})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.3 + (0.3 * depthFactor);
            ctx.stroke();
          }
        });
      });

      // Draw neurons
      sortedNeurons.forEach((neuron) => {
        // Calculate depth-based size and opacity
        const depthScale = 1 - (neuron.depth + sphereRadiusRef) / (sphereRadiusRef * 2);
        const size = (0.5 + neuron.size * 2) * (0.6 + depthScale * 0.4);
        const alpha = Math.max(0.3, Math.min(1, neuron.brightness + 0.4)) * (0.5 + depthScale * 0.5);

        // Glow effect for bright neurons
        if (neuron.brightness > 0.2) {
          const gradient = ctx.createRadialGradient(
            neuron.screenX, neuron.screenY, 0,
            neuron.screenX, neuron.screenY, size * 6
          );
          gradient.addColorStop(0, `rgba(200, 180, 255, ${neuron.brightness * 0.5 * depthScale})`);
          gradient.addColorStop(1, "rgba(168, 85, 247, 0)");

          ctx.beginPath();
          ctx.arc(neuron.screenX, neuron.screenY, size * 6, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Neuron body
        ctx.beginPath();
        ctx.arc(neuron.screenX, neuron.screenY, size, 0, Math.PI * 2);

        // Color based on brightness and depth
        const r = 140 + neuron.brightness * 80;
        const g = 100 + neuron.brightness * 60;
        const b = 220 + neuron.brightness * 30;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        // Bright center for active neurons
        if (neuron.brightness > 0.5) {
          ctx.beginPath();
          ctx.arc(neuron.screenX, neuron.screenY, size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${neuron.brightness * 0.6})`;
          ctx.fill();
        }
      });


      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        mixBlendMode: "screen",
        opacity: 1
      }}
    />
  );
}