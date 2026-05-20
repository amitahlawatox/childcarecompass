"use client";

import type { FullResult, CalculatorInputs } from "@/lib/funding-rules";
import {
  REGIONS,
  formatCurrency,
  VOUCHER_BAND_DETAILS,
  RULES_LAST_REVIEWED,
} from "@/lib/funding-rules";

/**
 * Generates a branded PDF of the user's calculator result and triggers
 * download in the browser. Runs entirely client-side — no data leaves
 * the user's machine. The PDF includes a generation timestamp and a
 * unique reference code so any copy can be traced back to its origin.
 *
 * jsPDF (~200KB minified) is dynamically imported so it only loads when
 * the user actually clicks "Download PDF" — keeping the initial bundle
 * small and the Lighthouse Performance score high.
 *
 * It's not cryptographically tamper-proof (no downloadable PDF format
 * truly is), but the heavy branding, generation metadata, and reference
 * code make casual editing visible and easy to dispute.
 */
export async function downloadCalculatorPdf(
  inputs: CalculatorInputs,
  result: FullResult
) {
  // Lazy-load jsPDF — only when the user clicks Download
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const PAGE_W = doc.internal.pageSize.getWidth(); // 595pt
  const MARGIN = 48;
  const COL_W = PAGE_W - MARGIN * 2;

  // Colours
  const INK = "#1F2A22";
  const MUTED = "#6B7268";
  const ACCENT = "#4A6B51";
  const WARMTH = "#E8A87C";
  const BORDER = "#E8E1D3";

  // Reference code + timestamp
  const refCode = generateReferenceCode();
  const generated = new Date();
  const generatedStr = generated.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Set document metadata
  doc.setProperties({
    title: `Childcare Compass estimate — ${refCode}`,
    subject: "UK childcare cost estimate",
    creator: "Childcare Compass",
    author: "Childcare Compass",
  });

  // ---------- HEADER ----------
  // Brand mark — small sage square
  doc.setFillColor(ACCENT);
  doc.roundedRect(MARGIN, MARGIN, 22, 22, 4, 4, "F");
  // Tiny "C" mark inside
  doc.setTextColor("#FBF7F1");
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("C", MARGIN + 7.5, MARGIN + 15.5);

  // Wordmark
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(INK);
  doc.text("Childcare Compass", MARGIN + 32, MARGIN + 15);

  // Reference + date (right aligned)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(MUTED);
  doc.text(`Ref ${refCode}`, PAGE_W - MARGIN, MARGIN + 8, { align: "right" });
  doc.text(`Generated ${generatedStr}`, PAGE_W - MARGIN, MARGIN + 20, {
    align: "right",
  });

  // ---------- TITLE ----------
  let y = MARGIN + 60;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(INK);
  doc.text("Your childcare cost estimate", MARGIN, y);
  y += 22;
  doc.setFontSize(10);
  doc.setTextColor(MUTED);
  doc.text(
    `Based on the rules in force at ${RULES_LAST_REVIEWED}. This is an estimate, not financial advice.`,
    MARGIN,
    y
  );
  y += 28;

  // ---------- HEADLINE FIGURES BOX ----------
  const bestScenario = result.scenarios.find(
    (s) => s.key === result.bestScenarioKey
  )!;
  const fullScenario = result.scenarios.find((s) => s.key === "full")!;
  const annualSaving = Math.max(
    fullScenario.annualBill - bestScenario.annualBill,
    0
  );

  doc.setDrawColor(BORDER);
  doc.setFillColor("#F4F8F2");
  doc.roundedRect(MARGIN, y, COL_W, 70, 10, 10, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(MUTED);
  doc.text("YOUR ESTIMATED MONTHLY BILL", MARGIN + 16, y + 18);
  doc.setFontSize(8);
  doc.text(
    "YOU COULD SAVE EACH YEAR vs FULL PRICE",
    MARGIN + COL_W / 2 + 16,
    y + 18
  );
  doc.setFontSize(22);
  doc.setTextColor(INK);
  doc.text(formatCurrency(Math.round(bestScenario.monthlyBill)), MARGIN + 16, y + 44);
  doc.setTextColor(ACCENT);
  doc.text(formatCurrency(Math.round(annualSaving)), MARGIN + COL_W / 2 + 16, y + 44);
  doc.setFontSize(9);
  doc.setTextColor(MUTED);
  doc.text(
    `Best route: ${bestScenario.label.toLowerCase()}`,
    MARGIN + 16,
    y + 60
  );
  y += 90;

  // ---------- YOUR INPUTS ----------
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(INK);
  doc.text("Your inputs", MARGIN, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(INK);

  const region = REGIONS.find((r) => r.id === inputs.regionId);
  const inputRows: Array<[string, string]> = [
    ["Child's age", formatAge(inputs.childAgeMonths)],
    ["Region", region?.name ?? "—"],
    ["Working situation", labelForWorkingStatus(inputs.workingStatus)],
    [
      "Household income",
      inputs.incomeBand === "under-100k"
        ? "Both parents under £100,000"
        : "One parent earns £100,000 or more",
    ],
    [
      "Funding model",
      inputs.fundingModel === "term-time"
        ? "Term-time (38 weeks)"
        : "Stretched (52 weeks)",
    ],
    [
      "Weekly schedule",
      `${result.daysPerWeek} ${
        result.daysPerWeek === 1 ? "day" : "days"
      } · ${result.hoursPerWeek} hours/week (${scheduleString(inputs)})`,
    ],
  ];
  if (inputs.hasSalarySacrifice) {
    const band = inputs.salaryTaxBand ?? "basic";
    const d = VOUCHER_BAND_DETAILS[band];
    inputRows.push([
      "Salary sacrifice",
      `Yes · ${band} rate (${Math.round(d.savingRate * 100)}% saving, £${d.monthlyCap}/mo cap)`,
    ]);
  } else {
    inputRows.push(["Salary sacrifice", "No"]);
  }

  for (const [label, value] of inputRows) {
    doc.setTextColor(MUTED);
    doc.text(label, MARGIN, y);
    doc.setTextColor(INK);
    doc.text(value, MARGIN + 160, y, { maxWidth: COL_W - 160 });
    y += 14;
  }
  y += 8;

  // ---------- BREAKDOWN ----------
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(INK);
  doc.text("How we got there", MARGIN, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  for (const row of result.breakdown) {
    if (row.type === "saving") {
      doc.setTextColor(ACCENT);
    } else if (row.type === "total") {
      // Separator line above total
      doc.setDrawColor(BORDER);
      doc.line(MARGIN, y - 4, PAGE_W - MARGIN, y - 4);
      doc.setTextColor(INK);
      doc.setFont("helvetica", "bold");
    } else {
      doc.setTextColor(INK);
    }
    doc.text(row.label, MARGIN, y, { maxWidth: COL_W - 80 });
    doc.text(formatCurrency(Math.round(row.amount)), PAGE_W - MARGIN, y, {
      align: "right",
    });
    if (row.type === "total") doc.setFont("helvetica", "normal");
    y += 14;
  }
  y += 8;

  // ---------- SCENARIO COMPARISON ----------
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(INK);
  doc.text("Side-by-side comparison", MARGIN, y);
  y += 16;

  const availableScenarios = result.scenarios.filter((s) => s.available);
  const maxAnnual = Math.max(...availableScenarios.map((s) => s.annualBill), 1);
  const BAR_AREA = COL_W - 220;

  for (const s of availableScenarios) {
    const isBest = s.key === result.bestScenarioKey;
    const widthPx = Math.max((s.annualBill / maxAnnual) * BAR_AREA, 4);

    doc.setFont("helvetica", isBest ? "bold" : "normal");
    doc.setFontSize(9);
    doc.setTextColor(INK);
    doc.text(s.shortLabel + (isBest ? " (best)" : ""), MARGIN, y);

    // Bar
    doc.setFillColor(isBest ? ACCENT : "#A9A29A");
    doc.roundedRect(MARGIN + 130, y - 8, widthPx, 10, 3, 3, "F");

    // Annual amount (right of bar)
    doc.setFont("helvetica", "normal");
    doc.setTextColor(MUTED);
    doc.text(
      `${formatCurrency(Math.round(s.annualBill))}/yr`,
      PAGE_W - MARGIN,
      y,
      { align: "right" }
    );
    y += 18;
  }
  y += 8;

  // ---------- NOTES ----------
  if (result.notes.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(INK);
    doc.text("Things to know", MARGIN, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(MUTED);
    for (const note of result.notes) {
      const lines = doc.splitTextToSize(`• ${note}`, COL_W);
      doc.text(lines, MARGIN, y);
      y += lines.length * 12 + 4;
    }
  }

  // ---------- FOOTER ----------
  const footerY = doc.internal.pageSize.getHeight() - 60;
  doc.setDrawColor(BORDER);
  doc.line(MARGIN, footerY, PAGE_W - MARGIN, footerY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(MUTED);
  doc.text(
    "This is an estimate based on UK government childcare-funding rules. It is not financial advice. Always confirm",
    MARGIN,
    footerY + 14
  );
  doc.text(
    "fees with your nursery and check eligibility at gov.uk/childcare-calculator before making decisions.",
    MARGIN,
    footerY + 24
  );
  doc.setTextColor(WARMTH);
  doc.text(
    `Generated by childcarecompass.co.uk · Ref ${refCode} · ${generatedStr}`,
    MARGIN,
    footerY + 38
  );

  doc.save(`childcare-compass-estimate-${refCode}.pdf`);
}

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

function generateReferenceCode(): string {
  // 8-character alphanumeric (excluding ambiguous characters), client-time-seeded
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code.slice(0, 4) + "-" + code.slice(4);
}

function formatAge(months: number): string {
  if (months < 12) return `${months} ${months === 1 ? "month" : "months"}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const y = `${years} ${years === 1 ? "year" : "years"}`;
  if (rem === 0) return y;
  return `${y}, ${rem} ${rem === 1 ? "month" : "months"}`;
}

function labelForWorkingStatus(s: CalculatorInputs["workingStatus"]): string {
  if (s === "both-work") return "Both parents work";
  if (s === "one-works") return "One parent works";
  return "Neither / single, not working";
}

function scheduleString(inputs: CalculatorInputs): string {
  const parts: string[] = [];
  const map: Record<string, string> = {
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
  };
  const sessionMap: Record<string, string> = {
    full: "full",
    morning: "AM",
    afternoon: "PM",
    none: "—",
  };
  for (const day of ["mon", "tue", "wed", "thu", "fri"] as const) {
    const s = inputs.schedule[day];
    if (s !== "none") parts.push(`${map[day]} ${sessionMap[s]}`);
  }
  return parts.length > 0 ? parts.join(", ") : "no sessions";
}
