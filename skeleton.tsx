import { cn } from "@/lib/utils";

/** Shimmering placeholder block shown while content is loading. */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };
