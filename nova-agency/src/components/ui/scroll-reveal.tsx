"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  style?: CSSProperties;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 24,
  style,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={{ width: "100%", ...style }}
    >
      {children}
    </motion.div>
  );
}
