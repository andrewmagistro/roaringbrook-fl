import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
        {children}
        <script src="https://www.google.com/recaptcha/api.js?render=6Le1-4ItAAAAADafk3549bl24rTRVN9V8a0q4kGo" async defer />
      </body>
    </html>
  );
}
