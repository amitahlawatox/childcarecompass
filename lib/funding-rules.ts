/**
 * UK CHILDCARE FUNDING ENGINE — SINGLE SOURCE OF TRUTH
 *
 * Encodes UK government childcare funding rules and produces a comparison
 * of cost scenarios. When government rules change, update this file and
 * bump RULES_LAST_REVIEWED.
 *
 * IMPORTANT: All outputs are ESTIMATES. The calculator runs entirely in the
 * browser — no inputs are ever sent to a server or stored.
 */

export const RULES_LAST_REVIEWED = "May 2026";

export const SOURCES = {
  freeHours: "https://www.gov.uk/30-hours-free-childcare",
  taxFreeChildcare: "https://www.gov.uk/tax-free-childcare",
  universalCredit: "https://www.gov.uk/universal-credit/what-youll-get",
  govCalculator: "https://www.gov.uk/childcare-calculator",
};

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------

/** Weeks of funded entitlement per year (term-time model) */
export const FUNDED_WEEKS_PER_YEAR = 38;

/** Income cap — above this for either parent, 30 hours + TFC are lost */
export const INCOME_CAP_PER_PARENT = 100000;

/** Tax-Free Childcare: government adds £2 per £8 = 20% top-up */
export const TFC_TOPUP_RATE = 0.2;

/** Tax-Free Childcare cap: £500 per quarter per child = £166.67/month */
export const TFC_MONTHLY_CAP = 500 / 3;

/**
 * Salary sacrifice (childcare vouchers) — basic-rate monthly cap per parent.
 * NOTE: This scheme CLOSED to new entrants in October 2018. Only parents who
 * joined before then (and stayed with the same employer) can use it, OR
 * parents whose employer runs a Workplace Nursery scheme. It is mutually
 * exclusive with Tax-Free Childcare.
 */
export const VOUCHER_MONTHLY_CAP_BASIC = 243;
/** Combined tax + NI saving rate for a basic-rate taxpayer */
export const VOUCHER_SAVING_RATE = 0.32;

/** Average weeks per month for cost averaging */
const WEEKS_PER_MONTH = 4.33;

// -----------------------------------------------------------------------------
// REGIONAL HOURLY RATES
// Estimates derived from the pattern of the Coram Family & Childcare Survey.
// These are AVERAGES — actual nursery fees vary widely within every region.
// When precise survey data is sourced, update only this table.
// -----------------------------------------------------------------------------

export interface Region {
  id: string;
  name: string;
  /** Average hourly rate for a child under 3 (£) */
  hourlyUnder3: number;
  /** Average hourly rate for a child aged 3+ (£) */
  hourly3Plus: number;
}

export const REGIONS: Region[] = [
  { id: "inner-london", name: "Inner London", hourlyUnder3: 10.4, hourly3Plus: 9.6 },
  { id: "outer-london", name: "Outer London", hourlyUnder3: 9.2, hourly3Plus: 8.5 },
  { id: "south-east", name: "South East England", hourlyUnder3: 8.6, hourly3Plus: 7.9 },
  { id: "east-england", name: "East of England", hourlyUnder3: 8.0, hourly3Plus: 7.4 },
  { id: "south-west", name: "South West England", hourlyUnder3: 7.7, hourly3Plus: 7.1 },
  { id: "west-midlands", name: "West Midlands", hourlyUnder3: 7.2, hourly3Plus: 6.7 },
  { id: "east-midlands", name: "East Midlands", hourlyUnder3: 7.0, hourly3Plus: 6.5 },
  { id: "north-west", name: "North West England", hourlyUnder3: 6.9, hourly3Plus: 6.4 },
  { id: "yorkshire", name: "Yorkshire & the Humber", hourlyUnder3: 6.6, hourly3Plus: 6.1 },
  { id: "north-east", name: "North East England", hourlyUnder3: 6.4, hourly3Plus: 6.0 },
  { id: "scotland", name: "Scotland", hourlyUnder3: 6.5, hourly3Plus: 6.0 },
  { id: "wales", name: "Wales", hourlyUnder3: 6.3, hourly3Plus: 5.9 },
  { id: "northern-ireland", name: "Northern Ireland", hourlyUnder3: 6.2, hourly3Plus: 5.8 },
];

export function getRegion(id: string): Region {
  return REGIONS.find((r) => r.id === id) || REGIONS[2]; // default South East
}

// -----------------------------------------------------------------------------
// WEEKLY SCHEDULE
// -----------------------------------------------------------------------------

export type DaySession = "none" | "morning" | "afternoon" | "full";

export type WeekSchedule = {
  mon: DaySession;
  tue: DaySession;
  wed: DaySession;
  thu: DaySession;
  fri: DaySession;
};

/** Hours each session type represents */
const SESSION_HOURS: Record<DaySession, number> = {
  none: 0,
  morning: 5,
  afternoon: 5,
  full: 10,
};

export function weeklyHours(schedule: WeekSchedule): number {
  return (
    SESSION_HOURS[schedule.mon] +
    SESSION_HOURS[schedule.tue] +
    SESSION_HOURS[schedule.wed] +
    SESSION_HOURS[schedule.thu] +
    SESSION_HOURS[schedule.fri]
  );
}

export function daysAttended(schedule: WeekSchedule): number {
  return Object.values(schedule).filter((s) => s !== "none").length;
}

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

export type WorkingStatus = "both-work" | "one-works" | "neither-works";
export type IncomeBand = "under-100k" | "over-100k";
export type FundingModel = "term-time" | "stretched";

export interface CalculatorInputs {
  childAgeMonths: number;
  regionId: string;
  schedule: WeekSchedule;
  workingStatus: WorkingStatus;
  incomeBand: IncomeBand;
  fundingModel: FundingModel;
  /** Does the family have access to childcare-voucher salary sacrifice? */
  hasSalarySacrifice: boolean;
}

export interface Scenario {
  key: "full" | "funded" | "funded-tfc" | "funded-voucher";
  label: string;
  shortLabel: string;
  monthlyBill: number;
  annualBill: number;
  description: string;
  available: boolean;
}

export interface Eligibility {
  fifteenHours: boolean;
  thirtyHours: boolean;
  taxFreeChildcare: boolean;
  fundedHoursPerWeek: number;
}

export interface FullResult {
  hoursPerWeek: number;
  daysPerWeek: number;
  hourlyRate: number;
  grossMonthly: number;
  grossAnnual: number;
  eligibility: Eligibility;
  scenarios: Scenario[];
  /** key of the cheapest available scenario */
  bestScenarioKey: Scenario["key"];
  breakdown: Array<{ label: string; amount: number; type: "cost" | "saving" | "total" }>;
  notes: string[];
}

// -----------------------------------------------------------------------------
// ELIGIBILITY
// -----------------------------------------------------------------------------

function eligible15(ageMonths: number): boolean {
  // Universal entitlement for all 3- and 4-year-olds
  return ageMonths >= 36 && ageMonths < 60;
}

function eligible30(
  ageMonths: number,
  working: WorkingStatus,
  income: IncomeBand
): boolean {
  // Working-parent entitlement: 9 months up to school age (from Sept 2025
  // expansion), both parents working, neither over £100k
  if (ageMonths < 9 || ageMonths >= 60) return false;
  if (working !== "both-work") return false;
  if (income === "over-100k") return false;
  return true;
}

function eligibleTFC(working: WorkingStatus, income: IncomeBand): boolean {
  if (working === "neither-works") return false;
  if (income === "over-100k") return false;
  return true;
}

// -----------------------------------------------------------------------------
// CORE CALCULATION
// -----------------------------------------------------------------------------

export function calculate(inputs: CalculatorInputs): FullResult {
  const {
    childAgeMonths,
    regionId,
    schedule,
    workingStatus,
    incomeBand,
    fundingModel,
    hasSalarySacrifice,
  } = inputs;

  const region = getRegion(regionId);
  const hoursPerWeek = weeklyHours(schedule);
  const daysPerWeek = daysAttended(schedule);
  const hourlyRate =
    childAgeMonths >= 36 ? region.hourly3Plus : region.hourlyUnder3;

  // Eligibility
  const fifteenHours = eligible15(childAgeMonths);
  const thirtyHours = eligible30(childAgeMonths, workingStatus, incomeBand);
  const taxFreeChildcare = eligibleTFC(workingStatus, incomeBand);

  let fundedHoursPerWeek = 0;
  if (thirtyHours) fundedHoursPerWeek = 30;
  else if (fifteenHours) fundedHoursPerWeek = 15;

  const effectiveFundedHours = Math.min(fundedHoursPerWeek, hoursPerWeek);

  // Gross monthly cost
  const grossMonthly = hourlyRate * hoursPerWeek * WEEKS_PER_MONTH;
  const grossAnnual = grossMonthly * 12;

  // Value of funded hours per month
  let fundedDiscountMonthly = 0;
  if (effectiveFundedHours > 0) {
    if (fundingModel === "term-time") {
      fundedDiscountMonthly =
        (effectiveFundedHours * hourlyRate * FUNDED_WEEKS_PER_YEAR) / 12;
    } else {
      const stretchedPerWeek =
        (effectiveFundedHours * FUNDED_WEEKS_PER_YEAR) / 52;
      fundedDiscountMonthly = stretchedPerWeek * hourlyRate * WEEKS_PER_MONTH;
    }
  }

  const afterFunding = Math.max(0, grossMonthly - fundedDiscountMonthly);

  // Tax-Free Childcare: 20% on remaining, capped
  let tfcSaving = 0;
  if (taxFreeChildcare && afterFunding > 0) {
    tfcSaving = Math.min(afterFunding * TFC_TOPUP_RATE, TFC_MONTHLY_CAP);
  }

  // Salary sacrifice (childcare vouchers): saving on the sacrificed amount.
  // Two working parents could each sacrifice; one-works = single cap.
  let voucherSaving = 0;
  if (hasSalarySacrifice && afterFunding > 0) {
    const parents = workingStatus === "both-work" ? 2 : 1;
    const maxSacrifice = Math.min(
      afterFunding,
      VOUCHER_MONTHLY_CAP_BASIC * parents
    );
    voucherSaving = maxSacrifice * VOUCHER_SAVING_RATE;
  }

  // -------- Build the comparison scenarios --------
  const scenarios: Scenario[] = [
    {
      key: "full",
      label: "Full price, no support",
      shortLabel: "Full price",
      monthlyBill: grossMonthly,
      annualBill: grossMonthly * 12,
      description:
        "What you'd pay if you claimed nothing — the price most nurseries advertise.",
      available: true,
    },
    {
      key: "funded",
      label: "With funded hours only",
      shortLabel: "Funded hours",
      monthlyBill: afterFunding,
      annualBill: afterFunding * 12,
      description:
        effectiveFundedHours > 0
          ? `With your ${effectiveFundedHours} government-funded hours a week applied.`
          : "You don't currently qualify for funded hours, so this matches the full price.",
      available: effectiveFundedHours > 0,
    },
    {
      key: "funded-tfc",
      label: "Funded hours + Tax-Free Childcare",
      shortLabel: "+ Tax-Free Childcare",
      monthlyBill: Math.max(0, afterFunding - tfcSaving),
      annualBill: Math.max(0, afterFunding - tfcSaving) * 12,
      description:
        "Funded hours plus the government's 20% Tax-Free Childcare top-up. For most families, this is the best option.",
      available: taxFreeChildcare,
    },
    {
      key: "funded-voucher",
      label: "Funded hours + salary sacrifice",
      shortLabel: "+ Salary sacrifice",
      monthlyBill: Math.max(0, afterFunding - voucherSaving),
      annualBill: Math.max(0, afterFunding - voucherSaving) * 12,
      description:
        "Funded hours plus childcare-voucher salary sacrifice. Only available if you joined the scheme before October 2018, or your employer runs a workplace nursery scheme. Cannot be combined with Tax-Free Childcare.",
      available: hasSalarySacrifice,
    },
  ];

  // Best (cheapest) available scenario
  const availableScenarios = scenarios.filter((s) => s.available);
  const bestScenario = availableScenarios.reduce((best, s) =>
    s.monthlyBill < best.monthlyBill ? s : best
  );

  // Itemised breakdown for the best scenario
  const breakdown: FullResult["breakdown"] = [
    { label: "Gross monthly nursery fee", amount: grossMonthly, type: "cost" },
  ];
  if (fundedDiscountMonthly > 0) {
    breakdown.push({
      label: `Government-funded hours (${effectiveFundedHours}/week)`,
      amount: -fundedDiscountMonthly,
      type: "saving",
    });
  }
  if (bestScenario.key === "funded-tfc" && tfcSaving > 0) {
    breakdown.push({
      label: "Tax-Free Childcare top-up (20%)",
      amount: -tfcSaving,
      type: "saving",
    });
  }
  if (bestScenario.key === "funded-voucher" && voucherSaving > 0) {
    breakdown.push({
      label: "Salary-sacrifice saving",
      amount: -voucherSaving,
      type: "saving",
    });
  }
  breakdown.push({
    label: "Your estimated monthly bill",
    amount: bestScenario.monthlyBill,
    type: "total",
  });

  // Plain-language notes
  const notes: string[] = [];
  if (hoursPerWeek === 0) {
    notes.push("Add some sessions to your weekly schedule to see an estimate.");
  }
  if (fundedHoursPerWeek === 30) {
    notes.push(
      "You appear eligible for 30 hours of government-funded childcare a week."
    );
  } else if (fundedHoursPerWeek === 15) {
    notes.push(
      "You appear eligible for the universal 15 hours for 3- and 4-year-olds."
    );
  } else if (childAgeMonths < 9) {
    notes.push("Children under 9 months are not yet eligible for funded hours.");
  } else if (workingStatus !== "both-work" && childAgeMonths < 36) {
    notes.push(
      "30 funded hours for under-3s needs both parents working above the minimum income threshold."
    );
  } else if (incomeBand === "over-100k") {
    notes.push(
      "Funded hours and Tax-Free Childcare are withdrawn when either parent earns over £100,000."
    );
  }
  if (hasSalarySacrifice && taxFreeChildcare) {
    notes.push(
      "You've told us you have salary-sacrifice access. Remember: you can use salary sacrifice OR Tax-Free Childcare — not both. The chart shows each as a separate option so you can compare."
    );
  }
  notes.push(
    fundingModel === "term-time"
      ? "Assumes funded hours apply for 38 weeks a year (term-time), averaged across 12 months."
      : "Assumes your nursery offers stretched funding (hours spread across all 52 weeks)."
  );
  notes.push(
    `Hourly rate used: £${hourlyRate.toFixed(2)} — the estimated average for ${region.name}. Your nursery's actual rate may differ.`
  );

  return {
    hoursPerWeek,
    daysPerWeek,
    hourlyRate,
    grossMonthly,
    grossAnnual,
    eligibility: {
      fifteenHours,
      thirtyHours,
      taxFreeChildcare,
      fundedHoursPerWeek: effectiveFundedHours,
    },
    scenarios,
    bestScenarioKey: bestScenario.key,
    breakdown,
    notes,
  };
}

// -----------------------------------------------------------------------------
// FORMATTING
// -----------------------------------------------------------------------------

export function formatCurrency(amount: number): string {
  const sign = amount < 0 ? "−" : "";
  const abs = Math.abs(amount);
  return `${sign}£${abs.toLocaleString("en-GB", { maximumFractionDigits: 0 })}`;
}
