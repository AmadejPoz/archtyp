"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-archtyp-bg-primary border-t border-archtyp-purple-primary/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Company */}
          <div>
            <h3 className="text-2xl font-display font-bold text-archtyp-text-primary mb-2">
              ARCHTYP
            </h3>
            <p className="text-archtyp-text-muted text-sm mb-4">
              A Vandri Robotics Company
            </p>
            <p className="text-archtyp-text-muted text-sm">Ljubljana, Slovenia</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-archtyp-text-primary mb-4">
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@archtyp.ai"
                  className="text-archtyp-text-muted hover:text-archtyp-purple-primary transition-colors text-sm"
                >
                  hello@archtyp.ai
                </a>
              </li>
              <li>
                <a
                  href="https://archtyp.ai"
                  className="text-archtyp-text-muted hover:text-archtyp-purple-primary transition-colors text-sm"
                >
                  archtyp.ai
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-archtyp-text-primary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#solution"
                  className="text-archtyp-text-muted hover:text-archtyp-purple-primary transition-colors text-sm"
                >
                  Solution
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-archtyp-text-muted hover:text-archtyp-purple-primary transition-colors text-sm"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-archtyp-text-muted hover:text-archtyp-purple-primary transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-archtyp-purple-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-archtyp-text-muted text-sm">
              © 2026 ARCHTYP. All rights reserved.
            </p>
            <div className="font-mono text-xs text-archtyp-purple-light/30">
              &gt; system.status: OPERATIONAL
            </div>
          </div>
        </div>

        {/* Background Triangle Pattern */}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M100 50 L150 150 L50 150 Z"
              stroke="#A855F7"
              strokeWidth="2"
              fill="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{ originX: "100px", originY: "100px" }}
            />
          </svg>
        </div>
      </div>
    </footer>
  );
}
