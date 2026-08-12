"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Calculator, Home, KeyRound } from "lucide-react";

/* ----------------------------- FL fee formulas ----------------------------- */

// Florida promulgated owner's/lender's title insurance premium (OIR rates).
function titlePremium(amount: number): number {
  if (amount <= 0) return 0;
  let p = 0;
  const tier = (lo: number, hi: number, rate: number) => {
    if (amount > lo) p += (Math.min(amount, hi) - lo) * rate;
  };
  tier(0, 100_000, 5.75 / 1000);
  tier(100_000, 1_000_000, 5.0 / 1000);
  tier(1_000_000, 5_000_000, 2.5 / 1000);
  tier(5_000_000, 10_000_000, 2.25 / 1000);
  if (amount > 10_000_000) p += (amount - 10_000_000) * (2.0 / 1000);
  return p;
}

// Documentary stamp tax on the deed: $0.70 per $100 (Brevard County).
const deedDocStamps = (price: number) => Math.ceil(Math.max(price, 0) / 100) * 0.7;
// Documentary stamp tax on the note: $0.35 per $100.
const noteDocStamps = (loan: number) => Math.ceil(Math.max(loan, 0) / 100) * 0.35;
// Intangible tax on the mortgage: $2.00 per $1,000 (0.2%).
const intangibleTax = (loan: number) => Math.max(loan, 0) * 0.002;

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/* --------------------------------- inputs --------------------------------- */

function Field({
  label,
  value,
  onChange,
  prefix = "$",
  suffix,
  step = 1000,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-soft">
        {label}
      </span>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 transition-colors focus-within:border-navy/40">
        {prefix && <span className="text-sm text-ink-soft">{prefix}</span>}
        <input
          type="number"
          min={0}
          step={step}
          value={value === 0 ? "" : value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          placeholder="0"
          className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-soft/50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix && <span className="text-sm text-ink-soft">{suffix}</span>}
      </div>
    </label>
  );
}

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <div>
        <p className="text-sm text-cream/90">{label}</p>
        {sub && <p className="text-xs text-cream/40">{sub}</p>}
      </div>
      <p className="font-serif text-base tabular-nums text-cream">{value}</p>
    </div>
  );
}

/* -------------------------------- component -------------------------------- */

export default function NetSheet() {
  const [mode, setMode] = useState<"seller" | "buyer">("seller");

  // Seller inputs
  const [price, setPrice] = useState(450_000);
  const [payoff, setPayoff] = useState(220_000);
  const [commissionPct, setCommissionPct] = useState(6);

  // Buyer inputs
  const [bPrice, setBPrice] = useState(450_000);
  const [loan, setLoan] = useState(360_000);

  const seller = useMemo(() => {
    const commission = (price * commissionPct) / 100;
    const ownersTitle = titlePremium(price);
    const docStamps = deedDocStamps(price);
    const settlement = 600; // estimated closing/settlement fee
    const misc = 250; // estimated recording, courier, search fees
    const costs = commission + ownersTitle + docStamps + settlement + misc;
    const net = price - payoff - costs;
    return { commission, ownersTitle, docStamps, settlement, misc, costs, net };
  }, [price, payoff, commissionPct]);

  const buyer = useMemo(() => {
    const down = Math.max(bPrice - loan, 0);
    const lendersTitle = loan > 0 ? Math.max(titlePremium(loan) * 0.3, 0) : 0; // simultaneous-issue est.
    const noteStamps = noteDocStamps(loan);
    const intangible = intangibleTax(loan);
    const recording = 200;
    const settlement = 600;
    const closingCosts = lendersTitle + noteStamps + intangible + recording + settlement;
    const cashToClose = down + closingCosts;
    return { down, lendersTitle, noteStamps, intangible, recording, settlement, closingCosts, cashToClose };
  }, [bPrice, loan]);

  return (
    <section id="net-sheet" className="relative bg-background py-28">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-12 max-w-2xl"
        >
          <p className="eyebrow text-navy/70 mb-4">
            <span className="h-1 w-1 rounded-full bg-gold" /> Net Sheet
          </p>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-6xl">
            Estimate your <span className="italic text-navy">closing costs</span>.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            A quick Florida estimate for buyers and sellers in Brevard County. For an exact
            figure on your transaction, just reach out — we'll prepare a detailed net sheet.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="grid gap-5 lg:grid-cols-5"
        >
          {/* Inputs */}
          <div className="lg:col-span-3">
            <div className="rounded-[1.6rem] border border-border bg-card p-2.5">
              <div className="rounded-inner bg-cream p-7">
                {/* mode toggle */}
                <div className="mb-7 inline-flex rounded-full border border-border bg-card p-1">
                  {([
                    { key: "seller", label: "I'm Selling", icon: Home },
                    { key: "buyer", label: "I'm Buying", icon: KeyRound },
                  ] as const).map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setMode(key)}
                      className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                        mode === key
                          ? "bg-navy text-cream shadow-soft"
                          : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </div>

                {mode === "seller" ? (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Sale Price" value={price} onChange={setPrice} />
                    <Field label="Mortgage Payoff" value={payoff} onChange={setPayoff} />
                    <Field
                      label="Commission"
                      value={commissionPct}
                      onChange={setCommissionPct}
                      prefix=""
                      suffix="%"
                      step={0.5}
                    />
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Purchase Price" value={bPrice} onChange={setBPrice} />
                    <Field label="Loan Amount" value={loan} onChange={setLoan} />
                  </div>
                )}

                <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
                  <Calculator className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark" />
                  Estimate only. Uses Florida's promulgated title rates and Brevard County
                  customary fees. Actual costs vary by contract, lender, and prorations.
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            <div className="h-full rounded-[1.6rem] bg-navy-deep p-8">
              {mode === "seller" ? (
                <>
                  <p className="text-xs uppercase tracking-wider text-cream/50">
                    Estimated Seller Net
                  </p>
                  <p className="mt-1 font-serif text-4xl tracking-tight text-gold">
                    {usd(seller.net)}
                  </p>
                  <div className="mt-6 divide-y divide-white/10 border-t border-white/10">
                    <Row label="Sale price" value={usd(price)} />
                    <Row label="Mortgage payoff" value={`– ${usd(payoff)}`} />
                    <Row label={`Commission (${commissionPct}%)`} value={`– ${usd(seller.commission)}`} />
                    <Row label="Owner's title policy" value={`– ${usd(seller.ownersTitle)}`} sub="FL promulgated rate" />
                    <Row label="Doc stamps on deed" value={`– ${usd(seller.docStamps)}`} sub="$0.70 / $100" />
                    <Row label="Settlement & recording" value={`– ${usd(seller.settlement + seller.misc)}`} sub="estimated" />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs uppercase tracking-wider text-cream/50">
                    Estimated Cash to Close
                  </p>
                  <p className="mt-1 font-serif text-4xl tracking-tight text-gold">
                    {usd(buyer.cashToClose)}
                  </p>
                  <div className="mt-6 divide-y divide-white/10 border-t border-white/10">
                    <Row label="Down payment" value={usd(buyer.down)} />
                    <Row label="Lender's title policy" value={usd(buyer.lendersTitle)} sub="simultaneous-issue est." />
                    <Row label="Doc stamps on note" value={usd(buyer.noteStamps)} sub="$0.35 / $100" />
                    <Row label="Intangible tax" value={usd(buyer.intangible)} sub="$2.00 / $1,000" />
                    <Row label="Recording" value={usd(buyer.recording)} sub="estimated" />
                    <Row label="Settlement fee" value={usd(buyer.settlement)} sub="estimated" />
                  </div>
                </>
              )}

              <a
                href="#consultation"
                className="mt-7 flex w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-gold-light active:scale-[0.97]"
              >
                Get an exact net sheet
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
