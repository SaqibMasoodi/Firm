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
  duration = 0.48,
  y = 20,
  style,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration, delay: delay > 0 ? delay * 0.8 : 0, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ width: "100%", ...style }}
    >
      {children}
    </motion.div>
  );
}
