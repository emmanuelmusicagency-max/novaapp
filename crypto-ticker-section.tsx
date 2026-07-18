"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { CRYPTO_ASSETS } from "@/lib/constants";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";

/** Infinite horizontally scrolling ticker of live crypto prices. */
export function CryptoTickerSection() {
  const doubled = [...CRYPTO_ASSETS, ...CRYPTO_ASSETS];

  return (
    <section className="border-y border-border bg-card/50 py-4">
      <div className="scroll-thin flex gap-8 overflow-x-hidden">
        <div className="flex shrink-0 animate-[shimmer_40s_linear_infinite] gap-8 [animation-name:none] motion-safe:[animation:marquee_35s_linear_infinite]">
          {doubled.map((asset, i) => (
            <div key={`${asset.symbol}-${i}`} className="flex shrink-0 items-center gap-2 px-2 text-sm">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: asset.color }}
              >
                {asset.symbol.slice(0, 1)}
              </span>
              <span className="font-semibold">{asset.symbol}</span>
              <span className="text-muted-foreground">{formatCurrency(asset.price)}</span>
              <span
                className={cn(
                  "flex items-center gap-0.5 font-medium",
                  asset.change24h >= 0 ? "text-success" : "text-destructive"
                )}
              >
                {asset.change24h >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {formatPercent(asset.change24h)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
