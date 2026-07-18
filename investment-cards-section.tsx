"use client";

import { motion } from "framer-motion";
import { Layers, PiggyBank, Repeat2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const INVESTMENT_OPTIONS = [
  {
    icon: PiggyBank,
    title: "Staking",
    apy: "Up to 12.4% APY",
    description:
      "Lock supported assets to earn passive rewards paid directly to your wallet.",
    accent: "from-emerald-500/20 to-emerald-500/0",
  },
  {
    icon: Repeat2,
    title: "Dollar-Cost Averaging",
    apy: "Automated & flexible",
    description:
      "Schedule recurring buys daily, weekly, or monthly to smooth out volatility.",
    accent: "from-primary/20 to-primary/0",
  },
  {
    icon: Layers,
    title: "Auto-Invest Portfolios",
    apy: "Curated allocations",
    description:
      "Choose a risk profile and let NovaBank rebalance your allocation automatically.",
    accent: "from-sky-500/20 to-sky-500/0",
  },
];

/** Highlights the three core investment products (Phase 7 builds them out). */
export function InvestmentCardsSection() {
  return (
    <section id="invest" className="px-6 py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Put your crypto to work
          </h2>
          <p className="mt-4 text-muted-foreground">
            Beyond buying and holding, NovaBank gives you tools to grow your
            portfolio automatically.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {INVESTMENT_OPTIONS.map((option, i) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className={`relative overflow-hidden bg-gradient-to-b ${option.accent}`}>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                    <option.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{option.title}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{option.apy}</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {option.description}
                  </p>
                  <Button asChild variant="link" className="mt-4 h-auto p-0">
                    <Link href="/register">Get started →</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
