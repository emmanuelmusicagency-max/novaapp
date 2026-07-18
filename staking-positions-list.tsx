import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STAKING_POSITIONS } from "@/lib/invest-data";
import { formatCrypto } from "@/lib/utils";

/** List of the user's active and locked staking positions. */
export function StakingPositionsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Your staking positions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {STAKING_POSITIONS.map((position) => (
          <div
            key={position.id}
            className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">{position.asset}</p>
                <Badge variant={position.lockPeriodDays > 0 ? "warning" : "success"}>
                  {position.lockPeriodDays > 0 ? `${position.lockPeriodDays}-day lock` : "Flexible"}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Staked {formatCrypto(position.amount)} {position.asset} · {position.apy}% APY
              </p>
              <p className="text-xs text-muted-foreground">
                Since {new Date(position.startDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-success">
                  +{formatCrypto(position.rewardsEarned)} {position.asset}
                </p>
                <p className="text-xs text-muted-foreground">Rewards earned</p>
              </div>
              <Button variant="outline" size="sm">
                Unstake
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
