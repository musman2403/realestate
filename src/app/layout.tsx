import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// SEO Metadata Configuration
export const metadata: Metadata = {
  metadataBase: new URL("https://vitalestates.pk"),
  title: {
    default: "Vital Estates & Builders | Premium Real Estate in Lahore",
    template: "%s | Vital Estates",
  },
  description:
    "Sell faster. Buy smarter. Own real value in Lahore with trusted property advisors. Documentation-first approach for transparent real estate transactions.",
  keywords: [
    "real estate lahore",
    "property dealer lahore",
    "buy property lahore",
    "sell property lahore",
    "rent property lahore",
    "vital estates",
    "property advisors pakistan",
    "dha lahore property",
    "bahria town lahore",
  ],
  authors: [{ name: "Vital Estates & Builders" }],
  creator: "Vital Estates",
  publisher: "Vital Estates & Builders",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://vitalestates.pk",
    siteName: "Vital Estates & Builders",
    title: "Vital Estates & Builders | Premium Real Estate in Lahore",
    description:
      "Sell faster. Buy smarter. Own real value in Lahore with trusted property advisors.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vital Estates - Premium Real Estate in Lahore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vital Estates & Builders | Premium Real Estate in Lahore",
    description:
      "Sell faster. Buy smarter. Own real value in Lahore with trusted property advisors.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://vitalestates.pk",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Vital Estates & Builders",
  description:
    "Premium real estate services in Lahore. Buy, sell, or rent properties with trusted advisors.",
  url: "https://vitalestates.pk",
  telephone: "+92-XXX-XXXXXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lahore",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    postalCode: "54000",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "31.5204",
    longitude: "74.3587",
  },
  areaServed: {
    "@type": "City",
    name: "Lahore",
  },
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "50",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
