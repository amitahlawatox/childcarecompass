import Link from "next/link";

export function Header() {
  return (
    <header className="relative z-10 border-b border-border/60 bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="group flex items-center gap-2.5">
          <CompassMark />
          <span className="font-display text-[1.35rem] font-medium tracking-tight-display text-ink">
            Childcare Compass
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-[0.92rem] text-ink md:flex">
          <Link href="/" className="transition-opacity hover:opacity-60">
            Calculator
          </Link>
          <Link href="/find" className="transition-opacity hover:opacity-60">
            Find a nursery
          </Link>
          <Link href="/how-it-works" className="transition-opacity hover:opacity-60">
            How it works
          </Link>
          <Link
            href="/"
            className="rounded-full bg-accent px-5 py-2 text-[0.88rem] font-medium text-bg transition-all hover:bg-ink"
          >
            Start estimate
          </Link>
        </nav>
        <Link
          href="/"
          className="rounded-full bg-accent px-4 py-2 text-[0.85rem] font-medium text-bg md:hidden"
        >
          Start
        </Link>
      </div>
    </header>
  );
}

function CompassMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-accent"
    >
      <circle cx="14" cy="14" r="12.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M14 6L16.5 14L14 22L11.5 14L14 6Z"
        fill="currentColor"
        opacity="0.85"
      />
      <circle cx="14" cy="14" r="1.5" fill="#FAF8F5" />
    </svg>
  );
}
