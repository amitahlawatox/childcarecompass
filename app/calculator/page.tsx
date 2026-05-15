import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calculator } from "@/components/Calculator";
import { RULES_LAST_REVIEWED } from "@/lib/funding-rules";

export const metadata = {
  title: "UK Childcare Cost Calculator — Your Real Monthly Bill After Funding",
  description:
    "Free UK childcare cost calculator. See what you'll really pay each month after 15/30 funded hours and Tax-Free Childcare. No signup, no data stored, 2026 rates.",
};

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-14 lg:px-10 lg:pb-14 lg:pt-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-[0.74rem] font-medium uppercase tracking-[0.1em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              UK Childcare Cost Calculator · Free · No signup
            </p>
            <h1 className="font-display text-[2.5rem] font-light leading-[1.06] tracking-tight-display text-ink sm:text-[3.2rem]">
              The childcare cost calculator that shows what you&apos;ll{" "}
              <span className="italic font-normal text-accent">actually</span> pay.
            </h1>
            <p className="mt-6 text-[1.08rem] leading-relaxed text-muted">
              Most nurseries quote £8–£10 an hour. The UK government runs several separate funding schemes that can cut that by 60–80% — but only if you know how they stack together. Answer six quick questions and see your real monthly bill, with every scheme you qualify for applied.
            </p>
          </div>

          {/* Stats strip */}
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <Stat
              big="Thousands"
              small="of pounds a year in funding the average working family is entitled to"
            />
            <Stat
              big="30 seconds"
              small="to complete — six simple questions, an instant itemised result"
            />
            <Stat
              big="Zero"
              small="personal data stored — no name, no email, no phone number, ever"
              accent
            />
          </div>

          {/* Real example line */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-warmth/30 bg-warmth-soft/50">
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="text-[0.74rem] font-medium uppercase tracking-[0.12em] text-warmth">
                  A real example
                </p>
                <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink">
                  Sarah, Oxford — works four days a week, two-year-old in nursery.
                </p>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="text-center">
                  <p className="font-display text-[1.5rem] font-light tabular-nums text-muted line-through">
                    £1,135
                  </p>
                  <p className="text-[0.72rem] uppercase tracking-[0.08em] text-muted">
                    advertised
                  </p>
                </div>
                <span className="font-display text-[1.3rem] text-warmth">→</span>
                <div className="text-center">
                  <p className="font-display text-[1.9rem] font-light tabular-nums text-accent">
                    £285
                  </p>
                  <p className="text-[0.72rem] uppercase tracking-[0.08em] text-muted">
                    her real bill
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator section */}
        <section className="mx-auto max-w-6xl px-6 pb-14 lg:px-10 lg:pb-20">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-t border-border pt-10">
            <h2 className="font-display text-[1.6rem] font-medium tracking-tight-display text-ink">
              Your turn — six questions.
            </h2>
            <p className="text-[0.85rem] text-muted">
              2026 rules · last reviewed{" "}
              <span className="text-ink">{RULES_LAST_REVIEWED}</span>
            </p>
          </div>

          <Calculator />

          {/* Trust strip */}
          <div className="mt-16 rounded-2xl border border-border bg-surface p-7 lg:p-9">
            <h2 className="font-display text-[1.4rem] font-medium leading-tight tracking-tight-display text-ink">
              This is an estimate — not financial advice.
            </h2>
            <div className="mt-4 grid gap-6 text-[0.95rem] leading-relaxed text-muted md:grid-cols-2 lg:gap-10">
              <p>
                Childcare Compass uses the public UK government rules for 15 and 30 funded hours, and Tax-Free Childcare. Your nursery may charge for consumables (food, nappies), top up funded hours, or offer sibling discounts — we don&apos;t know any of that, so it isn&apos;t included.
              </p>
              <p>
                Before signing any nursery contract, run the official check at{" "}
                <a
                  href="https://www.gov.uk/childcare-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4 hover:text-ink"
                >
                  gov.uk/childcare-calculator
                </a>{" "}
                and ask your nursery for an itemised quote. The number you see here is a planning estimate.
              </p>
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-[0.9rem] text-muted">
                Want to find a nursery near you?{" "}
                <Link
                  href="/find"
                  className="font-medium text-accent underline underline-offset-4 hover:text-ink"
                >
                  Search 27,000+ Ofsted-registered providers →
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stat({
  big,
  small,
  accent,
}: {
  big: string;
  small: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        accent
          ? "border-accent/30 bg-accent-soft"
          : "border-border bg-surface"
      }`}
    >
      <p className="font-display text-[1.7rem] font-light leading-none tracking-tight-display text-ink">
        {big}
      </p>
      <p className="mt-2.5 text-[0.88rem] leading-relaxed text-muted">{small}</p>
    </div>
  );
}
