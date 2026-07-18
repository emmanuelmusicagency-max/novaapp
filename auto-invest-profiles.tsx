"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AUTO_INVEST_PROFILES } from "@/lib/invest-data";
import { cn } from "@/lib/utils";

/** Lets the user choose a curated auto-invest risk profile. */
export function AutoInvestProfiles() {
  const [selected, setSelected] = useState("BALANCED");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Auto-Invest portfolios</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {AUTO_INVEST_PROFILES.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setSelected(profile.id)}
              className={cn(
                "relative rounded-lg border p-4 text-left transition-colors",
                selected === profile.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-accent"
              )}
            >
              {selected === profile.id && (
                <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </div>
              )}
              <p className="font-semibold">{profile.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{profile.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {profile.allocation.map((a) => (
                  <span key={a.symbol} className="rounded-full bg-muted px-2 py-0.5 text-[11px]">
                    {a.symbol} {a.pct}%
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        <Button
          variant="gradient"
          className="w-full"
          onClick={() => toast.success(`Auto-Invest enabled with the ${selected.toLowerCase()} profile`)}
        >
          Activate Auto-Invest
        </Button>
      </CardContent>
    </Card>
  );
}
