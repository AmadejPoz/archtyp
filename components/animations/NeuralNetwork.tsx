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
  lastFired: number; // Track when neuron last fired
}

interface Signal {
  fromNeuron: number;
  toNeuron: number;
  progress: number; // 0 to 1
  strength: number;
  speed: number;
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
  const signalsRef = useRef<Signal[]>([]);
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

    // Detect mobile device
    const isMobile = window.innerWidth < 768;

    // Create neurons - fewer on mobile, different distribution
    const neurons: Neuron3D[] = [];
    const neuronCount = isMobile ? 350 : 2500; // Much fewer on mobile
    let sphereRadius: number;

    if (isMobile) {
      // MOBILE: Distribute neurons evenly across the viewport to avoid condensation
      sphereRadius = canvas.width * 0.4; // Smaller sphere reference for mobile
      const gridCols = Math.ceil(Math.sqrt(neuronCount * (canvas.width / canvas.height)));
      const gridRows = Math.ceil(neuronCount / gridCols);
      const cellWidth = canvas.width / (gridCols + 1);
      const cellHeight = canvas.height / (gridRows + 1);

      let neuronIndex = 0;
      for (let row = 0; row < gridRows && neuronIndex < neuronCount; row++) {
        for (let col = 0; col < gridCols && neuronIndex < neuronCount; col++) {
          // Spread neurons evenly with jitter, avoiding center condensation
          const baseX = (col + 1) * cellWidth;
          const baseY = (row + 1) * cellHeight;

          // Add randomness but keep neurons spread out
          const jitterX = (Math.random() - 0.5) * cellWidth * 0.4;
          const jitterY = (Math.random() - 0.5) * cellHeight * 0.4;

          const x = baseX + jitterX - canvas.width / 2;
          const y = baseY + jitterY - canvas.height / 2;
          const z = (Math.random() - 0.5) * 50; // Very shallow depth for mobile

          neurons.push({
            x, y, z,
            screenX: 0,
            screenY: 0,
            depth: 0,
            size: 0.08 + Math.random() * 0.12, // Slightly smaller neurons on mobile
            connections: [],
            brightness: 0,
            baseBrightness: Math.random() * 0.008,
            pulsePhase: Math.random() * Math.PI * 2,
            lastFired: -5 - Math.random() * 5
          });
          neuronIndex++;
        }
      }
    } else {
      // DESKTOP: Original sphere distribution
      sphereRadius = canvas.width * 0.6;

      for (let i = 0; i < neuronCount; i++) {
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        const theta = 2 * Math.PI * i / goldenRatio;
        const phi = Math.acos(1 - 2 * i / neuronCount);

        const radiusVariation = 0.5 + Math.random() * 0.5;
        const r = sphereRadius * radiusVariation;

        const x = r * Math.sin(phi) * Math.cos(theta) * 1.2;
        const y = r * Math.sin(phi) * Math.sin(theta) * 0.6;
        const z = r * Math.cos(phi) * 0.8;

        neurons.push({
          x, y, z,
          screenX: 0,
          screenY: 0,
          depth: 0,
          size: 0.05 + Math.random() * 0.15,
          connections: [],
          brightness: 0,
          baseBrightness: Math.random() * 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
          lastFired: -5 - Math.random() * 5
        });
      }
    }

    // Create connections between neurons - much fewer on mobile
    neurons.forEach((neuron, i) => {
      const maxConnections = isMobile ? 3 : 15 + Math.floor(Math.random() * 10); // Only 3 on mobile
      const connectionRadius = isMobile ? 150 : canvas.width * 0.3;
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
        if (Math.random() > (isMobile ? 0.5 : 0.3)) { // Less connections on mobile
          connections.push(distances[k].index);
        }
      }

      neuron.connections = connections;
    });

    neuronsRef.current = neurons;

    // Give some random neurons initial brightness to start activity immediately
    for (let i = 0; i < 20; i++) {
      const randomNeuron = neurons[Math.floor(Math.random() * neurons.length)];
      randomNeuron.brightness = 0.5 + Math.random() * 0.3;
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
      const signals = signalsRef.current;
      const activeRegions = activeRegionsRef.current;
      const mouse = mouseRef.current;
      const time = frameRef.current * 0.01;

      // Create random active regions (brain activity) - less frequent, even less on mobile
      const activeRegionChance = isMobile ? 0.9995 : 0.998;
      if (Math.random() > activeRegionChance) {
        const randomNeuron = neurons[Math.floor(Math.random() * neurons.length)];
        activeRegions.push({
          x: randomNeuron.x,
          y: randomNeuron.y,
          z: randomNeuron.z,
          radius: isMobile ? (40 + Math.random() * 40) : (60 + Math.random() * 80),
          strength: isMobile ? (0.3 + Math.random() * 0.2) : (0.5 + Math.random() * 0.2),
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
      neurons.forEach((neuron, index) => {
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

        // Very subtle pulse effect
        const pulse = Math.sin(time * 2 + neuron.pulsePhase) * 0.005;

        // Combine all brightness sources
        const targetBrightness = Math.max(mouseBrightness, regionBrightness) + neuron.baseBrightness + pulse;

        // Faster response when lighting up, slower fade out
        if (targetBrightness > neuron.brightness) {
          neuron.brightness = neuron.brightness * 0.7 + targetBrightness * 0.3;
        } else {
          neuron.brightness = neuron.brightness * 0.92 + targetBrightness * 0.08;
        }

        // Fire neuron and create signals if bright enough (with longer refractory period)
        const refractoryPeriod = isMobile ? 4.0 : 3.0; // Longer on mobile
        if (neuron.brightness > 0.4 && time - neuron.lastFired > refractoryPeriod) {
          neuron.lastFired = time;
          // Increase signal chance by 15% near mouse (reduced by 50%), even less on mobile
          const nearMouse = mouseDistance < 250;
          const signalChance = isMobile
            ? (nearMouse ? 0.95 : 0.97) // 5% near mouse, 3% elsewhere on mobile
            : (nearMouse ? 0.85 : 0.925); // 15% near mouse, 7.5% elsewhere on desktop

          if (Math.random() > signalChance && neuron.connections.length > 0) {
            const connIndex = neuron.connections[Math.floor(Math.random() * neuron.connections.length)];
            signals.push({
              fromNeuron: index,
              toNeuron: connIndex,
              progress: 0,
              strength: neuron.brightness * 0.7,
              speed: 0.015 + Math.random() * 0.015
            });
          }
        }
      });

      // Update and draw signals
      signalsRef.current = signals.filter(signal => {
        signal.progress += signal.speed;

        // Remove completed signals
        if (signal.progress >= 1) {
          // Slightly activate target neuron when signal arrives
          neurons[signal.toNeuron].brightness = Math.min(1,
            neurons[signal.toNeuron].brightness + signal.strength * 0.2);
          return false;
        }

        // Draw the signal
        const fromNeuron = neurons[signal.fromNeuron];
        const toNeuron = neurons[signal.toNeuron];

        // Interpolate position along the connection
        const x = fromNeuron.screenX + (toNeuron.screenX - fromNeuron.screenX) * signal.progress;
        const y = fromNeuron.screenY + (toNeuron.screenY - fromNeuron.screenY) * signal.progress;

        // Draw signal as glowing segment traveling along connection
        const tailLength = 0.08; // Length of the tail as percentage of connection
        const tailProgress = Math.max(0, signal.progress - tailLength);
        const tailX = fromNeuron.screenX + (toNeuron.screenX - fromNeuron.screenX) * tailProgress;
        const tailY = fromNeuron.screenY + (toNeuron.screenY - fromNeuron.screenY) * tailProgress;

        // Glow effect around signal - more purple
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        glowGradient.addColorStop(0, `rgba(210, 170, 250, ${signal.strength * 0.3})`);
        glowGradient.addColorStop(1, `rgba(180, 120, 240, 0)`);

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Main signal trail - purple-tinted, not white
        const gradient = ctx.createLinearGradient(tailX, tailY, x, y);
        gradient.addColorStop(0, `rgba(180, 120, 240, 0)`);
        gradient.addColorStop(0.3, `rgba(200, 150, 250, ${signal.strength * 0.3})`);
        gradient.addColorStop(0.7, `rgba(220, 180, 250, ${signal.strength * 0.6})`);
        gradient.addColorStop(1, `rgba(230, 200, 255, ${signal.strength * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1 + signal.strength * 0.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Leading edge - purple-white mix
        ctx.beginPath();
        ctx.arc(x, y, 0.8 + signal.strength * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 200, 255, ${signal.strength * 0.9})`;
        ctx.fill();

        return true;
      });

      // Sort neurons by depth (back to front)
      const sortedNeurons = [...neurons].sort((a, b) => a.depth - b.depth);

      // Draw ALL connections for ALL neurons
      sortedNeurons.forEach((neuron, neuronIndex) => {
        neuron.connections.forEach((connIndex) => {
          const connectedNeuron = neurons[connIndex];

          // Only draw if connected neuron is behind current neuron (for depth sorting)
          if (connectedNeuron.depth <= neuron.depth) {
            // Calculate mouse proximity for this neuron
            const mouseDistance = Math.hypot(
              neuron.screenX - mouse.x,
              neuron.screenY - mouse.y
            );

            // Check if there's a signal on this connection
            const signalOnConnection = signals.find(s =>
              (s.fromNeuron === neuronIndex && s.toNeuron === connIndex) ||
              (s.fromNeuron === connIndex && s.toNeuron === neuronIndex)
            );

            // Base brightness always visible, increase near mouse
            const nearMouse = mouseDistance < 250;

            ctx.beginPath();
            ctx.moveTo(neuron.screenX, neuron.screenY);
            ctx.lineTo(connectedNeuron.screenX, connectedNeuron.screenY);

            // Calculate depth-based opacity
            const depthFactor = 1 - (Math.abs(neuron.depth) / (sphereRadius * 1.5));

            // Base opacity for all connections, higher when signals travel or near mouse
            let baseOpacity = 0.12; // More visible base for all connections
            if (signalOnConnection) baseOpacity = 0.35;
            else if (nearMouse) baseOpacity = 0.2;

            // Purple gradient for connections
            const gradient = ctx.createLinearGradient(
              neuron.screenX, neuron.screenY,
              connectedNeuron.screenX, connectedNeuron.screenY
            );
            gradient.addColorStop(0, `rgba(168, 85, 247, ${baseOpacity * depthFactor})`);
            gradient.addColorStop(0.5, `rgba(180, 130, 250, ${baseOpacity * 0.7 * depthFactor})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${baseOpacity * 0.4 * depthFactor})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = signalOnConnection
              ? 0.5 + (0.5 * depthFactor)
              : 0.2 + (0.2 * depthFactor);
            ctx.stroke();
          }
        });
      });

      // Draw neurons
      sortedNeurons.forEach((neuron) => {
        // Calculate depth-based size and opacity
        const depthScale = 1 - (neuron.depth + sphereRadius) / (sphereRadius * 2);
        const size = (0.5 + neuron.size * 2) * (0.6 + depthScale * 0.4);
        const alpha = Math.max(0.1, Math.min(1, neuron.brightness + 0.2)) * (0.3 + depthScale * 0.7);

        // Glow effect for bright neurons
        if (neuron.brightness > 0.3) {
          const gradient = ctx.createRadialGradient(
            neuron.screenX, neuron.screenY, 0,
            neuron.screenX, neuron.screenY, size * 6
          );
          gradient.addColorStop(0, `rgba(200, 180, 255, ${neuron.brightness * 0.3 * depthScale})`);
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
        opacity: 0.95
      }}
    />
  );
}