import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NurseryFinder } from "@/components/NurseryFinder";

export const metadata = {
  title: "Find nurseries near you",
  description:
    "Search Ofsted-registered nurseries near your UK postcode. View ratings, distance, and find provider details — without giving up any personal information.",
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
            Nurseries near your postcode.
          </h1>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">
            Search Ofsted-registered childcare providers near a postcode. We show you what we know from the public Ofsted register, then send you straight to Google to find the nursery&apos;s own website and contact details. Nothing about your search is recorded, anywhere.
          </p>
        </div>

        <NurseryFinder />

        {/* Honest disclosure about sample data */}
        <div className="mt-16 rounded-2xl border border-warmth/30 bg-surface p-7 lg:p-9">
          <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-warmth">
            A note on our data
          </p>
          <h2 className="mt-3 font-display text-[1.4rem] font-medium leading-tight tracking-tight-display text-ink">
            We&apos;re showing sample listings for now.
          </h2>
          <div className="mt-4 grid gap-6 text-[0.95rem] leading-relaxed text-muted md:grid-cols-2 lg:gap-10">
            <p>
              The full Ofsted register lists over 70,000 childcare providers across England. We&apos;re integrating that dataset (which is published monthly under the Open Government Licence) into our finder over the coming weeks.
            </p>
            <p>
              In the meantime, you&apos;re seeing about two dozen sample providers spread across major UK cities so you can try the search. For real, comprehensive results today, you can also search the official register at{" "}
              <a
                href="https://reports.ofsted.gov.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4 hover:text-ink"
              >
                reports.ofsted.gov.uk
              </a>
              .
            </p>
          </div>
        </div>

        {/* What our finder does and doesn't do */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
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
                <span>Filters our list of Ofsted-registered providers by distance from that postcode</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                <span>Shows you the Ofsted rating, address, and distance for each one</span>
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
                <span>Rank nurseries by anything other than distance and rating</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
