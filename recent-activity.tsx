import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Coins,
  Repeat,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/types";
import { cn, formatCrypto, formatCurrency, formatDateTime } from "@/lib/utils";

const RECENT_TRANSACTIONS: Transaction[] = [
  { id: "tx1", type: "BUY", status: "COMPLETED", asset: "BTC", amount: 0.042, usdValue: 4054.7, fee: 20.27, createdAt: "2026-07-15T14:22:00Z" },
  { id: "tx2", type: "STAKE", status: "COMPLETED", asset: "ETH", amount: 1.2, usdValue: 6385.0, fee: 0, createdAt: "2026-07-14T09:10:00Z" },
  { id: "tx3", type: "SWAP", status: "COMPLETED", asset: "SOL → USDC", amount: 12.5, usdValue: 3102.4, fee: 4.65, createdAt: "2026-07-13T18:45:00Z" },
  { id: "tx4", type: "WITHDRAW", status: "PENDING", asset: "BTC", amount: 0.01, usdValue: 965.4, fee: 1.5, createdAt: "2026-07-13T08:00:00Z" },
  { id: "tx5", type: "RECEIVE", status: "COMPLETED", asset: "ETH", amount: 0.5, usdValue: 2660.4, fee: 0, createdAt: "2026-07-11T16:30:00Z" },
];

const TYPE_META: Record<Transaction["type"], { icon: typeof ArrowUpRight; color: string }> = {
  BUY: { icon: ArrowDownLeft, color: "bg-success/10 text-success" },
  SELL: { icon: ArrowUpRight, color: "bg-destructive/10 text-destructive" },
  SWAP: { icon: Repeat, color: "bg-violet-500/10 text-violet-500" },
  DEPOSIT: { icon: ArrowDownLeft, color: "bg-success/10 text-success" },
  WITHDRAW: { icon: ArrowUpRight, color: "bg-amber-500/10 text-amber-500" },
  SEND: { icon: ArrowUpRight, color: "bg-destructive/10 text-destructive" },
  RECEIVE: { icon: ArrowDownLeft, color: "bg-success/10 text-success" },
  STAKE: { icon: Coins, color: "bg-primary/10 text-primary" },
  UNSTAKE: { icon: Coins, color: "bg-amber-500/10 text-amber-500" },
  REWARD: { icon: Coins, color: "bg-success/10 text-success" },
};

const STATUS_VARIANT: Record<Transaction["status"], "success" | "warning" | "destructive" | "outline"> = {
  COMPLETED: "success",
  PENDING: "warning",
  FAILED: "destructive",
  CANCELLED: "outline",
};

/** List of the account's most recent activity, linking to the full history. */
export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Recent activity</CardTitle>
        <Link href="/transactions" className="text-sm font-medium text-primary hover:underline">
          View all
        </Link>
      </CardHeader>
      <CardContent className="space-y-1">
        {RECENT_TRANSACTIONS.map((tx) => {
          const meta = TYPE_META[tx.type];
          return (
            <div key={tx.id} className="flex items-center justify-between rounded-lg px-2 py-2.5 hover:bg-accent">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-full", meta.color)}>
                  <meta.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium capitalize">
                    {tx.type.toLowerCase()} · {tx.asset}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(tx.createdAt)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {formatCrypto(tx.amount)} · {formatCurrency(tx.usdValue)}
                </p>
                <Badge variant={STATUS_VARIANT[tx.status]} className="mt-0.5">
                  {tx.status.toLowerCase()}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
