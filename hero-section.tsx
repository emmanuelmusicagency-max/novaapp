"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
  { label: "Assets under management", value: "$4.2B+" },
  { label: "Active investors", value: "820K+" },
  { label: "Supported assets", value: "60+" },
];

/** Full-viewport hero with gradient headline, CTAs, and trust stats. */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
      <div
        className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 opacity-30 blur-[120px] animate-pulse-glow"
        aria-hidden
      />

      <div className="container flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground"
        >
          <ShieldCheck className="h-4 w-4 text-success" />
          Trusted by 820,000+ investors worldwide
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Crypto investment banking,{" "}
          <span className="gradient-text">reimagined.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Buy, sell, stake, and grow your digital asset portfolio with
          institutional-grade tools, bank-level security, and real-time
          analytics — all in one platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button asChild size="lg" variant="gradient" className="gap-2">
            <Link href="/register">
              Start investing free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <a href="#features">
              <TrendingUp className="h-4 w-4" />
              See how it works
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid w-full max-w-2xl grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-3"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
