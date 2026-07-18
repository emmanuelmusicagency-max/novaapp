import { Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NEWS = [
  {
    title: "Institutional inflows into spot Bitcoin products hit new highs",
    source: "NovaBank Research",
    time: "2h ago",
  },
  {
    title: "Ethereum staking participation rate climbs past 30%",
    source: "NovaBank Research",
    time: "5h ago",
  },
  {
    title: "Regulators outline new custody guidance for digital asset banks",
    source: "NovaBank Research",
    time: "1d ago",
  },
  {
    title: "Layer-2 transaction volume surpasses mainnet for third straight month",
    source: "NovaBank Research",
    time: "2d ago",
  },
];

/** Curated crypto market news feed. */
export function CryptoNewsFeed() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <Newspaper className="h-4 w-4 text-muted-foreground" />
        <CardTitle className="text-base font-semibold">Market news</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {NEWS.map((item) => (
          <div key={item.title} className="border-b border-border pb-4 last:border-0 last:pb-0">
            <p className="text-sm font-medium leading-snug hover:text-primary">{item.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {item.source} · {item.time}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
