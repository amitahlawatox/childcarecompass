import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://childcarecompass.co.uk"),
  title: {
    default: "Childcare Compass — The real cost of UK childcare",
    template: "%s · Childcare Compass",
  },
  description:
    "Find the real monthly cost of UK childcare after government funding and Tax-Free Childcare. No signup. No email. No data collected, ever.",
  keywords: [
    "UK childcare cost calculator",
    "nursery cost calculator UK",
    "30 hours free childcare",
    "Tax-Free Childcare calculator",
    "real childcare cost UK",
  ],
  openGraph: {
    title: "Childcare Compass — The real cost of UK childcare",
    description:
      "Find the real monthly cost of UK childcare after government funding. No signup, no data captured.",
    url: "https://childcarecompass.co.uk",
    siteName: "Childcare Compass",
    locale: "en_GB",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://childcarecompass.co.uk/#organization",
        name: "Childcare Compass",
        url: "https://childcarecompass.co.uk",
        description:
          "An independent UK childcare affordability service. Free childcare cost calculator and Ofsted-registered nursery finder, with zero personal data collected.",
      },
      {
        "@type": "WebSite",
        "@id": "https://childcarecompass.co.uk/#website",
        url: "https://childcarecompass.co.uk",
        name: "Childcare Compass",
        publisher: { "@id": "https://childcarecompass.co.uk/#organization" },
        inLanguage: "en-GB",
      },
      {
        "@type": "WebApplication",
        name: "UK Childcare Cost Calculator",
        url: "https://childcarecompass.co.uk/calculator",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
        description:
          "Free calculator showing the real monthly cost of UK childcare after 15/30 funded hours, Tax-Free Childcare, and salary sacrifice.",
      },
    ],
  };

  return (
    <html lang="en-GB" className={`${fraunces.variable} ${plex.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
