import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Rendered by Next.js for any route that doesn't match a page. */
export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Compass className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-2">
        <h1 className="text-5xl font-bold gradient-text">404</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </div>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
