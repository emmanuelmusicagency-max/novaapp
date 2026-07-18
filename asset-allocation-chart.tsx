"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CRYPTO_ASSETS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

const ALLOCATION = CRYPTO_ASSETS.slice(0, 5).map((asset, i) => ({
  name: asset.symbol,
  value: [42, 24, 14, 11, 9][i],
  color: asset.color,
  usdValue: [27258, 15576, 9086, 7139, 5841][i],
}));

/** Donut chart showing portfolio allocation by asset. */
export function AssetAllocationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Asset allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ALLOCATION}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
              >
                {ALLOCATION.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value}%`, name]}
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 space-y-2">
          {ALLOCATION.map((asset) => (
            <div key={asset.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: asset.color }} />
                {asset.name}
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span>{formatCurrency(asset.usdValue)}</span>
                <span className="w-10 text-right font-medium text-foreground">{asset.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
