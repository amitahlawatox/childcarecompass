"use client";

import type { Scenario } from "@/lib/funding-rules";
import { formatCurrency } from "@/lib/funding-rules";

interface ScenarioComparisonProps {
  scenarios: Scenario[];
  bestKey: Scenario["key"];
  view: "monthly" | "annual";
}

const META: Record<Scenario["key"], { color: string; order: number }> = {
  full: { color: "#A9A29A", order: 0 },
  funded: { color: "#A9C5D4", order: 1 },
  "funded-tfc": { color: "#6B8E72", order: 2 },
  "funded-voucher": { color: "#E8A87C", order: 3 },
};

const BEST_COLOR = "#4A6B51";

/**
 * A horizontal-bar summary comparing every funding route the user qualifies
 * for. Bar widths are proportional to the full ("scariest") price so the
 * savings are immediately legible. The cheapest route is highlighted.
 */
export function ScenarioComparison({
  scenarios,
  bestKey,
  view,
}: ScenarioComparisonProps) {
  const available = scenarios
    .filter((s) => s.available)
    .sort((a, b) => META[a.key].order - META[b.key].order);

  if (available.length === 0) return null;

  const amountOf = (s: Scenario) =>
    view === "monthly" ? s.monthlyBill : s.annualBill;

  // Scale bars against the most expensive scenario (usually "full")
  const maxAmount = Math.max(...available.map(amountOf), 1);

  return (
    <div className="space-y-3.5">
      {available.map((s) => {
        const amount = amountOf(s);
        const widthPct = Math.max((amount / maxAmount) * 100, 4);
        const isBest = s.key === bestKey;
        return (
          <div key={s.key}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span
                className={`text-[0.86rem] ${
                  isBest ? "font-medium text-ink" : "text-muted"
                }`}
              >
                {s.shortLabel}
                {isBest && (
                  <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-accent-deep">
                    Best for you
                  </span>
                )}
              </span>
              <span
                className={`font-display tabular-nums ${
                  isBest
                    ? "text-[1.15rem] font-medium text-accent-deep"
                    : "text-[1rem] text-ink"
                }`}
              >
                {formatCurrency(amount)}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-bg">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${widthPct}%`,
                  background: isBest ? BEST_COLOR : META[s.key].color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
