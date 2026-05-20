import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NurseryFinder } from "@/components/NurseryFinder";

export const metadata = {
  alternates: { canonical: "/find" },
  title: "Find a nursery near you — 27,000+ Ofsted-registered providers",
  description:
    "Search every Ofsted-registered day nursery and pre-school in England by UK postcode. View ratings, distance, and capacity — without giving up any personal information.",
};

export default function FindPage() {
  return (
    <>
      <Header />
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
            The finder
          </p>
          <h1 className="mt-4 font-display text-[2.2rem] font-light leading-tight tracking-tight-display text-ink sm:text-[2.8rem]">
            Every Ofsted-registered nursery in England,{" "}
            <span className="italic text-accent">at your fingertips.</span>
          </h1>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">
            Search the complete Ofsted register — over 27,000 day nurseries, pre-schools, and childcare settings. Enter your postcode and see the closest ones with their current Ofsted rating, distance, and the size of the setting. Each result links to a Google search where you&apos;ll find their own website and contact details. We never store your postcode or what you click.
          </p>
        </div>

        <NurseryFinder />

        {/* What our finder does and doesn't do */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-bg p-7">
            <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-accent">
              What this finder does
            </p>
            <ul className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-ink">
              <li className="flex gap-3">
                <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                <span>Looks up your postcode using a free public service (postcodes.io)</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                <span>Searches every Ofsted-registered day nursery and pre-school in England</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                <span>Shows you each provider&apos;s Ofsted rating, address, distance, and capacity</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                <span>Sends you to Google for the nursery&apos;s own website and phone number</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-bg p-7">
            <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
              What this finder doesn&apos;t do
            </p>
            <ul className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-muted">
              <li className="flex gap-3">
                <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-muted/60" />
                <span>Send the nursery any of your details — ever</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-muted/60" />
                <span>Store your postcode or save your search</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-muted/60" />
                <span>Take a commission from any nursery you contact</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-muted/60" />
                <span>Include childminders (Ofsted redacts their addresses for privacy)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Data source attribution */}
        <div className="mt-10 rounded-2xl border border-border bg-surface/60 p-6 text-[0.85rem] leading-relaxed text-muted">
          <p>
            <span className="font-medium text-ink">Data source:</span> Information shown comes from the public Ofsted Childcare Providers and Inspections register, used under the Open Government Licence v3.0. Last refreshed January 2026. Always check the latest Ofsted report at{" "}
            <a
              href="https://reports.ofsted.gov.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4 hover:text-ink"
            >
              reports.ofsted.gov.uk
            </a>{" "}
            before deciding on a nursery.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
