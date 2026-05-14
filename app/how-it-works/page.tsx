import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RULES_LAST_REVIEWED, SOURCES } from "@/lib/funding-rules";

export const metadata = {
  title: "How UK childcare funding actually works",
  description:
    "A plain-English guide to 15 and 30 funded hours, Tax-Free Childcare, and Universal Credit childcare support in the UK.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="relative z-10 mx-auto max-w-3xl px-6 py-14 lg:px-10 lg:py-20">
        <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
          How it works
        </p>
        <h1 className="mt-4 font-display text-[2.4rem] font-light leading-tight tracking-tight-display text-ink sm:text-[3rem]">
          UK childcare funding, in plain English.
        </h1>
        <p className="mt-6 text-[1.05rem] leading-relaxed text-muted">
          The UK has three main schemes that reduce childcare costs: funded hours, Tax-Free Childcare, and Universal Credit support. Most parents miss at least one. Here&apos;s how each one works.
        </p>

        <div className="prose-body mt-12 text-ink">
          <h2>1. The 15 hour universal entitlement</h2>
          <p>
            Every 3 and 4 year old in England is entitled to 15 hours of free childcare a week, for 38 weeks of the year. It doesn&apos;t matter whether either parent works, what they earn, or what benefits they receive. This one is genuinely universal.
          </p>
          <p>
            Most nurseries spread the funded weeks across the year, so instead of 15 hours a week during term-time, you might get a smaller number spread over 52 weeks. Ask your nursery which model they use — the difference matters.
          </p>
          <p>
            <a href={SOURCES.freeHours} target="_blank" rel="noopener noreferrer">
              Read the rule on gov.uk →
            </a>
          </p>

          <h2>2. The 30 hour working parents&apos; entitlement</h2>
          <p>
            From September 2025, working parents of children aged 9 months to 4 years can get up to 30 hours of funded childcare a week. To qualify:
          </p>
          <ul className="my-4 list-disc space-y-2 pl-6 text-[0.98rem] leading-relaxed text-ink">
            <li>Both parents (or the single parent in a single-parent household) must be working.</li>
            <li>Each parent must earn at least the equivalent of 16 hours a week at minimum wage — roughly £9,500 a year.</li>
            <li>Neither parent can earn more than £100,000 a year. Cross that line by £1 and you lose everything.</li>
          </ul>
          <p>
            The £100,000 cliff edge catches a lot of families. If you&apos;re close to it, pension contributions and salary sacrifice can keep you under — but check with an accountant before you act.
          </p>
          <p>
            <a href={SOURCES.freeHours} target="_blank" rel="noopener noreferrer">
              Read the rule on gov.uk →
            </a>
          </p>

          <h2>3. Tax-Free Childcare</h2>
          <p>
            For every £8 you pay into a government childcare account, the government adds £2. You can use the money to pay any Ofsted-registered childcare provider — nursery, childminder, holiday club, after-school club.
          </p>
          <p>
            The cap is £500 per child per quarter (£2,000 a year), or £1,000 per quarter for a disabled child. Eligibility is the same as for the 30 hour entitlement: both parents working, each earning between roughly £9,500 and £100,000.
          </p>
          <p>
            You cannot use Tax-Free Childcare alongside Universal Credit or childcare vouchers. You have to pick one scheme.
          </p>
          <p>
            <a href={SOURCES.taxFreeChildcare} target="_blank" rel="noopener noreferrer">
              Read the rule on gov.uk →
            </a>
          </p>

          <h2>4. Universal Credit childcare element</h2>
          <p>
            If you receive Universal Credit and you&apos;re working, the government will reimburse up to 85% of your childcare costs — up to a cap that changes each tax year. You can&apos;t combine this with Tax-Free Childcare.
          </p>
          <p>
            <a href={SOURCES.universalCredit} target="_blank" rel="noopener noreferrer">
              Read the rule on gov.uk →
            </a>
          </p>

          <h2>What our calculator does</h2>
          <p>
            We take your six answers, apply the rules above, and show the real monthly figure. We don&apos;t include consumable charges (food, nappies, trips) because we don&apos;t know your nursery — those are typically £40–£100 a month on top.
          </p>
          <p>
            Every rule on this page is updated when the government changes it. Our rules were last reviewed in <strong>{RULES_LAST_REVIEWED}</strong>.
          </p>

          <h2>What the calculator is not</h2>
          <p>
            It&apos;s an estimate tool, not financial advice. Before making a decision based on a number, run the official{" "}
            <a href={SOURCES.govCalculator} target="_blank" rel="noopener noreferrer">
              gov.uk childcare calculator
            </a>{" "}
            and ask your nursery for a proper itemised quote.
          </p>
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-surface p-7">
          <p className="font-display text-[1.2rem] font-medium leading-snug tracking-tight-display text-ink">
            Ready to see your number?
          </p>
          <p className="mt-2 text-[0.95rem] text-muted">
            Six questions. Takes under a minute. No signup, no email.
          </p>
          <Link
            href="/calculator"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[0.95rem] font-medium text-bg transition-all hover:bg-ink"
          >
            Open the calculator →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
