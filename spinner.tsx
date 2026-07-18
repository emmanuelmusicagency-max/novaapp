import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const SIZE_MAP = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-10 w-10" };

/** Standard loading spinner, optionally with a label, for inline or full-block use. */
export function Spinner({ size = "md", className, label }: SpinnerProps) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Loader2 className={cn("animate-spin text-primary", SIZE_MAP[size], className)} />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}

/** Full-block centered loading state, for use inside cards or panels. */
export function BlockSpinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <Spinner size="lg" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
