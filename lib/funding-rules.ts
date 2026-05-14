/**
 * UK CHILDCARE FUNDING RULES — SINGLE SOURCE OF TRUTH
 *
 * This file encodes all UK government childcare funding rules used by the
 * Childcare Compass calculator. When government rules change, update this
 * file and bump RULES_LAST_REVIEWED.
 *
 * Every rule has a `source` linking to the official gov.uk page.
 *
 * IMPORTANT: All outputs from this engine are ESTIMATES. Always confirm with
 * gov.uk before making financial decisions.
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

/** Working parents' minimum earnings threshold for 30-hour entitlement
 *  (equivalent of 16 hrs/week at NMW for adults aged 21+) */
export const MIN_EARNINGS_THRESHOLD = 9518; // approximate annual minimum

/** Income cap above which entitlement is lost */
export const INCOME_CAP_PER_PARENT = 100000;

/** Tax-Free Childcare: gov adds £2 for every £8 = 20% top-up */
export const TFC_TOPUP_RATE = 0.20;

/** Tax-Free Childcare quarterly cap per child */
export const TFC_QUARTERLY_CAP = 500;

/** Universal Credit childcare element: up to 85% reimbursement */
export const UC_REIMBURSEMENT_RATE = 0.85;

// -----------------------------------------------------------------------------
// UK AVERAGE HOURLY RATES (used when user doesn't know their nursery's rate)
// Source: Coram Family & Childcare Survey 2025, adjusted for inflation
// -----------------------------------------------------------------------------

export const UK_AVERAGE_HOURLY = {
  under2: 8.20,
  twoYear: 7.80,
  threePlus: 7.40,
};

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

export type WorkingStatus = "both-work" | "one-works" | "neither-works";
export type IncomeBand = "under-100k" | "over-100k";
export type FundingModel = "term-time" | "stretched";

export interface CalculatorInputs {
  childAgeMonths: number;
  hourlyRate: number;
  hoursPerWeek: number;
  workingStatus: WorkingStatus;
  incomeBand: IncomeBand;
  fundingModel: FundingModel;
}

export interface CalculatorResult {
  grossMonthly: number;
  fundedHoursPerWeek: number;
  fundedDiscountMonthly: number;
  tfcSavingsMonthly: number;
  netMonthly: number;
  eligibility: {
    fifteenHours: boolean;
    thirtyHours: boolean;
    taxFreeChildcare: boolean;
  };
  breakdown: Array<{ label: string; amount: number; type: "cost" | "saving" | "total" }>;
  notes: string[];
}

// -----------------------------------------------------------------------------
// ELIGIBILITY LOGIC
// -----------------------------------------------------------------------------

/** Universal 15-hour entitlement: all 3 and 4 year olds in England */
function isEligibleFor15Hours(ageMonths: number): boolean {
  return ageMonths >= 36 && ageMonths < 60;
}

/** Working-parent 30-hour entitlement: 9 months to 4 years, both parents working,
 *  each earning between minimum threshold and £100k */
function isEligibleFor30Hours(
  ageMonths: number,
  workingStatus: WorkingStatus,
  incomeBand: IncomeBand
): boolean {
  if (ageMonths < 9) return false;
  if (ageMonths >= 60) return false;
  if (workingStatus !== "both-work") return false;
  if (incomeBand === "over-100k") return false;
  return true;
}

/** Tax-Free Childcare: working parents (or single working parent),
 *  each earning between minimum threshold and £100k */
function isEligibleForTFC(
  workingStatus: WorkingStatus,
  incomeBand: IncomeBand
): boolean {
  if (workingStatus === "neither-works") return false;
  if (incomeBand === "over-100k") return false;
  return true;
}

// -----------------------------------------------------------------------------
// CORE CALCULATION
// -----------------------------------------------------------------------------

export function calculate(inputs: CalculatorInputs): CalculatorResult {
  const {
    childAgeMonths,
    hourlyRate,
    hoursPerWeek,
    workingStatus,
    incomeBand,
    fundingModel,
  } = inputs;

  const fifteenHours = isEligibleFor15Hours(childAgeMonths);
  const thirtyHours = isEligibleFor30Hours(childAgeMonths, workingStatus, incomeBand);
  const taxFreeChildcare = isEligibleForTFC(workingStatus, incomeBand);

  // Funded hours per week
  let fundedHoursPerWeek = 0;
  if (thirtyHours) {
    fundedHoursPerWeek = 30;
  } else if (fifteenHours) {
    fundedHoursPerWeek = 15;
  } else if (childAgeMonths >= 9 && workingStatus === "both-work" && incomeBand === "under-100k") {
    // Working parents under 3 get 30 hours from Sept 2025
    fundedHoursPerWeek = 30;
  }

  // Cap funded hours at actual hours used
  const effectiveFundedHours = Math.min(fundedHoursPerWeek, hoursPerWeek);

  // Gross monthly cost (assume 52 weeks averaged to monthly)
  const grossMonthly = hourlyRate * hoursPerWeek * 4.33;

  // Funded discount — depends on whether nursery operates term-time or stretched
  let fundedDiscountMonthly = 0;
  if (effectiveFundedHours > 0) {
    if (fundingModel === "term-time") {
      // 38 weeks of funded hours, averaged across 12 months
      fundedDiscountMonthly = (effectiveFundedHours * hourlyRate * FUNDED_WEEKS_PER_YEAR) / 12;
    } else {
      // Stretched: funded hours spread across all weeks
      const stretchedHoursPerWeek = (effectiveFundedHours * FUNDED_WEEKS_PER_YEAR) / 52;
      fundedDiscountMonthly = stretchedHoursPerWeek * hourlyRate * 4.33;
    }
  }

  // Remaining bill before TFC
  const remainingAfterFunding = Math.max(0, grossMonthly - fundedDiscountMonthly);

  // Tax-Free Childcare: 20% top-up on parent contribution, capped at £500/quarter (£166/month)
  let tfcSavingsMonthly = 0;
  if (taxFreeChildcare && remainingAfterFunding > 0) {
    const calculatedTfc = remainingAfterFunding * TFC_TOPUP_RATE;
    const monthlyTfcCap = TFC_QUARTERLY_CAP / 3;
    tfcSavingsMonthly = Math.min(calculatedTfc, monthlyTfcCap);
  }

  const netMonthly = Math.max(0, remainingAfterFunding - tfcSavingsMonthly);

  // Human-readable breakdown
  const breakdown: CalculatorResult["breakdown"] = [
    { label: "Gross monthly nursery fee", amount: grossMonthly, type: "cost" },
  ];

  if (fundedDiscountMonthly > 0) {
    breakdown.push({
      label: `Government-funded hours (${effectiveFundedHours} hrs/week)`,
      amount: -fundedDiscountMonthly,
      type: "saving",
    });
  }

  if (tfcSavingsMonthly > 0) {
    breakdown.push({
      label: "Tax-Free Childcare top-up",
      amount: -tfcSavingsMonthly,
      type: "saving",
    });
  }

  breakdown.push({
    label: "Your estimated monthly bill",
    amount: netMonthly,
    type: "total",
  });

  // Plain-language notes
  const notes: string[] = [];

  if (fundedHoursPerWeek === 30) {
    notes.push("You appear eligible for 30 hours of government-funded childcare per week (working parents).");
  } else if (fundedHoursPerWeek === 15) {
    notes.push("You appear eligible for the universal 15 hours of free childcare for 3 and 4 year olds.");
  } else if (childAgeMonths < 9) {
    notes.push("Children under 9 months are not yet eligible for funded hours.");
  } else if (workingStatus !== "both-work") {
    notes.push("To unlock 30 funded hours, both parents need to be working and earning above the minimum threshold.");
  } else if (incomeBand === "over-100k") {
    notes.push("Funded hours and Tax-Free Childcare are not available when either parent earns over £100,000.");
  }

  if (taxFreeChildcare) {
    notes.push("Tax-Free Childcare adds £2 for every £8 you pay in, up to £500 per quarter, per child.");
  }

  if (fundingModel === "term-time") {
    notes.push("This estimate assumes funded hours apply for 38 weeks a year (term-time only), averaged across 12 months.");
  } else {
    notes.push("This estimate assumes your nursery offers stretched funding (hours spread across all 52 weeks).");
  }

  notes.push("This is an estimate. Confirm your actual entitlement at gov.uk/childcare-calculator before making decisions.");

  return {
    grossMonthly,
    fundedHoursPerWeek: effectiveFundedHours,
    fundedDiscountMonthly,
    tfcSavingsMonthly,
    netMonthly,
    eligibility: {
      fifteenHours,
      thirtyHours,
      taxFreeChildcare,
    },
    breakdown,
    notes,
  };
}

// -----------------------------------------------------------------------------
// FORMATTING HELPERS
// -----------------------------------------------------------------------------

export function formatCurrency(amount: number): string {
  const sign = amount < 0 ? "-" : "";
  const abs = Math.abs(amount);
  return `${sign}£${abs.toFixed(0)}`;
}
