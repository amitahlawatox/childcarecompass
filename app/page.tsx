import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroIllustration } from "@/components/HeroIllustration";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="relative z-10">
        {/* Hero — text + illustration */}
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">
              <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                For parents · Free · No signup
              </p>
              <h1 className="font-display text-[2.6rem] font-light leading-[1.05] tracking-tight-display text-ink sm:text-[3.4rem] lg:text-[4.2rem]">
                The real cost of childcare,{" "}
                <span className="italic font-normal text-accent">honestly</span>{" "}
                worked out.
              </h1>
              <p className="mt-7 max-w-xl text-[1.08rem] leading-relaxed text-muted">
                Childcare Compass shows what you&apos;ll <em>actually</em> pay each month after government funding, Tax-Free Childcare, and the rules nobody explains properly. No name. No email. No phone number. We never store anything.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/calculator"
                  className="rounded-full bg-accent px-7 py-3.5 text-[0.98rem] font-medium text-bg transition-all hover:bg-accent-deep"
                >
                  Get your estimate →
                </Link>
                <Link
                  href="/how-it-works"
                  className="rounded-full border border-border bg-surface px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-all hover:border-ink"
                >
                  How it works
                </Link>
              </div>
              <p className="mt-6 text-[0.85rem] text-muted">
                Takes 30 seconds · 27,000+ Ofsted-registered nurseries searchable
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-[420px]">
                <HeroIllustration className="h-auto w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Sarah's story — the example showcase, now as a dedicated section */}
        <section className="relative py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
              <div className="lg:col-span-5">
                <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-warmth">
                  A real example
                </p>
                <h2 className="mt-4 font-display text-[1.9rem] font-light leading-tight tracking-tight-display text-ink sm:text-[2.2rem]">
                  Most parents pay <span className="italic text-accent">far less</span> than the price the nursery quotes them.
                </h2>
                <p className="mt-5 text-[1rem] leading-relaxed text-muted">
                  Government funding for 2-year-olds, Tax-Free Childcare, and the new expanded entitlement compound together — but only if you know about them.
                </p>
                <p className="mt-3 text-[1rem] leading-relaxed text-muted">
                  Meet Sarah. She lives in Oxford, works four days a week, and her two-year-old is in nursery at <span className="font-medium text-ink">£8.20 an hour</span>.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="relative rounded-2xl border border-border bg-surface p-7 shadow-[0_12px_40px_-15px_rgba(74,107,81,0.18)] sm:p-9">
                  {/* Soft decorative dot top right */}
                  <span className="absolute -top-2 right-8 h-4 w-4 rounded-full bg-warmth-soft" />
                  <span className="absolute -top-1 right-7 h-2 w-2 rounded-full bg-warmth" />

                  <div className="space-y-3 text-[0.95rem]">
                    <Row label="Gross monthly fee" value="£1,135" />
                    <Row label="30 hours funded" value="−£779" accent />
                    <Row label="Tax-Free Childcare" value="−£71" accent />
                    <div className="border-t border-border pt-4 mt-3">
                      <div className="flex items-end justify-between">
                        <span className="font-medium text-ink">Sarah&apos;s real monthly bill</span>
                        <span className="font-display text-[2rem] font-light tabular-nums text-accent">£285</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 text-[0.88rem] leading-relaxed text-muted">
                    That&apos;s <span className="font-medium text-ink">75% less</span> than the nursery&apos;s advertised price. Most parents we&apos;ve spoken to had no idea they were entitled to this much.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why we exist */}
        <section className="relative border-t border-border/60 bg-surface/40 py-20 lg:py-28">
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
                  Every nursery website advertises one number. Every government site explains one set of rules. Working out what you&apos;ll actually pay each month means cross-referencing your child&apos;s age, both parents&apos; incomes, your nursery&apos;s funding model, your tax position, and whether the rules changed last quarter.
                </p>
                <p>
                  Most calculators want your name, email, phone number, and your child&apos;s details before they&apos;ll show you a number — and then they sell that information to nurseries trying to sign you up.
                </p>
                <p className="font-medium text-accent">
                  We don&apos;t want any of that. Just give us six rough answers. We&apos;ll give you a real number. You walk away.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works — 3 steps */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
              How it works
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[2rem] font-light leading-tight tracking-tight-display text-ink sm:text-[2.4rem]">
              Six questions. One real number. Zero data captured.
            </h2>

            <div className="mt-14 grid gap-8 md:grid-cols-3 lg:gap-12">
              <Step
                number="01"
                title="Tell us about your child"
                body="Their age and how many hours of childcare you need each week. Funding eligibility depends on age."
              />
              <Step
                number="02"
                title="Tell us about your work"
                body="Whether both parents work, and roughly what you earn. This unlocks 30 funded hours and Tax-Free Childcare."
              />
              <Step
                number="03"
                title="See your real bill"
                body="An itemised breakdown showing every saving the government owes you. Linked to gov.uk for every rule."
              />
            </div>

            <div className="mt-14">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[0.98rem] font-medium text-bg transition-all hover:bg-accent-deep"
              >
                Run the calculator →
              </Link>
            </div>
          </div>
        </section>

        {/* Find a nursery — now mentions real data */}
        <section className="relative border-t border-border/60 py-20 lg:py-28">
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
                  27,000+ day nurseries, pre-schools, and childcare settings — all from the official Ofsted register. Enter a postcode and see the closest ones, with their current Ofsted rating, distance, and a direct route to their own website.
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
                    Each result links to a Google search for that provider — where you can find their own website, phone number, and current availability. We never see what you do next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Honest by design */}
        <section className="relative border-t border-border/60 bg-surface/40 py-20 lg:py-28">
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
                  Most childcare websites are lead generation businesses dressed as helpful tools. We&apos;re built to be the opposite.
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

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={accent ? "text-accent" : "text-ink"}>{label}</span>
      <span className={`tabular-nums ${accent ? "text-accent" : "text-ink"}`}>{value}</span>
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
