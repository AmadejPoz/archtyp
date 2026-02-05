"use client";

import FadeIn from "../animations/FadeIn";
import { motion } from "framer-motion";
import GlowButton from "../animations/GlowButton";

const pricingPlans = [
  {
    name: "Standard",
    price: "€99",
    period: "/month per robot",
    features: [
      "Full cognitive stack",
      "Multi-language support",
      "Cloud + edge processing",
      "Regular updates",
      "Email support",
    ],
  },
  {
    name: "Enterprise",
    price: "Let's talk",
    period: "Custom pricing",
    features: [
      "Everything in Standard",
      "Dedicated infrastructure",
      "Custom integrations",
      "Priority support",
      "SLA guarantees",
    ],
    featured: true,
  },
];

export default function Pricing() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-archtyp-text-primary mb-6">
              Pricing
            </h2>
            <p className="text-xl text-archtyp-text-secondary max-w-3xl mx-auto">
              Simple, transparent pricing. Scale with your fleet.
            </p>
          </motion.div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <FadeIn key={plan.name} delay={index * 0.2}>
              <motion.div
                whileHover={{ scale: 1.03, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`relative group h-full ${
                  plan.featured ? "md:scale-105" : ""
                }`}
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-archtyp-purple-primary/30 to-archtyp-purple-dark/30 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    plan.featured ? "opacity-50" : ""
                  }`}
                />

                {/* Card */}
                <div
                  className={`relative bg-archtyp-bg-card border-2 rounded-lg p-8 h-full flex flex-col ${
                    plan.featured
                      ? "border-archtyp-purple-primary/50"
                      : "border-archtyp-purple-primary/20"
                  } hover:border-archtyp-purple-primary/70 transition-all duration-300`}
                >
                  {/* Featured badge */}
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-archtyp-purple-primary text-archtyp-bg-primary px-4 py-1 rounded-full text-xs font-mono font-semibold">
                        RECOMMENDED
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-display font-bold text-archtyp-text-primary mb-4">
                      {plan.name}
                    </h3>
                    <div className="mb-2">
                      <span className="text-4xl sm:text-5xl font-display font-bold text-archtyp-purple-primary">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-sm text-archtyp-text-muted font-mono">
                      {plan.period}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-archtyp-purple-primary/30 to-transparent mb-8" />

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <svg
                          className="w-5 h-5 text-archtyp-purple-primary flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                          />
                        </svg>
                        <span className="text-archtyp-text-secondary">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto">
                    <GlowButton
                      variant={plan.featured ? "primary" : "secondary"}
                      onClick={() => scrollToSection("#contact")}
                      className="w-full justify-center"
                    >
                      {plan.featured ? "Contact Sales" : "Get Started"}
                    </GlowButton>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-archtyp-purple-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
