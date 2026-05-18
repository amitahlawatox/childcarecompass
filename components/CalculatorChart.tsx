"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Scenario } from "@/lib/funding-rules";

interface CalculatorChartProps {
  scenarios: Scenario[];
}

/** Colour + display order for each scenario line */
const LINE_META: Record<
  Scenario["key"],
  { color: string; label: string; order: number }
> = {
  full: { color: "#A9A29A", label: "Full advertised price", order: 0 },
  funded: { color: "#A9C5D4", label: "With funded hours", order: 1 },
  "funded-tfc": { color: "#6B8E72", label: "With Tax-Free Childcare", order: 2 },
  "funded-voucher": { color: "#E8A87C", label: "With salary sacrifice", order: 3 },
};

const MONTH_LABELS = [
  "Now",
  "M1",
  "M2",
  "M3",
  "M4",
  "M5",
  "M6",
  "M7",
  "M8",
  "M9",
  "M10",
  "M11",
  "1 yr",
];

export function CalculatorChart({ scenarios }: CalculatorChartProps) {
  const available = scenarios
    .filter((s) => s.available)
    .sort((a, b) => LINE_META[a.key].order - LINE_META[b.key].order);

  if (available.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-border text-center">
        <p className="px-6 text-[0.92rem] text-muted">
          Fill in your details and your cost comparison appears here.
        </p>
      </div>
    );
  }

  // Build 13 points (month 0 → 12) of cumulative spend per scenario
  const data = Array.from({ length: 13 }, (_, month) => {
    const row: Record<string, number | string> = {
      month,
      label: MONTH_LABELS[month],
    };
    for (const s of available) {
      row[s.key] = Math.round((s.annualBill / 12) * month);
    }
    return row;
  });

  return (
    <div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: -8 }}>
            <CartesianGrid stroke="#E8E1D3" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: "#6B7268" }}
              tickLine={false}
              axisLine={{ stroke: "#E8E1D3" }}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#6B7268" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) =>
                v >= 1000 ? `£${(v / 1000).toFixed(0)}k` : `£${v}`
              }
              width={48}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E8E1D3",
                fontSize: 12,
                fontFamily: "inherit",
              }}
              formatter={(value, name) => [
                `£${Math.round(Number(value)).toLocaleString("en-GB")}`,
                LINE_META[name as Scenario["key"]]?.label ?? String(name),
              ]}
              labelFormatter={(label) => {
                const l = String(label);
                return l === "Now"
                  ? "Today"
                  : l === "1 yr"
                  ? "After 1 year"
                  : `After ${l.replace("M", "")} months`;
              }}
            />
            {available.map((s) => (
              <Line
                key={s.key}
                type="linear"
                dataKey={s.key}
                stroke={LINE_META[s.key].color}
                strokeWidth={s.key === "full" ? 2 : 2.75}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive
                animationDuration={700}
                animationEasing="ease-out"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {available.map((s) => (
          <span
            key={s.key}
            className="inline-flex items-center gap-2 text-[0.8rem] text-muted"
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: LINE_META[s.key].color }}
            />
            {LINE_META[s.key].label}
          </span>
        ))}
      </div>
    </div>
  );
}
