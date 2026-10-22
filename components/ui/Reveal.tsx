"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p";
  style?: React.CSSProperties;
};

/** Rises into place once, as it scrolls into view. Content stays visible without JS (see layout noscript). */
export default function Reveal({ children, className, delay = 0, y = 24, as = "div", style }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      data-reveal
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
