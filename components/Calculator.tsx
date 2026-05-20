"use client";

import { useMemo, useState } from "react";
import {
  calculate,
  formatCurrency,
  REGIONS,
  VOUCHER_BAND_DETAILS,
  type WeekSchedule,
  type DaySession,
  type WorkingStatus,
  type IncomeBand,
  type FundingModel,
  type SalaryTaxBand,
} from "@/lib/funding-rules";
import { CalculatorChart } from "@/components/CalculatorChart";
import { ScenarioComparison } from "@/components/ScenarioComparison";
import { useCountUp } from "@/lib/use-count-up";

const DAYS: Array<{ key: keyof WeekSchedule; label: string; short: string }> = [
  { key: "mon", label: "Monday", short: "Mon" },
  { key: "tue", label: "Tuesday", short: "Tue" },
  { key: "wed", label: "Wednesday", short: "Wed" },
  { key: "thu", label: "Thursday", short: "Thu" },
  { key: "fri", label: "Friday", short: "Fri" },
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
  const [salaryTaxBand, setSalaryTaxBand] = useState<SalaryTaxBand>("basic");
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
        salaryTaxBand,
      }),
    [
      ageMonths,
      regionId,
      schedule,
      workingStatus,
      incomeBand,
      fundingModel,
      hasSalarySacrifice,
      salaryTaxBand,
    ]
  );

  const bestScenario = result.scenarios.find(
    (s) => s.key === result.bestScenarioKey
  )!;
  const fullScenario = result.scenarios.find((s) => s.key === "full")!;

  // Headline figures
  const headlineBill =
    view === "monthly" ? bestScenario.monthlyBill : bestScenario.annualBill;
  const fullBill =
    view === "monthly" ? fullScenario.monthlyBill : fullScenario.annualBill;
  const saving = Math.max(fullBill - headlineBill, 0);
  const savingPct = fullBill > 0 ? Math.round((saving / fullBill) * 100) : 0;

  // Animated values
  const animatedBill = useCountUp(headlineBill);
  const animatedSaving = useCountUp(saving);

  function setDay(day: keyof WeekSchedule, session: DaySession) {
    setSchedule((prev) => ({ ...prev, [day]: session }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* INPUTS */}
      <div className="space-y-8 lg:col-span-7">
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

        <Field
          number="5"
          title="Funding model"
          hint="Ask your nursery which they use. Term-time spreads funded hours over 38 weeks; stretched spreads them over the whole year."
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

        <Field
          number="6"
          title="Your weekly schedule"
          hint="Tap the sessions your child attends. A morning or afternoon counts as a half day."
        >
          <div className="space-y-2">
            {DAYS.map(({ key, label, short }) => (
              <div
                key={key}
                className="flex items-center gap-3 rounded-xl border border-border bg-bg px-3 py-2.5"
              >
                <span className="w-[3rem] flex-shrink-0 text-[0.9rem] font-medium text-ink sm:w-[5.5rem]">
                  <span className="sm:hidden">{short}</span>
                  <span className="hidden sm:inline">{label}</span>
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

        <Field
          number="7"
          title="Salary sacrifice access"
          hint="The childcare-voucher scheme closed to new joiners in October 2018. Only tick this if you joined before then, or your employer runs a workplace nursery scheme. It cannot be combined with Tax-Free Childcare."
        >
          <SegmentedControl
            value={hasSalarySacrifice ? "yes" : "no"}
            onChange={(v) => setHasSalarySacrifice(v === "yes")}
            options={[
              { value: "no", label: "No salary sacrifice" },
              { value: "yes", label: "Yes, I have access" },
            ]}
          />

          {/* Conditional tax-band selector — only when salary sacrifice is on.
              The cap and the saving rate both depend on the parent's tax band,
              so the net effective cost of nursery changes meaningfully here. */}
          {hasSalarySacrifice && (
            <div className="mt-4 animate-fade-in-up rounded-xl border border-accent/30 bg-accent-soft/40 p-4">
              <p className="text-[0.86rem] font-medium text-ink">
                Your tax band (of the parent doing salary sacrifice)
              </p>
              <p className="mb-3 mt-1 text-[0.78rem] leading-relaxed text-muted">
                Salary sacrifice saves you the tax + National Insurance you&apos;d
                otherwise pay on the sacrificed amount — so the actual saving
                scales with your income.
              </p>
              <div className="grid gap-1.5 sm:grid-cols-3">
                {(["basic", "higher", "additional"] as SalaryTaxBand[]).map((band) => {
                  const d = VOUCHER_BAND_DETAILS[band];
                  const isActive = salaryTaxBand === band;
                  const salaryRange =
                    d.salaryTo === null
                      ? `over £${d.salaryFrom.toLocaleString("en-GB")}`
                      : `£${d.salaryFrom.toLocaleString("en-GB")}–£${d.salaryTo.toLocaleString("en-GB")}`;
                  return (
                    <button
                      key={band}
                      type="button"
                      onClick={() => setSalaryTaxBand(band)}
                      className={`rounded-lg border px-3 py-3 text-left transition-all ${
                        isActive
                          ? "border-accent bg-surface"
                          : "border-border bg-surface hover:border-ink/30"
                      }`}
                    >
                      <span
                        className={`block text-[0.84rem] font-medium capitalize ${
                          isActive ? "text-ink" : "text-muted"
                        }`}
                      >
                        {band} rate
                      </span>
                      <span className="block text-[0.72rem] text-muted">
                        Salary {salaryRange}
                      </span>
                      <span className="mt-1.5 block text-[0.72rem] tabular-nums text-accent-deep">
                        {Math.round(d.savingRate * 100)}% saving · £
                        {d.monthlyCap}/mo cap
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </Field>
      </div>

      {/* RESULTS — sticky on desktop */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-6 space-y-5 animate-fade-in-up">
          {/* Savings hero */}
          {saving > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent-soft to-warmth-soft/40 p-6 lg:p-7">
              <p className="text-[0.78rem] font-medium uppercase tracking-[0.12em] text-accent-deep">
                You could save
              </p>
              <p className="mt-1.5 font-display text-[2.8rem] font-light leading-none tracking-tight-display text-ink">
                {formatCurrency(Math.round(animatedSaving))}
              </p>
              <p className="mt-2 text-[0.92rem] text-ink">
                a {view === "monthly" ? "month" : "year"} —{" "}
                <span className="font-medium text-accent-deep">
                  {savingPct}% less
                </span>{" "}
                than the full advertised price.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-[0.92rem] text-muted">
                On these answers, no government funding applies yet. Adjust your
                child&apos;s age or working situation to see what you could save.
              </p>
            </div>
          )}

          {/* Headline bill */}
          <div className="rounded-2xl border border-border bg-surface p-6 lg:p-7">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[0.78rem] font-medium uppercase tracking-[0.12em] text-muted">
                Your estimated {view === "monthly" ? "monthly" : "annual"} bill
              </p>
              <div className="inline-flex rounded-full border border-border bg-bg p-0.5">
                {(["monthly", "annual"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    className={`rounded-full px-3 py-1 text-[0.78rem] font-medium capitalize transition-all ${
                      view === v ? "bg-accent text-bg" : "text-muted hover:text-ink"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-2 font-display text-[3rem] font-light leading-none tracking-tight-display text-ink">
              {formatCurrency(Math.round(animatedBill))}
            </p>
            <p className="mt-2 text-[0.9rem] text-muted">
              Best route for you: {bestScenario.label.toLowerCase()}
            </p>
          </div>

          {/* Cumulative comparison chart */}
          <div className="rounded-2xl border border-border bg-surface p-5 lg:p-6">
            <p className="font-display text-[1.05rem] font-medium tracking-tight-display text-ink">
              How the cost adds up over a year
            </p>
            <p className="mb-3 mt-0.5 text-[0.82rem] text-muted">
              Each line is a funding route. The wider the gap, the more you keep.
            </p>
            <CalculatorChart scenarios={result.scenarios} />
          </div>

          {/* Scenario comparison summary */}
          <div className="rounded-2xl border border-border bg-surface p-5 lg:p-6">
            <p className="mb-4 font-display text-[1.05rem] font-medium tracking-tight-display text-ink">
              Compare your options side by side
            </p>
            <ScenarioComparison
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
            {hasSalarySacrifice && <Badge on label="Salary sacrifice" />}
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
        <h3 className="font-display text-[1.15rem] font-medium tracking-tight-display text-ink">
          {title}
        </h3>
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
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
    >
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
