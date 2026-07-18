"use client";

import { motion } from "framer-motion";

/**
 * Wraps route content with a subtle fade/slide-in animation. Used via
 * `template.tsx` files, which Next.js re-mounts on every navigation
 * (unlike `layout.tsx`), so the animation replays on each page change.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
