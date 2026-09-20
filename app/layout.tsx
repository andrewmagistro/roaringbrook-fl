import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roaring Brook Title & Escrow | Brevard County, FL Title Insurance & Closings",
  description:
    "Attorney-led title insurance, title searches, examination, and real estate closings in Melbourne and Brevard County, FL. Owned and run by attorney Chris Kimler.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TitleInsuranceAgency",
  name: "Roaring Brook Title & Escrow Agency",
  founder: {
    "@type": "Person",
    name: "Christopher R. Kimler, Esq",
  },
  telephone: "+1-321-498-0135",
  email: "chris@kimlerlaw.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1900 South Harbor City Boulevard, Suite 200 (1900 Building)",
    addressLocality: "Melbourne",
    addressRegion: "FL",
    postalCode: "32901",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Melbourne, FL" },
    { "@type": "City", name: "Satellite Beach, FL" },
    { "@type": "City", name: "Cocoa Beach, FL" },
    { "@type": "City", name: "Merritt Island, FL" },
    { "@type": "AdministrativeArea", name: "Brevard County, FL" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased">
        {/* Film-grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Chatbot />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script src="https://www.google.com/recaptcha/api.js?render=6Le1-4ItAAAAADafk3549bl24rTRVN9V8a0q4kGo" async defer />
      </body>
    </html>
  );
}
