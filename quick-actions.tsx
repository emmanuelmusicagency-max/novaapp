import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUpFromLine,
  Plus,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ACTIONS = [
  { label: "Buy", href: "/wallet/buy", icon: Plus, color: "bg-primary/10 text-primary" },
  { label: "Send", href: "/wallet/send", icon: Send, color: "bg-sky-500/10 text-sky-500" },
  { label: "Swap", href: "/wallet/swap", icon: ArrowLeftRight, color: "bg-violet-500/10 text-violet-500" },
  { label: "Deposit", href: "/wallet/deposit", icon: ArrowDownToLine, color: "bg-success/10 text-success" },
  { label: "Withdraw", href: "/wallet/withdraw", icon: ArrowUpFromLine, color: "bg-amber-500/10 text-amber-500" },
];

/** Row of shortcut buttons to the most common wallet actions. */
export function QuickActions() {
  return (
    <Card>
      <CardContent className="grid grid-cols-3 gap-3 p-4 sm:grid-cols-5">
        {ACTIONS.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-2 rounded-lg p-3 text-center transition-colors hover:bg-accent"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-full ${action.color}`}>
              <action.icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium">{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
