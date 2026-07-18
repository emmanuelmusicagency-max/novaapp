"use client";

import { useCallback, useState } from "react";

/** Copies text to the clipboard and exposes a transient `copied` flag. */
export function useClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), resetMs);
        return true;
      } catch {
        setCopied(false);
        return false;
      }
    },
    [resetMs]
  );

  return { copied, copy };
}
