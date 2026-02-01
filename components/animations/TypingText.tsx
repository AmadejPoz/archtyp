"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TypingText({ text, className = "", delay = 0, speed = 50 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setCurrentIndex(0);
      }, delay);
      return () => clearTimeout(delayTimer);
    }
  }, [delay]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-0.5 h-6 bg-archtyp-purple-primary ml-1 animate-blink" />
      )}
    </span>
  );
}
