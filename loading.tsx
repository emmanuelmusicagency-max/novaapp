import { Loader2 } from "lucide-react";

/**
 * Global loading fallback shown by Next.js while a route segment's data
 * is being fetched. Kept minimal and brand-consistent.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-background">
      <div className="flex items-center gap-2 text-2xl font-bold gradient-text">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        NovaBank
      </div>
      <p className="text-sm text-muted-foreground">Loading your experience…</p>
    </div>
  );
}
