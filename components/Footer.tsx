import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-border/60 bg-bg">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-medium tracking-tight-display text-ink">
              We never ask for your name, email, or phone number.
            </p>
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted">
              Childcare Compass is a free, independent calculator. We don&apos;t store your data, sell it, or share it. Ever.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[0.78rem] font-medium uppercase tracking-[0.12em] text-muted">
              The tools
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              <li><Link href="/calculator" className="hover:text-accent">Cost calculator</Link></li>
              <li><Link href="/find" className="hover:text-accent">Find a nursery</Link></li>
              <li><Link href="/how-it-works" className="hover:text-accent">How it works</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[0.78rem] font-medium uppercase tracking-[0.12em] text-muted">
              Legal
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              <li><Link href="/privacy" className="hover:text-accent">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-accent">Terms</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[0.78rem] font-medium uppercase tracking-[0.12em] text-muted">
              Sources
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              <li>
                <a
                  href="https://www.gov.uk/childcare-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  GOV.UK ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.gov.uk/30-hours-free-childcare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  30 hours ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-[0.82rem] text-muted md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Childcare Compass. Not affiliated with HMRC or the Department for Education.
          </p>
          <p>
            This is an estimate tool, not financial advice. Always confirm at gov.uk.
          </p>
        </div>
      </div>
    </footer>
  );
}
