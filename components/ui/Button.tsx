"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

type Variant = "cyan" | "ink" | "cream" | "ghost";

const styles: Record<Variant, string> = {
  cyan: "bg-cyan text-ink hover:bg-cyan-deep",
  ink: "bg-ink text-cream hover:bg-black",
  cream: "bg-cream text-ink hover:bg-paper",
  ghost: "bg-ink/[0.06] text-ink hover:bg-ink/10",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  /** Must contain the visible text (label-in-name). */
  ariaLabel?: string;
};

/** Pill button with a light magnetic pull on fine pointers. */
export default function Button({ href, children, variant = "cyan", className = "", arrow = true, ariaLabel }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });
  const external = href.startsWith("http");

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={`group inline-flex min-h-12 whitespace-nowrap items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-bold transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="size-[18px] transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.5}
        />
      )}
    </motion.a>
  );
}
