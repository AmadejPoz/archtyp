"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ApplicationFormProps {
  selectedPosition: number | null;
  positions: Array<{ id: number; title: string }>;
  onClose: () => void;
}

export default function ApplicationForm({ selectedPosition, positions, onClose }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    linkedin: "",
    github: "",
    message: "",
    cv: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, cv: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setShowSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      onClose();
      setShowSuccess(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        portfolio: "",
        linkedin: "",
        github: "",
        message: "",
        cv: null,
      });
    }, 3000);
  };

  const selectedPositionTitle = positions.find(p => p.id === selectedPosition)?.title || "";

  return (
    <AnimatePresence>
      <motion.section
        id="application-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Background glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-archtyp-purple-primary/20 to-archtyp-purple-dark/20 rounded-2xl blur-2xl" />

            <div className="relative bg-archtyp-bg-secondary/90 backdrop-blur-sm border border-archtyp-purple-primary/30 rounded-2xl p-8 md:p-12">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-archtyp-text-secondary hover:text-archtyp-text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!showSuccess ? (
                <>
                  <h2 className="text-3xl font-display font-bold text-archtyp-text-primary mb-2">
                    Apply for Position
                  </h2>
                  <p className="text-archtyp-purple-light mb-8 font-mono">
                    {selectedPositionTitle}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-archtyp-text-primary mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-archtyp-bg-primary/50 border border-archtyp-purple-primary/30 rounded-lg text-archtyp-text-primary placeholder-archtyp-text-secondary/50 focus:outline-none focus:border-archtyp-purple-light transition-colors"
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-archtyp-text-primary mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-archtyp-bg-primary/50 border border-archtyp-purple-primary/30 rounded-lg text-archtyp-text-primary placeholder-archtyp-text-secondary/50 focus:outline-none focus:border-archtyp-purple-light transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-archtyp-text-primary mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-archtyp-bg-primary/50 border border-archtyp-purple-primary/30 rounded-lg text-archtyp-text-primary placeholder-archtyp-text-secondary/50 focus:outline-none focus:border-archtyp-purple-light transition-colors"
                          placeholder="+386 XX XXX XXX"
                        />
                      </div>

                      {/* Portfolio */}
                      <div>
                        <label className="block text-sm font-medium text-archtyp-text-primary mb-2">
                          Portfolio / Website
                        </label>
                        <input
                          type="url"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-archtyp-bg-primary/50 border border-archtyp-purple-primary/30 rounded-lg text-archtyp-text-primary placeholder-archtyp-text-secondary/50 focus:outline-none focus:border-archtyp-purple-light transition-colors"
                          placeholder="https://portfolio.com"
                        />
                      </div>

                      {/* LinkedIn */}
                      <div>
                        <label className="block text-sm font-medium text-archtyp-text-primary mb-2">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-archtyp-bg-primary/50 border border-archtyp-purple-primary/30 rounded-lg text-archtyp-text-primary placeholder-archtyp-text-secondary/50 focus:outline-none focus:border-archtyp-purple-light transition-colors"
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>

                      {/* GitHub */}
                      <div>
                        <label className="block text-sm font-medium text-archtyp-text-primary mb-2">
                          GitHub Profile
                        </label>
                        <input
                          type="url"
                          name="github"
                          value={formData.github}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-archtyp-bg-primary/50 border border-archtyp-purple-primary/30 rounded-lg text-archtyp-text-primary placeholder-archtyp-text-secondary/50 focus:outline-none focus:border-archtyp-purple-light transition-colors"
                          placeholder="github.com/johndoe"
                        />
                      </div>
                    </div>

                    {/* CV Upload */}
                    <div>
                      <label className="block text-sm font-medium text-archtyp-text-primary mb-2">
                        CV / Resume *
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          name="cv"
                          required
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          id="cv-upload"
                        />
                        <label
                          htmlFor="cv-upload"
                          className="flex items-center justify-center px-4 py-3 bg-archtyp-bg-primary/50 border-2 border-dashed border-archtyp-purple-primary/30 rounded-lg cursor-pointer hover:border-archtyp-purple-light transition-colors"
                        >
                          <svg className="w-6 h-6 mr-2 text-archtyp-purple-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span className="text-archtyp-text-secondary">
                            {formData.cv ? formData.cv.name : "Upload CV (PDF, DOC, DOCX)"}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-archtyp-text-primary mb-2">
                        Why do you want to join ARCHTYP?
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-archtyp-bg-primary/50 border border-archtyp-purple-primary/30 rounded-lg text-archtyp-text-primary placeholder-archtyp-text-secondary/50 focus:outline-none focus:border-archtyp-purple-light transition-colors resize-none"
                        placeholder="Tell us about your motivation and what excites you about working with robots..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-archtyp-purple-primary to-archtyp-purple-dark rounded-lg font-medium text-white hover:shadow-lg hover:shadow-archtyp-purple-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Submit Application"
                      )}
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-archtyp-text-primary mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-archtyp-text-secondary">
                    Thank you for your interest. We&apos;ll review your application and get back to you soon.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}