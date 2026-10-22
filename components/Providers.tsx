"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.11, anchors: true }}>
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
