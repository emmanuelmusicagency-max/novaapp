import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DCA_PLANS } from "@/lib/invest-data";
import { formatCurrency } from "@/lib/utils";

/** List of the user's existing DCA automation plans. */
export function DcaPlansList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Your DCA plans</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {DCA_PLANS.map((plan) => (
          <div
            key={plan.id}
            className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">{plan.asset}</p>
                <Badge variant="outline">{plan.frequency.toLowerCase()}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatCurrency(plan.amountUsd)} per purchase · Next run{" "}
                {new Date(plan.nextRunDate).toLocaleDateString()}
              </p>
            </div>
            <Switch defaultChecked={plan.active} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
