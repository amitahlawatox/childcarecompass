import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy — we don't collect anything",
  description:
    "Childcare Compass collects no personal data. No name, no email, no phone number. No cookies for tracking. Read our full privacy promise.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="relative z-10 mx-auto max-w-3xl px-6 py-14 lg:px-10 lg:py-20">
        <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
          Privacy
        </p>
        <h1 className="mt-4 font-display text-[2.4rem] font-light leading-tight tracking-tight-display text-ink sm:text-[3rem]">
          We don&apos;t collect anything.
        </h1>
        <p className="mt-6 text-[1.05rem] leading-relaxed text-muted">
          Most privacy policies are long because the company has things to disclose. Ours is short because we don&apos;t.
        </p>

        <div className="prose-body mt-12 text-ink">
          <h2>What we collect about you</h2>
          <p>Nothing.</p>
          <p>
            We do not ask for, store, or share your name, email address, phone number, postal address, date of birth, your child&apos;s name or date of birth, your income, your nursery&apos;s name, or any other personal information.
          </p>

          <h2>What about the calculator inputs?</h2>
          <p>
            The numbers you type into the calculator (your child&apos;s age, hours per week, hourly rate, etc.) are processed entirely in your browser. They never leave your device. We have no way of seeing them, even if we wanted to.
          </p>
          <p>
            When you close the tab, those inputs are gone. We don&apos;t use cookies, localStorage, or any persistence mechanism to remember them.
          </p>

          <h2>What about the nursery finder?</h2>
          <p>
            When you search for nurseries near a postcode, we convert that postcode to coordinates using a free public service (<a href="https://postcodes.io" target="_blank" rel="noopener noreferrer">postcodes.io</a>) and filter our public list of Ofsted-registered providers. The postcode is sent to that service for lookup only, not stored by us.
          </p>
          <p>
            The list of nurseries we show comes from the public Ofsted register, which is published by the UK Government under the Open Government Licence. We don&apos;t maintain relationships with nurseries. We don&apos;t send them your postcode, your enquiries, or anything else.
          </p>

          <h2>Analytics and tracking</h2>
          <p>
            We use only privacy-respecting analytics that count page views in aggregate. No individual user is identified. No cross-site tracking. No advertising cookies. We do not use Google Analytics or any tool that builds a profile of you across the web.
          </p>

          <h2>Third-party services we depend on</h2>
          <p>
            Our site is hosted on Vercel, which receives the standard web request information (IP address, user agent, page requested) needed to deliver our pages. Vercel does not share this with us. We do not access it.
          </p>
          <p>
            The postcode lookup uses postcodes.io. Their{" "}
            <a href="https://postcodes.io/about" target="_blank" rel="noopener noreferrer">
              privacy approach
            </a>{" "}
            is documented on their site. Once a postcode is converted to coordinates, that data is not retained by us.
          </p>

          <h2>If you want to disappear from our records</h2>
          <p>
            There are no records to disappear from. We have nothing to delete because we never collected anything.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this privacy notice, or if you spot something we&apos;ve overlooked, you can write to us at{" "}
            <span className="font-medium">hello@childcarecompass.co.uk</span>. Your email will be read, replied to, and not retained beyond what&apos;s needed to answer you.
          </p>

          <h2>Changes to this notice</h2>
          <p>
            If we ever change what data we collect (we don&apos;t plan to), we&apos;ll update this page and post the change date here. This notice was last updated on <strong>13 May 2026</strong>.
          </p>
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-accent-soft p-7">
          <p className="font-display text-[1.2rem] font-medium leading-snug tracking-tight-display text-ink">
            That&apos;s genuinely it.
          </p>
          <p className="mt-2 text-[0.95rem] text-muted">
            If you read other childcare websites&apos; privacy policies, they will be much longer. That&apos;s because they collect much more.
          </p>
          <Link
            href="/calculator"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[0.95rem] font-medium text-bg transition-all hover:bg-ink"
          >
            Try the calculator →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
