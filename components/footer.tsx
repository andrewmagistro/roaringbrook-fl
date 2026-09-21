import Link from "next/link";
import { Phone, Mail, MapPin, Linkedin, ArrowUpRight } from "lucide-react";

const audienceLinks = [
  { label: "Realtors", href: "/realtors" },
  { label: "Lenders", href: "/lenders" },
  { label: "Buyers & Sellers", href: "/buyers-sellers" },
  { label: "Meet Chris Kimler", href: "/about" },
];

const siteLinks = [
  { label: "FAQs", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Start Your Closing", href: "/start-closing" },
  { label: "Submit a Contract", href: "/submit-contract" },
];

const resourceLinks = [
  { label: "First American Title", href: "https://www.firstam.com" },
  { label: "American Land Title Association", href: "https://www.alta.org" },
  { label: "Florida Land Title Association", href: "https://www.flta.org" },
  { label: "Florida Office of Insurance Regulation", href: "https://www.floir.com" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-deep">
      {/* Top CTA band */}
      <div className="border-b border-white/10 py-14">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <div>
            <h2 className="font-serif text-3xl tracking-tight text-cream md:text-4xl">
              Ready to close your deal?
            </h2>
            <p className="mt-2 text-sm text-cream/50">
              Attorney owned and operated — calls returned the same day.
            </p>
          </div>
          <Link
            href="/submit-contract"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gold py-3.5 pl-7 pr-2.5 font-semibold text-brand-deep shadow-soft transition-colors duration-300 hover:bg-gold-light"
          >
            Submit a Contract
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-deep/15 transition-transform duration-500 ease-expo group-hover:rotate-45">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <img
              src="/logo-rb-horizontal.png"
              alt="Roaring Brook Title and Escrow Agency"
              className="h-16 w-auto"
            />
            <p className="mt-6 text-sm leading-relaxed text-white/50">
              Attorney owned and operated title, escrow, and closing services
              for buyers, sellers, realtors, and lenders based in Brevard
              County and servicing all 67 counties in Florida.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.linkedin.com/company/roaring-brook-title-and-escrow/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white/5 p-2 text-white/50 transition-colors hover:bg-gold/10 hover:text-gold"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Who we serve + site */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Who we serve
            </h3>
            <ul className="space-y-3">
              {audienceLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 transition-colors hover:text-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-5 mt-8 text-sm font-semibold uppercase tracking-widest text-white">
              Site
            </h3>
            <ul className="space-y-3">
              {siteLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 transition-colors hover:text-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/50 transition-colors hover:text-gold"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Office */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-white">
              Our home office in Brevard County — or any of our satellite
              offices serving all 67 counties in Florida
            </h3>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-white">Melbourne Office</p>
                  <p className="mt-0.5 text-xs text-white/40">
                    1900 Building
                    <br />
                    1900 South Harbor City Boulevard, Suite 200
                    <br />
                    Melbourne, FL 32901
                  </p>
                  <a
                    href="tel:3214980135"
                    className="mt-1.5 flex items-center gap-1.5 text-xs text-gold hover:underline"
                  >
                    <Phone className="h-3 w-3" /> (321) 498-0135
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href="mailto:chris@kimlerlaw.com"
                  className="text-sm text-white/80 transition-colors hover:text-gold"
                >
                  chris@kimlerlaw.com
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <p className="text-sm text-white/80">Closings Done Statewide</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-white/30 md:flex-row">
          <p>
            © {new Date().getFullYear()} Roaring Brook Title and Escrow Agency.
            All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-gold">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-gold">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
