"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import GlowButton from "../animations/GlowButton";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(5, 6, 8, 0.8)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(10px)"]);

  const navItems = [
    { label: "Solution", href: "#solution" },
    { label: "Technology", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ];

  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMobileMenuOpen(false);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        style={{ backgroundColor, backdropFilter: backdropBlur }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-archtyp-purple-primary/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection("#")}
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/images/Untitled design (9).png"
                alt="ARCHTYP"
                width={40}
                height={40}
                className="w-auto h-10 object-contain"
              />
              <span className="text-xl font-display font-bold text-archtyp-text-primary hidden sm:block">
                ARCHTYP
              </span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-archtyp-text-secondary hover:text-archtyp-purple-primary transition-colors duration-300 font-medium"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <GlowButton
                  variant="primary"
                  className="!px-6 !py-2 text-sm"
                  onClick={() => scrollToSection("#contact")}
                >
                  Contact
                </GlowButton>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-archtyp-text-primary p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-archtyp-bg-primary md:hidden"
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-3xl font-display text-archtyp-text-primary hover:text-archtyp-purple-primary transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
            <GlowButton onClick={() => scrollToSection("#contact")}>Contact</GlowButton>
          </div>
        </motion.div>
      )}
    </>
  );
}
