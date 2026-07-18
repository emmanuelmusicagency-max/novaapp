"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { stakeSchema, type StakeInput } from "@/lib/validations/invest";
import { STAKING_ASSETS } from "@/lib/invest-data";

/** Form to open a new staking position for a supported asset. */
export function StakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StakeInput>({
    resolver: zodResolver(stakeSchema),
    defaultValues: { asset: "ETH", amount: 1, lockPeriodDays: 0 },
  });

  const asset = watch("asset");
  const amount = watch("amount") || 0;
  const selectedAsset = STAKING_ASSETS.find((a) => a.symbol === asset);
  const estimatedAnnualReward = selectedAsset ? (amount * selectedAsset.apy) / 100 : 0;

  async function onSubmit(values: StakeInput) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/invest/stake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message ?? "Unable to open staking position");
        return;
      }

      toast.success(`Staked ${values.amount} ${values.asset}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Stake an asset</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label>Asset</Label>
            <Select value={asset} onValueChange={(v) => setValue("asset", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STAKING_ASSETS.map((a) => (
                  <SelectItem key={a.symbol} value={a.symbol}>
                    {a.symbol} — {a.apy}% APY
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" step="any" min="0" {...register("amount")} />
            {errors.amount && <p className="text-sm text-destructive">{errors.amount.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Lock period</Label>
            <Select
              defaultValue="0"
              onValueChange={(v) => setValue("lockPeriodDays", Number(v))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Flexible (no lock)</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg bg-muted/50 p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current APY</span>
              <span className="font-medium">{selectedAsset?.apy}%</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-muted-foreground">Estimated annual reward</span>
              <span className="font-medium">
                {estimatedAnnualReward.toFixed(4)} {asset}
              </span>
            </div>
          </div>

          <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Stake {asset}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
