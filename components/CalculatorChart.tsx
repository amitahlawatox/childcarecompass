"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import type { Scenario } from "@/lib/funding-rules";

interface CalculatorChartProps {
  scenarios: Scenario[];
  bestKey: Scenario["key"];
  view: "monthly" | "annual";
}

const COLORS: Record<Scenario["key"], string> = {
  full: "#A9A29A", // muted — the "scary" full price
  funded: "#A9C5D4", // soft sky
  "funded-tfc": "#6B8E72", // sage — usually the best
  "funded-voucher": "#E8A87C", // peach — alternative
};

const BEST_COLOR = "#4A6B51"; // deep sage for the winning bar

export function CalculatorChart({
  scenarios,
  bestKey,
  view,
}: CalculatorChartProps) {
  const data = scenarios
    .filter((s) => s.available)
    .map((s) => ({
      key: s.key,
      name: s.shortLabel,
      value: view === "monthly" ? s.monthlyBill : s.annualBill,
      isBest: s.key === bestKey,
    }));

  if (data.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-xl border border-dashed border-border text-center">
        <p className="px-6 text-[0.92rem] text-muted">
          Fill in your details and your cost comparison will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 28, right: 12, bottom: 4, left: 12 }}
          barCategoryGap="22%"
        >
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#6B7268" }}
            tickLine={false}
            axisLine={{ stroke: "#E8E1D3" }}
            interval={0}
          />
          <YAxis hide />
          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
            isAnimationActive
            animationDuration={650}
            animationEasing="ease-out"
          >
            {data.map((entry) => (
              <Cell
                key={entry.key}
                fill={entry.isBest ? BEST_COLOR : COLORS[entry.key as Scenario["key"]]}
              />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              formatter={(v: React.ReactNode) =>
                `£${Math.round(Number(v)).toLocaleString("en-GB")}`
              }
              style={{ fontSize: 13, fontWeight: 600, fill: "#1F2A22" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
