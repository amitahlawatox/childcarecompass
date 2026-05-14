"use client";

import { useMemo, useState } from "react";
import {
  calculate,
  formatCurrency,
  UK_AVERAGE_HOURLY,
  type CalculatorInputs,
  type WorkingStatus,
  type IncomeBand,
  type FundingModel,
} from "@/lib/funding-rules";

type AgeBracket = "under-9m" | "9m-2y" | "2y-3y" | "3y-4y" | "over-4y";

const AGE_OPTIONS: { value: AgeBracket; label: string; months: number }[] = [
  { value: "under-9m", label: "Under 9 months", months: 6 },
  { value: "9m-2y", label: "9 months – 2 years", months: 18 },
  { value: "2y-3y", label: "2 – 3 years", months: 30 },
  { value: "3y-4y", label: "3 – 4 years", months: 42 },
  { value: "over-4y", label: "Over 4 years", months: 60 },
];

export function Calculator() {
  const [ageBracket, setAgeBracket] = useState<AgeBracket>("9m-2y");
  const [hourlyRate, setHourlyRate] = useState<number>(8.20);
  const [useAverage, setUseAverage] = useState<boolean>(true);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [workingStatus, setWorkingStatus] = useState<WorkingStatus>("both-work");
  const [incomeBand, setIncomeBand] = useState<IncomeBand>("under-100k");
  const [fundingModel, setFundingModel] = useState<FundingModel>("term-time");

  // When "use average" is on, snap rate to UK average for that age
  const childAgeMonths = AGE_OPTIONS.find((o) => o.value === ageBracket)?.months ?? 18;

  const effectiveRate = useMemo(() => {
    if (!useAverage) return hourlyRate;
    if (childAgeMonths < 24) return UK_AVERAGE_HOURLY.under2;
    if (childAgeMonths < 36) return UK_AVERAGE_HOURLY.twoYear;
    return UK_AVERAGE_HOURLY.threePlus;
  }, [useAverage, hourlyRate, childAgeMonths]);

  const inputs: CalculatorInputs = {
    childAgeMonths,
    hourlyRate: effectiveRate,
    hoursPerWeek,
    workingStatus,
    incomeBand,
    fundingModel,
  };

  const result = useMemo(() => calculate(inputs), [
    childAgeMonths,
    effectiveRate,
    hoursPerWeek,
    workingStatus,
    incomeBand,
    fundingModel,
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      {/* Inputs column */}
      <form className="lg:col-span-7 space-y-7" onSubmit={(e) => e.preventDefault()}>
        <FieldGroup
          label="How old is your child?"
          hint="Funding eligibility depends on your child's age."
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {AGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAgeBracket(opt.value)}
                className={`rounded-lg border px-4 py-3 text-left text-[0.92rem] transition-all ${
                  ageBracket === opt.value
                    ? "border-accent bg-accent-soft text-ink"
                    : "border-border bg-surface text-muted hover:border-ink/30 hover:text-ink"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </FieldGroup>

        <FieldGroup
          label="Hours of childcare needed per week"
          hint={`${hoursPerWeek} hours — about ${(hoursPerWeek / 8).toFixed(1)} full days at 8 hours each.`}
        >
          <div className="space-y-3">
            <input
              type="range"
              min={5}
              max={50}
              step={1}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
            />
            <div className="flex justify-between text-[0.78rem] text-muted">
              <span>5</span><span>15</span><span>25</span><span>35</span><span>50 hrs</span>
            </div>
          </div>
        </FieldGroup>

        <FieldGroup
          label="Hourly rate at your nursery"
          hint={
            useAverage
              ? `Using UK average for this age: £${effectiveRate.toFixed(2)}/hour.`
              : "Tip: most nurseries publish hourly rates on their fees page."
          }
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-lg text-muted">£</span>
              <input
                type="number"
                min={3}
                max={20}
                step={0.10}
                value={effectiveRate.toFixed(2)}
                disabled={useAverage}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-32 rounded-lg border border-border bg-surface px-3 py-2.5 text-[0.95rem] tabular-nums focus:border-accent focus:outline-none disabled:opacity-60"
              />
              <span className="text-[0.88rem] text-muted">per hour</span>
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 text-[0.88rem] text-muted">
              <input
                type="checkbox"
                checked={useAverage}
                onChange={(e) => setUseAverage(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-accent"
              />
              I don&apos;t know — use UK average for this age
            </label>
          </div>
        </FieldGroup>

        <FieldGroup label="Your working situation">
          <div className="grid gap-2">
            {[
              { v: "both-work", l: "Both parents work (or single working parent)" },
              { v: "one-works", l: "Only one parent works" },
              { v: "neither-works", l: "Neither parent currently works" },
            ].map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => setWorkingStatus(opt.v as WorkingStatus)}
                className={`rounded-lg border px-4 py-3 text-left text-[0.92rem] transition-all ${
                  workingStatus === opt.v
                    ? "border-accent bg-accent-soft text-ink"
                    : "border-border bg-surface text-muted hover:border-ink/30 hover:text-ink"
                }`}
              >
                {opt.l}
              </button>
            ))}
          </div>
        </FieldGroup>

        <FieldGroup
          label="Household income"
          hint="If either parent earns over £100,000, you lose funding entitlements."
        >
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: "under-100k", l: "Both under £100k" },
              { v: "over-100k", l: "One earns over £100k" },
            ].map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => setIncomeBand(opt.v as IncomeBand)}
                className={`rounded-lg border px-4 py-3 text-left text-[0.92rem] transition-all ${
                  incomeBand === opt.v
                    ? "border-accent bg-accent-soft text-ink"
                    : "border-border bg-surface text-muted hover:border-ink/30 hover:text-ink"
                }`}
              >
                {opt.l}
              </button>
            ))}
          </div>
        </FieldGroup>

        <FieldGroup
          label="Funding model used by your nursery"
          hint="Ask your nursery — most use term-time, some offer stretched."
        >
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: "term-time", l: "Term-time (38 wks)" },
              { v: "stretched", l: "Stretched (52 wks)" },
            ].map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => setFundingModel(opt.v as FundingModel)}
                className={`rounded-lg border px-4 py-3 text-left text-[0.92rem] transition-all ${
                  fundingModel === opt.v
                    ? "border-accent bg-accent-soft text-ink"
                    : "border-border bg-surface text-muted hover:border-ink/30 hover:text-ink"
                }`}
              >
                {opt.l}
              </button>
            ))}
          </div>
        </FieldGroup>
      </form>

      {/* Result column — sticky on desktop */}
      <aside className="lg:col-span-5">
        <div className="sticky top-8 rounded-2xl border border-border bg-surface p-7 shadow-[0_8px_30px_-12px_rgba(45,74,62,0.12)] sm:p-9">
          <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
            Your estimated monthly bill
          </p>
          <p className="mt-3 font-display text-[3.5rem] font-light leading-none tracking-tight-display text-ink numeric-display sm:text-[4.2rem]">
            {formatCurrency(result.netMonthly)}
          </p>
          <p className="mt-2 text-[0.88rem] text-muted">
            per month, including all funding you appear eligible for.
          </p>

          <div className="mt-7 space-y-3 border-t border-border pt-5">
            {result.breakdown.map((row, i) => (
              <div
                key={i}
                className={`flex items-center justify-between text-[0.95rem] ${
                  row.type === "total"
                    ? "border-t border-border pt-3 mt-2 font-medium"
                    : ""
                }`}
              >
                <span
                  className={
                    row.type === "saving" ? "text-accent" : "text-ink"
                  }
                >
                  {row.label}
                </span>
                <span
                  className={`tabular-nums ${
                    row.type === "saving" ? "text-accent" : "text-ink"
                  }`}
                >
                  {formatCurrency(row.amount)}
                </span>
              </div>
            ))}
          </div>

          {result.notes.length > 0 && (
            <div className="mt-6 space-y-2.5 rounded-xl bg-bg p-4 text-[0.85rem] leading-relaxed text-muted">
              {result.notes.map((note, i) => (
                <p key={i} className="flex gap-2">
                  <span className="mt-1 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  <span>{note}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function FieldGroup({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-display text-[1.15rem] font-medium tracking-tight-display text-ink">
        {label}
      </label>
      {hint && <p className="mt-1 text-[0.88rem] text-muted">{hint}</p>}
      <div className="mt-3">{children}</div>
    </div>
  );
}
