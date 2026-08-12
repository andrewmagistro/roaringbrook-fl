import { Phone, Mail, MapPin, Linkedin } from "lucide-react";

const serviceLinks = [
  "Title Insurance Policies",
  "Title Searches",
  "Title Examination",
  "Real Estate Closings",
  "Real Property Law",
];

const resourceLinks = [
  { label: "First American Corporation", href: "https://www.firstam.com" },
  { label: "American Land Title Association", href: "https://www.alta.org" },
  { label: "Florida Office of Insurance Regulation", href: "https://www.floir.com" },
  { label: "Florida Land Title Association", href: "https://www.flta.org" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep">
      {/* Top CTA band */}
      <div className="border-b border-cream/10 py-14">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-cream font-serif text-3xl md:text-4xl tracking-tight">
              Ready to close your deal?
            </h3>
            <p className="text-cream/50 text-sm mt-2">
              Fast, attorney-owned title services — calls returned same day.
            </p>
          </div>
          <a
            href="#consultation"
            className="flex-shrink-0 inline-flex items-center px-8 py-3.5 bg-gold hover:bg-gold-dark text-ink font-semibold rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-soft active:scale-[0.97]"
          >
            Contact Us Today
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-6 max-w-7xl py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <p className="font-serif text-2xl leading-tight tracking-tight text-cream">
                Roaring Brook
                <span className="block text-base uppercase tracking-[0.25em] text-gold/90">
                  Abstract
                </span>
              </p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Attorney-led title work and closings for buyers, sellers, lenders,
              and realtors across Brevard County and the Space Coast.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-gold/10 text-white/50 hover:text-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Our Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#practice-areas"
                    className="text-white/50 hover:text-gold text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-gold text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Our Offices
            </h4>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium text-sm">Melbourne Office</p>
                  <p className="text-white/40 text-xs mt-0.5">
                    [Melbourne, FL address — coming soon]<br />Brevard County, FL
                  </p>
                  <a
                    href="tel:3214980135"
                    className="flex items-center gap-1.5 text-gold text-xs mt-1.5 hover:underline"
                  >
                    <Phone className="h-3 w-3" /> (321) 498-0135
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/80 text-sm">crkimler@kimlerlaw.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <p>© 2026 Roaring Brook Abstract. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
