"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/invest", label: "Overview" },
  { href: "/invest/staking", label: "Staking" },
  { href: "/invest/dca", label: "Auto-Invest & DCA" },
  { href: "/invest/analytics", label: "Analytics" },
];

/** Secondary nav bar for switching between investment product pages. */
export function InvestNav() {
  const pathname = usePathname();

  return (
    <div className="flex gap-1 overflow-x-auto rounded-lg bg-muted p-1">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            pathname === tab.href
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
