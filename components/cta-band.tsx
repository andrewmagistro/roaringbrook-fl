import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

export default function CtaBand({
  heading = "Ready to open your file?",
  sub = "Send us the executed contract and we'll get started today.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="bg-cream py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[1.8rem] border border-border bg-card px-8 py-12 md:flex-row md:items-center md:px-12">
          <div>
            <h2 className="font-serif text-3xl tracking-tight text-ink md:text-4xl">
              {heading}
            </h2>
            <p className="mt-3 max-w-md text-ink-soft">{sub}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/submit-contract"
              className="group inline-flex items-center gap-2 rounded-full bg-brand py-3.5 pl-6 pr-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-light"
            >
              Submit a Contract
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-expo group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <a
              href="tel:3214980135"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-cream-dark"
            >
              <Phone className="h-4 w-4 text-brand" />
              (321) 498-0135
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
