import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CRYPTO_ASSETS } from "@/lib/constants";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";

/** Tabbed widget listing the day's biggest gainers and losers. */
export function TopMovers() {
  const gainers = [...CRYPTO_ASSETS].sort((a, b) => b.change24h - a.change24h).slice(0, 5);
  const losers = [...CRYPTO_ASSETS].sort((a, b) => a.change24h - b.change24h).slice(0, 5);

  const renderRow = (asset: (typeof CRYPTO_ASSETS)[number]) => (
    <div key={asset.symbol} className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-3">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: asset.color }}
        >
          {asset.symbol.slice(0, 1)}
        </span>
        <div>
          <p className="text-sm font-medium">{asset.symbol}</p>
          <p className="text-xs text-muted-foreground">{asset.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{formatCurrency(asset.price)}</p>
        <p
          className={cn(
            "flex items-center justify-end gap-0.5 text-xs font-medium",
            asset.change24h >= 0 ? "text-success" : "text-destructive"
          )}
        >
          {asset.change24h >= 0 ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {formatPercent(asset.change24h)}
        </p>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Market movers</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gainers">Top gainers</TabsTrigger>
            <TabsTrigger value="losers">Top losers</TabsTrigger>
          </TabsList>
          <TabsContent value="gainers" className="divide-y divide-border">
            {gainers.map(renderRow)}
          </TabsContent>
          <TabsContent value="losers" className="divide-y divide-border">
            {losers.map(renderRow)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
