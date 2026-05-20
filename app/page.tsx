import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calculator } from "@/components/Calculator";
import { RULES_LAST_REVIEWED } from "@/lib/funding-rules";

export const metadata: Metadata = {
  title:
    "UK Childcare Cost Calculator — Your Real Monthly Bill After Funding",
  description:
    "Free UK childcare cost calculator. See what you'll really pay each month after 15/30 hours funded childcare, Tax-Free Childcare, and salary sacrifice. No signup, no data stored, 2026 rates.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "UK Childcare Cost Calculator — Childcare Compass",
    description:
      "See your real monthly childcare bill in 30 seconds. Every government scheme applied. No signup.",
    url: "https://childcarecompass.co.uk/",
    siteName: "Childcare Compass",
    locale: "en_GB",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="relative z-10">
        {/* HERO + CALCULATOR */}
        <section className="mx-auto max-w-6xl px-6 pt-12 lg:px-10 lg:pt-16">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-[0.74rem] font-medium uppercase tracking-[0.1em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              UK Childcare Cost Calculator · Free · No signup · 2026 rates
            </p>
            <h1 className="font-display text-[2.4rem] font-light leading-[1.06] tracking-tight-display text-ink sm:text-[3rem] lg:text-[3.6rem]">
              The childcare cost calculator that shows what you&apos;ll{" "}
              <span className="italic font-normal text-accent">actually</span> pay.
            </h1>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
              Most nurseries quote £8–£10 an hour. The UK government runs several
              separate funding schemes that can cut that by 60–80% — but only if
              you know how they stack together. Six quick questions below; your
              real monthly bill on the right.
            </p>
          </div>

          {/* Stats strip — compact */}
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <Stat
              big="Thousands"
              small="a year in funding the average working family is entitled to"
            />
            <Stat
              big="30 seconds"
              small="to complete — six questions, an instant itemised result"
            />
            <Stat
              big="Zero"
              small="personal data stored — no name, email, or phone, ever"
              accent
            />
          </div>

          {/* Real example banner */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-warmth/30 bg-warmth-soft/50">
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

          {/* THE CALCULATOR — the conversion event */}
          <div className="mt-10 mb-8 border-t border-border pt-10 lg:mt-12 lg:pt-12">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-[1.5rem] font-medium tracking-tight-display text-ink">
                Six questions. One real number.
              </h2>
              <p className="text-[0.85rem] text-muted">
                2026 rules · last reviewed{" "}
                <span className="text-ink">{RULES_LAST_REVIEWED}</span>
              </p>
            </div>
            <Calculator />
          </div>
        </section>

        {/* TRUST STRIP — disclaimer */}
        <section className="mx-auto max-w-6xl px-6 pb-14 lg:px-10">
          <div className="rounded-2xl border border-border bg-surface p-7 lg:p-9">
            <h2 className="font-display text-[1.4rem] font-medium leading-tight tracking-tight-display text-ink">
              This is an estimate — not financial advice.
            </h2>
            <div className="mt-4 grid gap-6 text-[0.95rem] leading-relaxed text-muted md:grid-cols-2 lg:gap-10">
              <p>
                Childcare Compass uses the public UK government rules for 15 and 30
                funded hours, and Tax-Free Childcare. Your nursery may charge for
                consumables (food, nappies), top up funded hours, or offer sibling
                discounts — we don&apos;t know any of that, so it isn&apos;t included.
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
                and ask your nursery for an itemised quote. The number you see here
                is a planning estimate.
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

        {/* WHY WE EXIST */}
        <section className="relative border-t border-border/60 bg-surface/40 py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
                  Why this exists
                </p>
                <h2 className="mt-4 font-display text-[2rem] font-light leading-tight tracking-tight-display text-ink sm:text-[2.4rem]">
                  Nursery fees are a maze on purpose.
                </h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6 space-y-5 text-[1.02rem] leading-relaxed text-ink">
                <p>
                  Every nursery website advertises one number. Every government site
                  explains one set of rules. Working out what you&apos;ll actually pay
                  each month means cross-referencing your child&apos;s age, both
                  parents&apos; incomes, your nursery&apos;s funding model, your
                  tax position, and whether the rules changed last quarter.
                </p>
                <p>
                  Most calculators want your name, email, phone number, and your
                  child&apos;s details before they&apos;ll show you a number — and
                  then they sell that information to nurseries trying to sign you up.
                </p>
                <p className="font-medium text-accent">
                  We don&apos;t want any of that. Just give us six rough answers.
                  We&apos;ll give you a real number. You walk away.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
              How it works
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[2rem] font-light leading-tight tracking-tight-display text-ink sm:text-[2.4rem]">
              Three minutes from postcode to plan.
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3 lg:gap-12">
              <Step
                number="01"
                title="Use the calculator above"
                body="Six quick questions about your child, your work, your area, and your nursery's funding model. Every answer changes the chart live."
              />
              <Step
                number="02"
                title="See every scheme applied"
                body="Funded hours, Tax-Free Childcare, salary sacrifice — compared side by side. The cheapest route is highlighted as 'Best for you'."
              />
              <Step
                number="03"
                title="Download the result"
                body="A branded PDF with all your numbers, a unique reference code, and the gov.uk source. Take it to your nursery, your partner, or your accountant."
              />
            </div>

            <div className="mt-12">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-accent underline underline-offset-4 hover:text-ink"
              >
                Read the detailed methodology →
              </Link>
            </div>
          </div>
        </section>

        {/* FIND A NURSERY PROMO */}
        <section className="relative border-t border-border/60 py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
              <div className="lg:col-span-6">
                <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
                  Find a nursery
                </p>
                <h2 className="mt-4 font-display text-[2rem] font-light leading-tight tracking-tight-display text-ink sm:text-[2.4rem]">
                  Every Ofsted-registered nursery in England, on one map.
                </h2>
                <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">
                  27,000+ day nurseries, pre-schools, and childcare settings — all
                  from the official Ofsted register. Enter a postcode and see the
                  closest ones, with their current Ofsted rating, distance, and a
                  direct route to their own website.
                </p>
                <div className="mt-7">
                  <Link
                    href="/find"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-6 py-3 text-[0.95rem] font-medium text-ink transition-all hover:border-ink"
                  >
                    Open the finder →
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_12px_40px_-15px_rgba(74,107,81,0.15)] sm:p-8">
                  <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
                    A typical search result
                  </p>
                  <div className="mt-4 space-y-3">
                    <MiniResultRow name="Little Acorns Day Nursery" rating="Outstanding" miles="0.8" />
                    <MiniResultRow name="The Old Vicarage Pre-School" rating="Good" miles="1.4" />
                    <MiniResultRow name="Sunbeam Children's Centre" rating="Outstanding" miles="2.1" />
                    <MiniResultRow name="Bumblebee Cottage Nursery" rating="Good" miles="3.0" />
                  </div>
                  <p className="mt-5 border-t border-border pt-4 text-[0.82rem] leading-relaxed text-muted">
                    Each result links to a Google search for that provider — where
                    you can find their own website, phone number, and current
                    availability. We never see what you do next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HONEST BY DESIGN */}
        <section className="relative border-t border-border/60 bg-surface/40 py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
                  Honest by design
                </p>
                <h2 className="mt-4 font-display text-[2rem] font-light leading-tight tracking-tight-display text-ink sm:text-[2.4rem]">
                  Things we will never ask you for.
                </h2>
                <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-muted">
                  Most childcare websites are lead generation businesses dressed as
                  helpful tools. We&apos;re built to be the opposite.
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  "Your name",
                  "Your email address",
                  "Your phone number",
                  "Your child's name or date of birth",
                  "Your home address",
                  "Your exact income",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 text-[0.95rem] text-ink"
                  >
                    <span>{item}</span>
                    <span className="font-display text-[0.85rem] italic tracking-tight-display text-accent">never asked</span>
                  </li>
                ))}
              </ul>
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
      className={`rounded-2xl border p-5 ${
        accent ? "border-accent/30 bg-accent-soft" : "border-border bg-surface"
      }`}
    >
      <p className="font-display text-[1.55rem] font-light leading-none tracking-tight-display text-ink">
        {big}
      </p>
      <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">{small}</p>
    </div>
  );
}

function Step({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="font-display text-[0.95rem] font-medium tracking-tight-display text-accent">
        {number}
      </p>
      <h3 className="mt-3 font-display text-[1.3rem] font-medium leading-snug tracking-tight-display text-ink">
        {title}
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function MiniResultRow({
  name,
  rating,
  miles,
}: {
  name: string;
  rating: string;
  miles: string;
}) {
  const dotColor =
    rating === "Outstanding" ? "bg-accent" : rating === "Good" ? "bg-warmth" : "bg-muted";
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-bg px-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="truncate text-[0.95rem] font-medium text-ink">{name}</p>
        <p className="mt-0.5 inline-flex items-center gap-2 text-[0.82rem] text-muted">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${dotColor}`} />
          {rating}
        </p>
      </div>
      <div className="text-right">
        <p className="font-display text-[1.1rem] font-medium tabular-nums text-ink">{miles}</p>
        <p className="text-[0.72rem] uppercase tracking-[0.1em] text-muted">mi</p>
      </div>
    </div>
  );
}
