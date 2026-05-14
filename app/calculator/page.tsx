import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calculator } from "@/components/Calculator";
import { RULES_LAST_REVIEWED } from "@/lib/funding-rules";

export const metadata = {
  title: "Childcare cost calculator",
  description:
    "Free UK childcare cost calculator. See your real monthly bill after 15/30 funded hours and Tax-Free Childcare. No signup required.",
};

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-20">
        <div className="mb-12 max-w-3xl">
          <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
            The calculator
          </p>
          <h1 className="mt-4 font-display text-[2.2rem] font-light leading-tight tracking-tight-display text-ink sm:text-[2.8rem]">
            Your real monthly childcare bill.
          </h1>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">
            Six quick questions. We calculate everything the government owes you against your nursery&apos;s actual rate, and show the maths. Nothing leaves your browser.
          </p>
          <p className="mt-3 text-[0.85rem] text-muted">
            Rules last reviewed: <span className="text-ink">{RULES_LAST_REVIEWED}</span>
          </p>
        </div>

        <Calculator />

        {/* Trust strip */}
        <div className="mt-20 rounded-2xl border border-border bg-surface p-7 lg:p-9">
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
        </div>
      </main>
      <Footer />
    </>
  );
}
