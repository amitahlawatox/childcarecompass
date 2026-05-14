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
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${plex.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
