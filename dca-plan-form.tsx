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
import { AssetSelect } from "@/components/wallet/asset-select";
import { dcaPlanSchema, type DcaPlanInput } from "@/lib/validations/invest";

/** Form for creating a new recurring dollar-cost averaging plan. */
export function DcaPlanForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DcaPlanInput>({
    resolver: zodResolver(dcaPlanSchema),
    defaultValues: { asset: "BTC", amountUsd: 100, frequency: "WEEKLY" },
  });

  const asset = watch("asset");

  async function onSubmit(values: DcaPlanInput) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/invest/dca", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message ?? "Unable to create DCA plan");
        return;
      }

      toast.success(`DCA plan created: $${values.amountUsd} ${values.frequency.toLowerCase()} into ${values.asset}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">New DCA plan</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label>Asset</Label>
            <AssetSelect value={asset} onChange={(v) => setValue("asset", v)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amountUsd">Amount per purchase (USD)</Label>
            <Input id="amountUsd" type="number" step="0.01" min="1" {...register("amountUsd")} />
            {errors.amountUsd && (
              <p className="text-sm text-destructive">{errors.amountUsd.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select
              defaultValue="WEEKLY"
              onValueChange={(v) => setValue("frequency", v as DcaPlanInput["frequency"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DAILY">Daily</SelectItem>
                <SelectItem value="WEEKLY">Weekly</SelectItem>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Create plan
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
