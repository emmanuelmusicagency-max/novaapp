import { ArrowDownRight, ArrowUpRight, Eye, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface SummaryCardsProps {
  totalBalance: number;
  totalProfit: number;
  profitPercent: number;
  todayChange: number;
}

/** Top-of-dashboard summary cards: balance, all-time profit, today's change. */
export function SummaryCards({
  totalBalance,
  totalProfit,
  profitPercent,
  todayChange,
}: SummaryCardsProps) {
  const isProfitPositive = totalProfit >= 0;
  const isTodayPositive = todayChange >= 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total balance</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold">{formatCurrency(totalBalance)}</p>
          <button className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <Eye className="h-3 w-3" /> Hide balance
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">All-time profit</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
          </div>
          <p className={`mt-3 text-3xl font-bold ${isProfitPositive ? "text-success" : "text-destructive"}`}>
            {isProfitPositive ? "+" : ""}
            {formatCurrency(totalProfit)}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">{formatPercent(profitPercent)} overall</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Today's change</p>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                isTodayPositive ? "bg-success/10" : "bg-destructive/10"
              }`}
            >
              {isTodayPositive ? (
                <ArrowUpRight className="h-4 w-4 text-success" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-destructive" />
              )}
            </div>
          </div>
          <p className={`mt-3 text-3xl font-bold ${isTodayPositive ? "text-success" : "text-destructive"}`}>
            {formatPercent(todayChange)}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Since midnight UTC</p>
        </CardContent>
      </Card>
    </div>
  );
}
