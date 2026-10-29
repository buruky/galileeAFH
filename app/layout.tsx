import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/app/components/SiteChrome";
import { site } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["opsz"] });
// Designed by the Braille Institute for low-vision readers; many visitors here are older.
const body = Atkinson_Hyperlegible_Next({ variable: "--font-atkinson", subsets: ["latin"] });

const description =
  "A small, caring adult family home in Mountlake Terrace, WA. Memory, hospice, mental health and respite care with 24/7 caregivers. Schedule a tour.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Galilee Adult Family Home | Mountlake Terrace, WA",
    template: "%s | Galilee Adult Family Home",
  },
  description,
  // Designed and developed by BK Web Studios · bkwebstudios.com
  authors: [{ name: "BK Web Studios", url: "https://www.bkwebstudios.com" }],
  openGraph: { type: "website", siteName: site.name, description, locale: "en_US" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ee",
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.url,
  image: `${site.url}/opengraph-image.jpg`,
  telephone: `+1-${site.phones.office}`,
  faxNumber: `+1-${site.phones.fax}`,
  email: site.emails[0],
  description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postal,
    addressCountry: "US",
  },
  // The home's Google Maps listing and pin, from the Places API
  hasMap: "https://maps.google.com/?cid=4567590431318255162",
  geo: { "@type": "GeoCoordinates", latitude: 47.7902888, longitude: -122.2895552 },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
