"use client";

import { useState } from "react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import JobCard from "@/components/careers/JobCard";
import ApplicationForm from "@/components/careers/ApplicationForm";
import { motion } from "framer-motion";

const positions = [
  {
    id: 1,
    title: "AI / Backend Engineer",
    type: "Full-time · Ljubljana",
    description: "Core conversation engine — real-time LLM orchestration, speech-to-response pipeline, sub-500ms latency. Python, async, WebSocket/gRPC. You'll ship code that runs on live robots in hotels and public spaces across Europe.",
    requirements: ["Strong Python", "Experience with LLM APIs", "Real-time systems", "Obsession with latency"],
    color: "from-purple-600 to-purple-400"
  },
  {
    id: 2,
    title: "Speech & ML Engineer",
    type: "Full-time · Ljubljana",
    description: "Audio intelligence layer — multilingual ASR/TTS, speaker diarization, multi-party conversations, noise robustness. 60+ languages in real environments.",
    requirements: ["Speech processing (Whisper, Deepgram...)", "Audio signal processing", "PyTorch", "Ideally shipped speech product or research"],
    color: "from-violet-600 to-violet-400"
  },
  {
    id: 3,
    title: "Robotics Integration Engineer",
    type: "Full-time · Ljubljana",
    description: "ARCHTYP must work on all robots — Keenon, Unitree, Temi, PUDU... You build the integration layer, SDK connections, hardware abstraction. Sometimes you're in the office, sometimes debugging a robot in a hotel.",
    requirements: ["ROS or robot SDK experience", "Python + C/C++", "Willingness to travel (EU + Asia)"],
    color: "from-indigo-600 to-indigo-400"
  },
  {
    id: 4,
    title: "Full-Stack Developer",
    type: "Full-time · Ljubljana",
    description: "Dashboard where partners configure robots, track conversations and extract interaction insights. React/Next.js, real-time analytics, billing, partner portal.",
    requirements: ["React/TypeScript", "Node.js", "SaaS dashboard experience", "PostgreSQL/Redis", "Real-time data"],
    color: "from-purple-500 to-indigo-400"
  }
];

export default function Careers() {
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const handleApply = (positionId: number) => {
    setSelectedPosition(positionId);
    setShowApplicationForm(true);
    setTimeout(() => {
      document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="relative min-h-screen bg-archtyp-bg-primary">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-indigo-900/5" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-archtyp-text-primary">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-archtyp-purple-primary to-archtyp-purple-light">
                Careers
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {positions.map((position, index) => (
              <JobCard
                key={position.id}
                position={position}
                index={index}
                onApply={() => handleApply(position.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      {showApplicationForm && (
        <ApplicationForm
          selectedPosition={selectedPosition}
          positions={positions}
          onClose={() => {
            setShowApplicationForm(false);
            setSelectedPosition(null);
          }}
        />
      )}


      <Footer />
    </main>
  );
}