"use client";

import { useState } from "react";
import FadeIn from "../animations/FadeIn";
import GlowButton from "../animations/GlowButton";
import ConsoleText from "../animations/ConsoleText";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden scanlines">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-archtyp-purple-primary/10 rounded-full filter blur-3xl pulse-glow" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl font-display font-bold text-archtyp-text-primary mb-6">
              READY TO GIVE YOUR ROBOTS A VOICE?
            </h2>
            <p className="text-xl text-archtyp-text-secondary max-w-2xl mx-auto">
              Let&apos;s talk. Whether you&apos;re a robot distributor, OEM, or enterprise deploying robots
              – we can help.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form
            onSubmit={handleSubmit}
            className="bg-archtyp-bg-card border border-archtyp-purple-primary/20 rounded-lg p-8 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-archtyp-text-secondary mb-2 font-display">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-archtyp-bg-secondary border border-archtyp-purple-primary/30 rounded-lg px-4 py-3 text-archtyp-text-primary focus:outline-none focus:border-archtyp-purple-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-archtyp-text-secondary mb-2 font-display">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-archtyp-bg-secondary border border-archtyp-purple-primary/30 rounded-lg px-4 py-3 text-archtyp-text-primary focus:outline-none focus:border-archtyp-purple-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-archtyp-text-secondary mb-2 font-display">
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                  className="w-full bg-archtyp-bg-secondary border border-archtyp-purple-primary/30 rounded-lg px-4 py-3 text-archtyp-text-primary focus:outline-none focus:border-archtyp-purple-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-archtyp-text-secondary mb-2 font-display">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full bg-archtyp-bg-secondary border border-archtyp-purple-primary/30 rounded-lg px-4 py-3 text-archtyp-text-primary focus:outline-none focus:border-archtyp-purple-primary transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="distributor">Distributor</option>
                  <option value="oem">OEM</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-archtyp-text-secondary mb-2 font-display">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-archtyp-bg-secondary border border-archtyp-purple-primary/30 rounded-lg px-4 py-3 text-archtyp-text-primary focus:outline-none focus:border-archtyp-purple-primary transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <GlowButton variant="primary" className="w-full md:w-auto">
                Send Message
              </GlowButton>
              {submitted && <ConsoleText text="message_received: PROCESSING" />}
            </div>
          </form>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-archtyp-text-muted font-mono text-sm mb-4">
              &gt; alternative_contact.methods()
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 text-archtyp-text-secondary">
              <a
                href="mailto:contact@archtyp.ai"
                className="hover:text-archtyp-purple-primary transition-colors"
              >
                contact@archtyp.ai
              </a>
              <span className="hidden sm:block">|</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-archtyp-purple-primary transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
