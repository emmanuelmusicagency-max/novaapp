"use client";

import { useEffect, useState } from "react";

/** Counts down from `seconds` to 0, decrementing once per second while active. */
export function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  function start() {
    setRemaining(seconds);
  }

  return { remaining, start, isActive: remaining > 0 };
}
