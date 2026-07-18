"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Global error boundary. Next.js renders this automatically when an
 * uncaught error is thrown anywhere in the route segment tree below it.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this should report to an error tracking service
    // (e.g. Sentry). Logged to console here for the demo scaffold.
    console.error("NovaBank runtime error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          An unexpected error occurred while loading this page. Your funds
          and account data are unaffected. You can try again below.
        </p>
      </div>
      <Button onClick={() => reset()} className="gap-2">
        <RotateCcw className="h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}
