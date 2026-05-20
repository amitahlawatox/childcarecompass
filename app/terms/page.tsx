import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of use",
  description:
    "Terms of use for Childcare Compass. We provide an estimate tool, not financial advice. Use the official gov.uk calculator before making decisions.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="relative z-10 mx-auto max-w-3xl px-6 py-14 lg:px-10 lg:py-20">
        <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
          Terms of use
        </p>
        <h1 className="mt-4 font-display text-[2.4rem] font-light leading-tight tracking-tight-display text-ink sm:text-[3rem]">
          What this service is, and isn&apos;t.
        </h1>
        <p className="mt-6 text-[1.05rem] leading-relaxed text-muted">
          The short version: we&apos;re a free information tool. We do our best to be accurate. We&apos;re not your accountant.
        </p>

        <div className="prose-body mt-12 text-ink">
          <h2>1. What Childcare Compass is</h2>
          <p>
            Childcare Compass is a free, independent information service. We apply the publicly available UK government rules for childcare funding (15 and 30 funded hours, Tax-Free Childcare, Universal Credit childcare element) to the inputs you give us, and show you an estimated monthly cost.
          </p>
          <p>
            We also provide a search tool to help you find Ofsted-registered childcare providers near a postcode, using data published by Ofsted under the Open Government Licence.
          </p>

          <h2>2. What Childcare Compass is not</h2>
          <p>
            <strong>It is not financial advice.</strong> We are not a regulated financial advisor. The numbers we show are estimates based on rules at the date of our last review (shown on each page). The rules change. The numbers we use may be out of date. Your specific circumstances may not match our assumptions.
          </p>
          <p>
            <strong>It is not a substitute for the official gov.uk childcare calculator</strong> — which we link to from every page. Always run that before making any financial decision.
          </p>
          <p>
            <strong>It is not affiliated with HMRC, the Department for Education, Ofsted, or any nursery or childminder.</strong> We have no commercial relationship with any childcare provider. Listings appear based on the public Ofsted register, not because providers pay us.
          </p>

          <h2>3. Accuracy</h2>
          <p>
            We try hard to be accurate. We cite gov.uk for every rule and update our calculator when the government updates the rules. But we are a small independent operation, and mistakes are possible. If you spot one, please tell us at <span className="font-medium">hello@childcarecompass.co.uk</span> and we&apos;ll fix it.
          </p>
          <p>
            By using Childcare Compass, you accept that:
          </p>
          <ul className="my-4 list-disc space-y-2 pl-6 text-[0.98rem] leading-relaxed text-ink">
            <li>The outputs are estimates, not financial advice.</li>
            <li>You will verify any number that affects a real financial decision with gov.uk and/or a qualified advisor.</li>
            <li>We are not liable for any decision you make based on our estimates.</li>
            <li>The Ofsted ratings and nursery details we show may be out of date — always check the current Ofsted report at <a href="https://reports.ofsted.gov.uk" target="_blank" rel="noopener noreferrer">reports.ofsted.gov.uk</a>.</li>
          </ul>

          <h2>4. How you use the service</h2>
          <p>
            You may use Childcare Compass for personal, non-commercial purposes. You may share links to our pages. You may quote short excerpts in articles or social media with attribution.
          </p>
          <p>
            You may not scrape our content at scale, copy our calculator logic into a competing service, or use our service in any way that disrupts it for other users.
          </p>

          <h2>5. Ofsted data</h2>
          <p>
            Information about childcare providers shown on this site is sourced from the publicly available Ofsted register, used under the Open Government Licence v3.0. We update this data periodically. The current Ofsted report for any provider is always available at{" "}
            <a href="https://reports.ofsted.gov.uk" target="_blank" rel="noopener noreferrer">
              reports.ofsted.gov.uk
            </a>
            .
          </p>

          <h2>6. Changes to these terms</h2>
          <p>
            We may update these terms when the service changes. Significant changes will be flagged on this page with the date of the update. These terms were last updated on <strong>13 May 2026</strong>.
          </p>

          <h2>7. Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales. Any disputes will be heard in the courts of England and Wales.
          </p>

          <h2>8. Contact</h2>
          <p>
            For any questions about these terms, write to{" "}
            <span className="font-medium">hello@childcarecompass.co.uk</span>.
          </p>
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-surface p-7">
          <p className="font-display text-[1.2rem] font-medium leading-snug tracking-tight-display text-ink">
            Have questions?
          </p>
          <p className="mt-2 text-[0.95rem] text-muted">
            Read the{" "}
            <Link href="/how-it-works" className="text-accent underline underline-offset-4 hover:text-ink">
              how it works
            </Link>{" "}
            page for a plain-English explanation of every rule we use.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
