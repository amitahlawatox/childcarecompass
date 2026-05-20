import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBF7F1",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://childcarecompass.co.uk"),
  title: {
    default:
      "UK Childcare Cost Calculator — Your Real Monthly Bill After Funding",
    template: "%s · Childcare Compass",
  },
  description:
    "Free UK childcare cost calculator. See what you'll really pay each month after 15/30 hours funded childcare, Tax-Free Childcare, and salary sacrifice. No signup, no data stored. Search 27,000+ Ofsted-registered nurseries.",
  keywords: [
    "UK childcare cost calculator",
    "nursery cost calculator UK",
    "30 hours free childcare",
    "Tax-Free Childcare calculator",
    "real childcare cost UK",
    "Ofsted nursery finder",
    "childcare funding 2026",
  ],
  authors: [{ name: "Childcare Compass" }],
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
  twitter: {
    card: "summary_large_image",
    title: "UK Childcare Cost Calculator — Childcare Compass",
    description:
      "See your real monthly childcare bill after every government scheme is applied. No signup, no data stored.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD structured data — graph of Organization, WebSite, WebApplication, and FAQ.
  // The FAQPage schema is what unlocks "People also ask" style rich results in Google.
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
        logo: "https://childcarecompass.co.uk/icon.svg",
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
        "@id": "https://childcarecompass.co.uk/#calculator",
        name: "UK Childcare Cost Calculator",
        url: "https://childcarecompass.co.uk/",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
        description:
          "Free calculator showing the real monthly cost of UK childcare after 15/30 funded hours, Tax-Free Childcare, and salary sacrifice.",
        featureList: [
          "15 and 30 hours funded childcare",
          "Tax-Free Childcare",
          "Salary sacrifice (tax-band aware)",
          "Weekly schedule planning",
          "Side-by-side scenario comparison",
          "PDF download with reference code",
          "Shareable link",
          "No signup or data collection",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does childcare cost in the UK?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Full-time nursery in the UK averages £1,000–£1,600 per month before any funding, depending on region. London is highest at around £1,500–£1,700. After 30 hours of funded childcare and Tax-Free Childcare, most working families pay 60–80% less than that advertised price.",
            },
          },
          {
            "@type": "Question",
            name: "Who is eligible for 30 hours of free childcare?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "From September 2025, working parents of children aged 9 months to school age can claim 30 funded hours per week in England. Both parents (or the sole parent) must earn at least the equivalent of 16 hours/week at minimum wage, and neither parent can have adjusted net income over £100,000.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use Tax-Free Childcare and salary sacrifice together?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Tax-Free Childcare and childcare-voucher salary sacrifice are mutually exclusive — you choose one. Salary sacrifice is also closed to new entrants since October 2018, so most parents today use Tax-Free Childcare instead.",
            },
          },
          {
            "@type": "Question",
            name: "Does Childcare Compass collect personal data?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. We don't ask for your name, email, phone number, child's name, or exact income. Everything runs in your browser — no inputs are sent to a server or stored. The calculator works exactly the same whether you're signed in or in incognito mode.",
            },
          },
          {
            "@type": "Question",
            name: "How accurate is the childcare cost calculator?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We apply the official UK government funding rules in force as of " +
                "January 2026, using published regional average nursery rates as the base cost. Your nursery's actual fees may differ — they may charge for food, nappies, or top up funded hours. Always confirm the final figure with your nursery and the official gov.uk/childcare-calculator before signing a contract.",
            },
          },
        ],
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
