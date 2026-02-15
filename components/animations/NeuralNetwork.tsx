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

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const neuronsRef = useRef<Neuron3D[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const animationRef = useRef<number>();
  const rotationRef = useRef({ x: 0, y: 0 });

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
    const neuronCount = 2500; // More neurons for wider coverage
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
        brightness: 0,
        baseBrightness: Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Create dense connections between neurons
    neurons.forEach((neuron, i) => {
      const maxConnections = 15 + Math.floor(Math.random() * 10); // 15-25 connections per neuron
      const connectionRadius = sphereRadius * 0.5;
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
        if (Math.random() > 0.3) { // 70% chance of connection
          connections.push(distances[k].index);
        }
      }

      neuron.connections = connections;
    });

    neuronsRef.current = neurons;
    const sphereRadiusRef = sphereRadius;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
      // Auto-rotate based on mouse position - more subtle
      rotationRef.current = {
        y: (e.clientX - canvas.width / 2) * 0.0002,
        x: (e.clientY - canvas.height / 2) * 0.0002
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

    // Rotate point in 3D space
    const rotatePoint3D = (x: number, y: number, z: number, rotX: number, rotY: number) => {
      // Rotate around Y axis
      let cosY = Math.cos(rotY);
      let sinY = Math.sin(rotY);
      let tempX = x * cosY - z * sinY;
      let tempZ = x * sinY + z * cosY;

      // Rotate around X axis
      let cosX = Math.cos(rotX);
      let sinX = Math.sin(rotX);
      let finalY = y * cosX - tempZ * sinX;
      let finalZ = y * sinX + tempZ * cosX;

      return { x: tempX, y: finalY, z: finalZ };
    };

    let rotationAngle = { x: 0, y: 0 };

    const animate = () => {
      frameRef.current++;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 5, 0.98)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const neurons = neuronsRef.current;
      const mouse = mouseRef.current;
      const time = frameRef.current * 0.01;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Smooth rotation
      rotationAngle.x += rotationRef.current.x * 0.05;
      rotationAngle.y += rotationRef.current.y * 0.05;

      // Very subtle auto-rotation
      rotationAngle.y += 0.001;

      // Update 3D positions and project to 2D
      neurons.forEach((neuron) => {
        // Rotate neuron position
        const rotated = rotatePoint3D(neuron.x, neuron.y, neuron.z, rotationAngle.x, rotationAngle.y);
        const projected = project3D(rotated.x, rotated.y, rotated.z, centerX, centerY);

        neuron.screenX = projected.screenX;
        neuron.screenY = projected.screenY;
        neuron.depth = rotated.z;

        // Calculate distance from mouse in 2D space
        const mouseDistance = Math.hypot(
          neuron.screenX - mouse.x,
          neuron.screenY - mouse.y
        );

        // Mouse interaction - stronger effect and wider range
        const maxMouseDistance = 300;
        const mouseBrightness = mouseDistance < maxMouseDistance
          ? Math.pow(1 - mouseDistance / maxMouseDistance, 1.2)
          : 0;

        // Pulse effect
        const pulse = Math.sin(time * 2 + neuron.pulsePhase) * 0.01;

        // Update brightness - faster response
        neuron.brightness = neuron.brightness * 0.85 +
                           (mouseBrightness + neuron.baseBrightness + pulse) * 0.15;
      });

      // Sort neurons by depth (back to front)
      const sortedNeurons = [...neurons].sort((a, b) => a.depth - b.depth);

      // Draw connections only when mouse is near
      sortedNeurons.forEach((neuron) => {
        // Calculate mouse proximity
        const mouseDistance = Math.hypot(
          neuron.screenX - mouse.x,
          neuron.screenY - mouse.y
        );

        // Only draw connections if mouse is close - larger radius for better visibility
        if (mouseDistance < 250 && neuron.brightness > 0.05) {
          neuron.connections.forEach((connIndex) => {
            const connectedNeuron = neurons[connIndex];

            // Only draw if connected neuron is behind current neuron
            if (connectedNeuron.depth <= neuron.depth) {
              const connectionBrightness = neuron.brightness;

              ctx.beginPath();
              ctx.moveTo(neuron.screenX, neuron.screenY);
              ctx.lineTo(connectedNeuron.screenX, connectedNeuron.screenY);

              // Calculate depth-based opacity
              const depthFactor = 1 - (Math.abs(neuron.depth) / (sphereRadiusRef * 1.5));

              // Purple gradient for connections - more visible
              const gradient = ctx.createLinearGradient(
                neuron.screenX, neuron.screenY,
                connectedNeuron.screenX, connectedNeuron.screenY
              );
              gradient.addColorStop(0, `rgba(168, 85, 247, ${connectionBrightness * 0.4 * depthFactor})`);
              gradient.addColorStop(0.5, `rgba(180, 130, 250, ${connectionBrightness * 0.3 * depthFactor})`);
              gradient.addColorStop(1, `rgba(139, 92, 246, ${connectionBrightness * 0.2 * depthFactor})`);

              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.2 + (0.3 * depthFactor);
              ctx.stroke();
            }
          });
        }
      });

      // Draw neurons
      sortedNeurons.forEach((neuron) => {
        // Calculate depth-based size and opacity
        const depthScale = 1 - (neuron.depth + sphereRadiusRef) / (sphereRadiusRef * 2);
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

      // Random activation waves
      if (Math.random() > 0.99) {
        const randomIndex = Math.floor(Math.random() * neurons.length);
        neurons[randomIndex].brightness = 1;

        // Activate connected neurons
        neurons[randomIndex].connections.forEach((connIndex) => {
          setTimeout(() => {
            neurons[connIndex].brightness = Math.max(neurons[connIndex].brightness, 0.7);
          }, Math.random() * 200);
        });
      }

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