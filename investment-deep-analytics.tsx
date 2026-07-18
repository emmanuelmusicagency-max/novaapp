"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPercent } from "@/lib/utils";

const RISK_METRICS = [
  { label: "Portfolio volatility (30d)", value: "18.4%" },
  { label: "Sharpe ratio", value: "1.62" },
  { label: "Max drawdown (1y)", value: "-24.1%" },
  { label: "Correlation to BTC", value: "0.81" },
];

const RETURN_COMPARISON = [
  { month: "Feb", portfolio: 2.1, btc: 1.4 },
  { month: "Mar", portfolio: -3.2, btc: -4.8 },
  { month: "Apr", portfolio: 15.6, btc: 12.3 },
  { month: "May", portfolio: -6.7, btc: -8.1 },
  { month: "Jun", portfolio: 17.8, btc: 14.5 },
  { month: "Jul", portfolio: 10.9, btc: 9.2 },
];

/** Deeper analytics: monthly return comparison vs. BTC and risk metrics. */
export function InvestmentDeepAnalytics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Monthly return vs. Bitcoin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RETURN_COMPARISON} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                  width={40}
                />
                <Tooltip
                  formatter={(value: number) => formatPercent(value)}
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="portfolio" name="Your portfolio" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="btc" name="Bitcoin" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {RISK_METRICS.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className="mt-1 text-xl font-bold">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
