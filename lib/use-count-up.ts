"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useCountUp — smoothly animates a displayed number toward a target value.
 *
 * When `target` changes, the hook eases the displayed value from wherever it
 * currently is to the new target over `durationMs`, using an ease-out curve.
 * This gives the calculator's headline figures a premium, "alive" feel as the
 * user changes their inputs.
 */
export function useCountUp(target: number, durationMs = 650): number {
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);
  displayRef.current = display;

  useEffect(() => {
    const from = displayRef.current;
    const delta = target - from;

    // Tiny change — snap, don't animate
    if (Math.abs(delta) < 0.5) {
      setDisplay(target);
      return;
    }

    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / durationMs, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      if (t < 1) {
        setDisplay(from + delta * eased);
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return display;
}
