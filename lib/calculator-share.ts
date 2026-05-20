/**
 * Share-link encoding for calculator inputs.
 *
 * Encodes the user's non-sensitive inputs into compact URL query parameters
 * so a "Copy share link" can reproduce the same calculation in any browser
 * without ever sending data to a server.
 *
 * Privacy-conscious by design: only non-sensitive answers are encoded.
 * Income is encoded as a BAND (not an exact figure), tax band the same.
 * The schedule is packed as a single 5-char string.
 *
 * Format (all params optional, calculator falls back to defaults if missing):
 *   ?a=18         child age in months
 *   &r=south-east region id
 *   &s=fffnn      schedule: 5 chars for Mon-Fri, n=none m=morning p=PM f=full
 *   &w=both-work  working status
 *   &i=under-100k income band
 *   &f=term-time  funding model
 *   &v=1          salary sacrifice (0/1)
 *   &t=basic      salary tax band (when v=1)
 */

import type {
  CalculatorInputs,
  WeekSchedule,
  DaySession,
  WorkingStatus,
  IncomeBand,
  FundingModel,
  SalaryTaxBand,
} from "@/lib/funding-rules";

const SESSION_CODES: Record<DaySession, string> = {
  none: "n",
  morning: "m",
  afternoon: "p",
  full: "f",
};
const CODE_SESSIONS: Record<string, DaySession> = {
  n: "none",
  m: "morning",
  p: "afternoon",
  f: "full",
};

const DAY_KEYS: Array<keyof WeekSchedule> = ["mon", "tue", "wed", "thu", "fri"];

export interface ShareableInputs {
  ageMonths: number;
  regionId: string;
  schedule: WeekSchedule;
  workingStatus: WorkingStatus;
  incomeBand: IncomeBand;
  fundingModel: FundingModel;
  hasSalarySacrifice: boolean;
  salaryTaxBand: SalaryTaxBand;
}

/** Encode current inputs into a URL with query string. */
export function buildShareUrl(inputs: ShareableInputs, baseUrl: string): string {
  const params = new URLSearchParams();
  params.set("a", String(inputs.ageMonths));
  params.set("r", inputs.regionId);
  params.set(
    "s",
    DAY_KEYS.map((d) => SESSION_CODES[inputs.schedule[d]]).join("")
  );
  params.set("w", inputs.workingStatus);
  params.set("i", inputs.incomeBand);
  params.set("f", inputs.fundingModel);
  params.set("v", inputs.hasSalarySacrifice ? "1" : "0");
  if (inputs.hasSalarySacrifice) {
    params.set("t", inputs.salaryTaxBand);
  }
  // Trim trailing slash if present to avoid // in url
  const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return `${base}?${params.toString()}`;
}

/** Try to decode inputs from a URL search params. Returns null if invalid. */
export function decodeShareParams(
  search: URLSearchParams
): Partial<ShareableInputs> | null {
  const out: Partial<ShareableInputs> = {};
  let hasAny = false;

  const a = search.get("a");
  if (a !== null && /^\d{1,3}$/.test(a)) {
    const n = parseInt(a, 10);
    if (n >= 0 && n <= 71) {
      out.ageMonths = n;
      hasAny = true;
    }
  }

  const r = search.get("r");
  if (r && /^[a-z0-9-]{2,40}$/i.test(r)) {
    out.regionId = r;
    hasAny = true;
  }

  const s = search.get("s");
  if (s && /^[nmpf]{5}$/.test(s)) {
    out.schedule = {
      mon: CODE_SESSIONS[s[0]],
      tue: CODE_SESSIONS[s[1]],
      wed: CODE_SESSIONS[s[2]],
      thu: CODE_SESSIONS[s[3]],
      fri: CODE_SESSIONS[s[4]],
    };
    hasAny = true;
  }

  const w = search.get("w");
  if (w === "both-work" || w === "one-works" || w === "neither-works") {
    out.workingStatus = w;
    hasAny = true;
  }

  const i = search.get("i");
  if (i === "under-100k" || i === "over-100k") {
    out.incomeBand = i;
    hasAny = true;
  }

  const f = search.get("f");
  if (f === "term-time" || f === "stretched") {
    out.fundingModel = f;
    hasAny = true;
  }

  const v = search.get("v");
  if (v === "1" || v === "0") {
    out.hasSalarySacrifice = v === "1";
    hasAny = true;
  }

  const t = search.get("t");
  if (t === "basic" || t === "higher" || t === "additional") {
    out.salaryTaxBand = t;
    hasAny = true;
  }

  return hasAny ? out : null;
}

/** Convenience: extract the partial inputs from window.location on mount.
 *  Returns null in SSR. */
export function readSharedInputs(): Partial<ShareableInputs> | null {
  if (typeof window === "undefined") return null;
  return decodeShareParams(new URLSearchParams(window.location.search));
}
