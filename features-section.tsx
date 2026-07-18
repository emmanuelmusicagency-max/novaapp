"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Repeat,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Wallet,
    title: "Unified wallet",
    description:
      "Hold, send, and receive 60+ crypto assets from a single secure balance.",
  },
  {
    icon: Repeat,
    title: "Instant swaps",
    description:
      "Swap between assets in seconds with transparent, competitive rates.",
  },
  {
    icon: BarChart3,
    title: "Real-time analytics",
    description:
      "Track performance, allocation, and risk across your entire portfolio.",
  },
  {
    icon: Sparkles,
    title: "Auto-Invest & DCA",
    description:
      "Automate recurring buys with dollar-cost averaging strategies.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade security",
    description:
      "Two-factor authentication, cold storage, and 24/7 fraud monitoring.",
  },
  {
    icon: Zap,
    title: "Staking rewards",
    description:
      "Earn passive yield on supported assets with flexible or locked terms.",
  },
];

/** Grid of core platform features with icon cards and stagger animation. */
export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Everything you need to invest with confidence
          </h2>
          <p className="mt-4 text-muted-foreground">
            NovaBank combines institutional-grade infrastructure with an
            interface built for everyday investors.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
