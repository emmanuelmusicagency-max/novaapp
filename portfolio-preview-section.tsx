"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatPercent } from "@/lib/utils";

const PORTFOLIO_HISTORY = [
  { month: "Jan", value: 42000 },
  { month: "Feb", value: 45200 },
  { month: "Mar", value: 43800 },
  { month: "Apr", value: 51200 },
  { month: "May", value: 49600 },
  { month: "Jun", value: 58300 },
  { month: "Jul", value: 64900 },
];

const HOLDINGS_PREVIEW = [
  { symbol: "BTC", allocation: 42, color: "bg-[#F7931A]" },
  { symbol: "ETH", allocation: 28, color: "bg-[#627EEA]" },
  { symbol: "SOL", allocation: 15, color: "bg-[#14F195]" },
  { symbol: "Other", allocation: 15, color: "bg-muted-foreground/40" },
];

/** Marketing preview of the real dashboard's portfolio chart & allocation. */
export function PortfolioPreviewSection() {
  return (
    <section id="portfolio" className="px-6 py-24">
      <div className="container grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Your entire portfolio, at a glance
          </h2>
          <p className="mt-4 text-muted-foreground">
            See performance, allocation, and profit-and-loss for every asset
            you hold — updated in real time, with the analytics depth of an
            institutional trading desk.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Live P&L across every position",
              "Custom date-range performance charts",
              "Asset allocation breakdown by category",
              "Exportable statements for tax season",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border-border/60 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total balance</p>
                  <p className="mt-1 text-3xl font-bold">{formatCurrency(64900)}</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {formatPercent(54.5)}
                </div>
              </div>

              <div className="mt-6 h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PORTFOLIO_HISTORY} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                    <defs>
                      <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" hide />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        background: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#portfolioFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 space-y-3">
                {HOLDINGS_PREVIEW.map((holding) => (
                  <div key={holding.symbol} className="flex items-center gap-3">
                    <span className="w-12 text-xs font-medium text-muted-foreground">
                      {holding.symbol}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full ${holding.color}`}
                        style={{ width: `${holding.allocation}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs text-muted-foreground">
                      {holding.allocation}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
