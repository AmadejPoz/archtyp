"use client";

import { useEffect, useRef } from "react";

interface Neuron {
  x: number;
  y: number;
  size: number;
  brightness: number;
  connections: number[];
}

interface CardNeuralNetworkProps {
  color?: string;
}

export default function CardNeuralNetwork({ color = "168, 85, 247" }: CardNeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const neuronsRef = useRef<Neuron[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create fewer neurons for card
    const neurons: Neuron[] = [];
    const neuronCount = 50;

    for (let i = 0; i < neuronCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 0.5 + Math.random() * 1;

      neurons.push({
        x,
        y,
        size,
        brightness: Math.random() * 0.3,
        connections: []
      });
    }

    // Create connections
    neurons.forEach((neuron, i) => {
      const connectionCount = 2 + Math.floor(Math.random() * 2);
      const connections: number[] = [];

      for (let j = 0; j < neuronCount; j++) {
        if (i !== j) {
          const otherNeuron = neurons[j];
          const dist = Math.hypot(neuron.x - otherNeuron.x, neuron.y - otherNeuron.y);
          if (dist < 80 && connections.length < connectionCount) {
            connections.push(j);
          }
        }
      }

      neuron.connections = connections;
    });

    neuronsRef.current = neurons;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const neurons = neuronsRef.current;
      const mouse = mouseRef.current;

      // Update neuron brightness
      neurons.forEach(neuron => {
        const mouseDistance = Math.hypot(neuron.x - mouse.x, neuron.y - mouse.y);
        const maxDistance = 100;
        const mouseBrightness = mouseDistance < maxDistance
          ? (1 - mouseDistance / maxDistance) * 0.8
          : 0;

        const targetBrightness = mouseBrightness + 0.1;
        neuron.brightness = neuron.brightness * 0.9 + targetBrightness * 0.1;
      });

      // Draw connections
      neurons.forEach((neuron) => {
        neuron.connections.forEach(connIndex => {
          const connectedNeuron = neurons[connIndex];

          ctx.beginPath();
          ctx.moveTo(neuron.x, neuron.y);
          ctx.lineTo(connectedNeuron.x, connectedNeuron.y);

          const avgBrightness = (neuron.brightness + connectedNeuron.brightness) / 2;
          ctx.strokeStyle = `rgba(${color}, ${avgBrightness * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      });

      // Draw neurons
      neurons.forEach(neuron => {
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, neuron.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${neuron.brightness})`;
        ctx.fill();

        // Glow effect
        if (neuron.brightness > 0.3) {
          const gradient = ctx.createRadialGradient(
            neuron.x, neuron.y, 0,
            neuron.x, neuron.y, neuron.size * 4
          );
          gradient.addColorStop(0, `rgba(${color}, ${neuron.brightness * 0.3})`);
          gradient.addColorStop(1, `rgba(${color}, 0)`);

          ctx.beginPath();
          ctx.arc(neuron.x, neuron.y, neuron.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
      }
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        mixBlendMode: "screen",
        opacity: 0.6,
        pointerEvents: "none"
      }}
    />
  );
}