"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";

const RANGES = ["24H", "7D", "1M", "3M", "1Y", "ALL"] as const;

const DATA_BY_RANGE: Record<(typeof RANGES)[number], { label: string; value: number }[]> = {
  "24H": Array.from({ length: 12 }, (_, i) => ({
    label: `${i * 2}:00`,
    value: 60000 + Math.sin(i / 2) * 2500 + i * 300,
  })),
  "7D": Array.from({ length: 7 }, (_, i) => ({
    label: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    value: 58000 + Math.sin(i) * 3000 + i * 700,
  })),
  "1M": Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1}`,
    value: 52000 + Math.sin(i / 3) * 4000 + i * 400,
  })),
  "3M": Array.from({ length: 12 }, (_, i) => ({
    label: `W${i + 1}`,
    value: 45000 + Math.sin(i / 2) * 5000 + i * 1500,
  })),
  "1Y": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
    (label, i) => ({ label, value: 30000 + Math.sin(i / 2) * 6000 + i * 3000 })
  ),
  ALL: Array.from({ length: 8 }, (_, i) => ({
    label: `Y${i + 1}`,
    value: 5000 + i * 8500,
  })),
};

/** Main portfolio value chart with switchable time ranges. */
export function PortfolioChart() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("1M");
  const data = DATA_BY_RANGE[range];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Portfolio performance</CardTitle>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {RANGES.map((r) => (
            <Button
              key={r}
              size="sm"
              variant="ghost"
              onClick={() => setRange(r)}
              className={cn(
                "h-7 px-2.5 text-xs",
                range === r && "bg-background shadow-sm"
              )}
            >
              {r}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="mainPortfolioFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                width={48}
              />
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
                fill="url(#mainPortfolioFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
