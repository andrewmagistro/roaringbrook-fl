"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "#practice-areas" },
  { label: "About Chris", href: "#attorneys" },
  { label: "Why Us", href: "#case-results" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#consultation" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "mt-4 w-full max-w-6xl rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-border/70 bg-cream/90 shadow-soft backdrop-blur-xl"
            : "border-cream/30 bg-cream/75 shadow-soft backdrop-blur-xl"
        )}
      >
        <div className="flex items-center justify-between gap-4 pl-6 pr-3 h-16">
          {/* Logo */}
          <a href="#" className="flex items-center group shrink-0">
            <img
              src="/logo-transparent.png"
              alt="Roaring Brook Abstract"
              className="h-11 w-auto transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3.5 py-2 text-[13.5px] font-medium text-ink-soft hover:text-navy transition-colors duration-300 rounded-full hover:bg-navy/[0.06]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a
              href="tel:3214980135"
              className="flex items-center gap-1.5 px-3 text-xs font-medium text-ink-soft hover:text-navy transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              (321) 498-0135
            </a>
            <Button variant="default" size="sm" className="pr-2" asChild>
              <a href="#consultation" className="group">
                Get Started
                <span className="ml-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-cream/20 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-navy/[0.06] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-1 px-3 pb-4 pt-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="px-4 py-3 text-sm font-medium text-ink-soft hover:text-navy hover:bg-navy/[0.06] rounded-2xl transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="mt-2 flex flex-col gap-2 px-1">
                  <a href="tel:3214980135" className="flex items-center gap-2 px-3 text-sm text-ink-soft">
                    <Phone className="h-4 w-4 text-navy" /> Melbourne: (321) 498-0135
                  </a>
                  <Button variant="default" className="w-full mt-1" asChild>
                    <a href="#consultation">Get Started Today</a>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
