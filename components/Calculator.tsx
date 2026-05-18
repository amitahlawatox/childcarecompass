"use client";

import { useMemo, useState } from "react";
import {
  calculate,
  formatCurrency,
  REGIONS,
  type WeekSchedule,
  type DaySession,
  type WorkingStatus,
  type IncomeBand,
  type FundingModel,
} from "@/lib/funding-rules";
import { CalculatorChart } from "@/components/CalculatorChart";

const DAYS: Array<{ key: keyof WeekSchedule; label: string }> = [
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
];

const SESSIONS: Array<{ value: DaySession; label: string }> = [
  { value: "none", label: "—" },
  { value: "morning", label: "AM" },
  { value: "afternoon", label: "PM" },
  { value: "full", label: "Full day" },
];

export function Calculator() {
  const [ageMonths, setAgeMonths] = useState(18);
  const [regionId, setRegionId] = useState("south-east");
  const [schedule, setSchedule] = useState<WeekSchedule>({
    mon: "full",
    tue: "full",
    wed: "full",
    thu: "none",
    fri: "none",
  });
  const [workingStatus, setWorkingStatus] = useState<WorkingStatus>("both-work");
  const [incomeBand, setIncomeBand] = useState<IncomeBand>("under-100k");
  const [fundingModel, setFundingModel] = useState<FundingModel>("term-time");
  const [hasSalarySacrifice, setHasSalarySacrifice] = useState(false);
  const [view, setView] = useState<"monthly" | "annual">("monthly");

  const result = useMemo(
    () =>
      calculate({
        childAgeMonths: ageMonths,
        regionId,
        schedule,
        workingStatus,
        incomeBand,
        fundingModel,
        hasSalarySacrifice,
      }),
    [ageMonths, regionId, schedule, workingStatus, incomeBand, fundingModel, hasSalarySacrifice]
  );

  const bestScenario = result.scenarios.find(
    (s) => s.key === result.bestScenarioKey
  )!;

  function setDay(day: keyof WeekSchedule, session: DaySession) {
    setSchedule((prev) => ({ ...prev, [day]: session }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* INPUTS */}
      <div className="space-y-8 lg:col-span-7">
        {/* 1. Child age */}
        <Field
          number="1"
          title="How old is your child?"
          hint="Funding eligibility starts at 9 months and changes at age 3."
        >
          <div className="rounded-xl border border-border bg-bg p-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[0.88rem] text-muted">Age</span>
              <span className="font-display text-[1.4rem] font-medium tracking-tight-display text-ink">
                {formatAge(ageMonths)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={59}
              value={ageMonths}
              onChange={(e) => setAgeMonths(Number(e.target.value))}
              className="mt-3 w-full accent-accent"
              aria-label="Child age in months"
            />
            <div className="mt-1 flex justify-between text-[0.72rem] text-muted">
              <span>Newborn</span>
              <span>Starting school</span>
            </div>
          </div>
        </Field>

        {/* 2. Working situation */}
        <Field
          number="2"
          title="Your working situation"
          hint="30 funded hours and Tax-Free Childcare need working parents."
        >
          <SegmentedControl
            value={workingStatus}
            onChange={(v) => setWorkingStatus(v as WorkingStatus)}
            options={[
              { value: "both-work", label: "Both parents work" },
              { value: "one-works", label: "One parent works" },
              { value: "neither-works", label: "Neither / single, not working" },
            ]}
          />
        </Field>

        {/* 3. Household income */}
        <Field
          number="3"
          title="Household income"
          hint="If either parent earns over £100,000, funded hours and Tax-Free Childcare are withdrawn."
        >
          <SegmentedControl
            value={incomeBand}
            onChange={(v) => setIncomeBand(v as IncomeBand)}
            options={[
              { value: "under-100k", label: "Both under £100k" },
              { value: "over-100k", label: "One earns £100k+" },
            ]}
          />
        </Field>

        {/* 4. Region */}
        <Field
          number="4"
          title="Where do you live?"
          hint="We apply the average nursery rate for your region."
        >
          <select
            value={regionId}
            onChange={(e) => setRegionId(e.target.value)}
            className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-[1rem] text-ink focus:border-accent focus:outline-none"
          >
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </Field>

        {/* 5. Funding model */}
        <Field
          number="5"
          title="Funding model"
          hint="Ask your nursery which they use. Term-time stretches funded hours over 38 weeks; stretched spreads them over the whole year."
        >
          <SegmentedControl
            value={fundingModel}
            onChange={(v) => setFundingModel(v as FundingModel)}
            options={[
              { value: "term-time", label: "Term-time (38 weeks)" },
              { value: "stretched", label: "Stretched (52 weeks)" },
            ]}
          />
        </Field>

        {/* 6. Weekly schedule */}
        <Field
          number="6"
          title="Your weekly schedule"
          hint="Tap the sessions your child attends. A morning or afternoon counts as a half day."
        >
          <div className="space-y-2">
            {DAYS.map(({ key, label }) => (
              <div
                key={key}
                className="flex items-center gap-3 rounded-xl border border-border bg-bg px-3 py-2.5"
              >
                <span className="w-[5.5rem] flex-shrink-0 text-[0.9rem] font-medium text-ink">
                  {label}
                </span>
                <div className="grid flex-1 grid-cols-4 gap-1.5">
                  {SESSIONS.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setDay(key, s.value)}
                      className={`rounded-lg py-2 text-[0.82rem] transition-all ${
                        schedule[key] === s.value
                          ? "bg-accent text-bg"
                          : "bg-surface text-muted hover:bg-accent-soft hover:text-ink"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[0.85rem] text-muted">
            {result.daysPerWeek} {result.daysPerWeek === 1 ? "day" : "days"} ·{" "}
            {result.hoursPerWeek} hours per week
          </p>
        </Field>

        {/* 7. Salary sacrifice */}
        <Field
          number="7"
          title="Salary sacrifice access"
          hint="The childcare-voucher scheme closed to new joiners in October 2018. Only tick this if you joined before then, or your employer runs a workplace nursery scheme."
        >
          <SegmentedControl
            value={hasSalarySacrifice ? "yes" : "no"}
            onChange={(v) => setHasSalarySacrifice(v === "yes")}
            options={[
              { value: "no", label: "No salary sacrifice" },
              { value: "yes", label: "Yes, I have access" },
            ]}
          />
        </Field>
      </div>

      {/* RESULTS — sticky on desktop */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-6 space-y-5">
          {/* Headline result */}
          <div className="rounded-2xl border border-accent/30 bg-accent-soft p-6 lg:p-7">
            <p className="text-[0.78rem] font-medium uppercase tracking-[0.12em] text-accent-deep">
              Your estimated {view === "monthly" ? "monthly" : "annual"} bill
            </p>
            <p className="mt-2 font-display text-[3rem] font-light leading-none tracking-tight-display text-ink">
              {formatCurrency(
                view === "monthly"
                  ? bestScenario.monthlyBill
                  : bestScenario.annualBill
              )}
            </p>
            <p className="mt-2 text-[0.9rem] text-muted">
              Best option for you: {bestScenario.label.toLowerCase()}
            </p>

            {/* Monthly / Annual toggle */}
            <div className="mt-4 inline-flex rounded-full border border-border bg-surface p-0.5">
              {(["monthly", "annual"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`rounded-full px-4 py-1.5 text-[0.82rem] font-medium capitalize transition-all ${
                    view === v ? "bg-accent text-bg" : "text-muted hover:text-ink"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison chart */}
          <div className="rounded-2xl border border-border bg-surface p-5 lg:p-6">
            <p className="mb-1 font-display text-[1.05rem] font-medium tracking-tight-display text-ink">
              Compare your options
            </p>
            <p className="mb-3 text-[0.82rem] text-muted">
              {view === "monthly" ? "Monthly" : "Annual"} cost under each funding route
            </p>
            <CalculatorChart
              scenarios={result.scenarios}
              bestKey={result.bestScenarioKey}
              view={view}
            />
          </div>

          {/* Breakdown */}
          <div className="rounded-2xl border border-border bg-surface p-5 lg:p-6">
            <p className="mb-3 font-display text-[1.05rem] font-medium tracking-tight-display text-ink">
              How we got there
            </p>
            <div className="space-y-2 text-[0.92rem]">
              {result.breakdown.map((row, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between ${
                    row.type === "total"
                      ? "border-t border-border pt-2.5 mt-1"
                      : ""
                  }`}
                >
                  <span
                    className={
                      row.type === "saving"
                        ? "text-accent"
                        : row.type === "total"
                        ? "font-medium text-ink"
                        : "text-muted"
                    }
                  >
                    {row.label}
                  </span>
                  <span
                    className={`tabular-nums ${
                      row.type === "saving"
                        ? "text-accent"
                        : row.type === "total"
                        ? "font-display text-[1.15rem] text-ink"
                        : "text-ink"
                    }`}
                  >
                    {formatCurrency(row.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility badges */}
          <div className="flex flex-wrap gap-2">
            <Badge
              on={result.eligibility.fundedHoursPerWeek > 0}
              label={
                result.eligibility.fundedHoursPerWeek > 0
                  ? `${result.eligibility.fundedHoursPerWeek} funded hours`
                  : "No funded hours"
              }
            />
            <Badge
              on={result.eligibility.taxFreeChildcare}
              label="Tax-Free Childcare"
            />
            {hasSalarySacrifice && (
              <Badge on label="Salary sacrifice" />
            )}
          </div>

          {/* Notes */}
          <div className="rounded-2xl border border-border bg-bg p-5">
            <p className="text-[0.78rem] font-medium uppercase tracking-[0.1em] text-muted">
              Things to know
            </p>
            <ul className="mt-3 space-y-2 text-[0.86rem] leading-relaxed text-muted">
              {result.notes.map((note, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-1.5 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SUB-COMPONENTS
// -----------------------------------------------------------------------------

function Field({
  number,
  title,
  hint,
  children,
}: {
  number: string;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline gap-2.5">
        <span className="font-display text-[0.9rem] font-medium text-accent">
          {number}
        </span>
        <div>
          <h3 className="font-display text-[1.15rem] font-medium tracking-tight-display text-ink">
            {title}
          </h3>
        </div>
      </div>
      {children}
      <p className="mt-2.5 text-[0.82rem] leading-relaxed text-muted">{hint}</p>
    </div>
  );
}

function SegmentedControl({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-lg border px-3 py-2.5 text-[0.86rem] transition-all ${
            value === opt.value
              ? "border-accent bg-accent-soft text-ink"
              : "border-border bg-surface text-muted hover:border-ink/30 hover:text-ink"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Badge({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.82rem] ${
        on
          ? "border-accent/30 bg-accent-soft text-accent-deep"
          : "border-border bg-surface text-muted"
      }`}
    >
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${
          on ? "bg-accent" : "bg-muted/50"
        }`}
      />
      {label}
    </span>
  );
}

function formatAge(months: number): string {
  if (months < 12) return `${months} ${months === 1 ? "month" : "months"}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const y = `${years} ${years === 1 ? "year" : "years"}`;
  if (rem === 0) return y;
  return `${y}, ${rem} ${rem === 1 ? "month" : "months"}`;
}
