"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Realtors", href: "/realtors" },
  { label: "Lenders", href: "/lenders" },
  { label: "Buyers & Sellers", href: "/buyers-sellers" },
  { label: "Meet Chris Kimler", href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center" aria-label="Roaring Brook Title and Escrow Agency — home">
          <img
            src="/logo-rb-nav.png"
            alt="Roaring Brook Title and Escrow Agency"
            className="h-10 w-auto transition-opacity duration-300 group-hover:opacity-85"
          />
        </Link>

        {/* Desktop tabs */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-300 xl:text-sm",
                  active
                    ? "text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-gold"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <a
            href="tel:3214980135"
            className="hidden items-center gap-1.5 whitespace-nowrap px-1 text-sm font-medium text-white/70 transition-colors hover:text-white 2xl:flex"
            aria-label="Call (321) 498-0135"
          >
            <Phone className="h-3.5 w-3.5" />
            (321) 498-0135
          </a>
          <Link
            href="/start-closing"
            className="whitespace-nowrap rounded-full border border-white/25 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/10 xl:px-5"
          >
            Start Your Closing
          </Link>
          <Link
            href="/submit-contract"
            className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gold py-2.5 pl-4 pr-2 text-[13px] font-semibold text-brand-deep shadow-soft transition-colors duration-300 hover:bg-gold-light xl:pl-5 xl:pr-2.5"
          >
            Submit a Contract
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep/15 transition-transform duration-500 ease-expo group-hover:rotate-45">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
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
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-brand lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:3214980135"
                className="mt-1 flex items-center gap-2 px-4 py-3 text-sm text-white/70"
              >
                <Phone className="h-4 w-4 text-gold" /> (321) 498-0135
              </a>
              <Link
                href="/start-closing"
                onClick={() => setMenuOpen(false)}
                className="mt-1 rounded-full border border-white/25 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Start Your Closing
              </Link>
              <Link
                href="/submit-contract"
                onClick={() => setMenuOpen(false)}
                className="mt-1 rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-brand-deep"
              >
                Submit a Contract
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
