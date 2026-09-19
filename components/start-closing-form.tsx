"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, Lock } from "lucide-react";

const roles = [
  "Buyer",
  "Seller",
  "Buyer's Agent",
  "Seller's Agent (Listing Agent)",
  "Lender / Loan Officer",
  "For Sale By Owner",
  "Other",
];

const stages = [
  "We have an executed contract",
  "We're under contract but not fully signed",
  "Still negotiating",
  "Just gathering quotes",
];

const inputClass =
  "w-full rounded-2xl border border-border bg-cream px-5 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-brand focus:ring-2 focus:ring-brand/15";

export default function StartClosingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/start-closing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[1.8rem] border border-border bg-card p-12 text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/[0.08]">
          <CheckCircle2 className="h-7 w-7 text-brand" aria-hidden="true" />
        </div>
        <h3 className="mt-6 font-serif text-3xl tracking-tight text-ink">
          We&apos;ve got it.
        </h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-soft">
          Someone from our team will reach out the same business day to walk you
          through what happens next and what we&apos;ll need from you.
        </p>
        <p className="mt-6 text-sm text-ink-soft">
          Need something sooner? Call{" "}
          <a href="tel:3214980135" className="font-medium text-brand hover:underline">
            (321) 498-0135
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.8rem] border border-border bg-card p-8 md:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-ink">
            First name <span className="text-gold-dark">*</span>
          </label>
          <input id="firstName" name="firstName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-ink">
            Last name <span className="text-gold-dark">*</span>
          </label>
          <input id="lastName" name="lastName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
            Email <span className="text-gold-dark">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
            Phone <span className="text-gold-dark">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="role" className="mb-2 block text-sm font-medium text-ink">
            Your role <span className="text-gold-dark">*</span>
          </label>
          <select id="role" name="role" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select your role…
            </option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="stage" className="mb-2 block text-sm font-medium text-ink">
            Where are you in the deal? <span className="text-gold-dark">*</span>
          </label>
          <select id="stage" name="stage" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select one…
            </option>
            {stages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="propertyAddress"
            className="mb-2 block text-sm font-medium text-ink"
          >
            Property address <span className="text-ink-soft">(if you have one)</span>
          </label>
          <input
            id="propertyAddress"
            name="propertyAddress"
            placeholder="Street, city, FL, ZIP"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className="mb-2 block text-sm font-medium text-ink">
            Anything we should know?
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Target closing date, probate or trust involved, out-of-state seller, questions about cost…"
            className={inputClass}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          Something went wrong sending that. Please call{" "}
          <a href="tel:3214980135" className="font-medium underline">
            (321) 498-0135
          </a>{" "}
          and we&apos;ll get you started over the phone.
        </p>
      )}

      <div className="mt-8 flex flex-col items-start gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-ink-soft">
          <Lock className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
          No contract needed yet. We&apos;ll tell you what to send.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-light disabled:opacity-60"
        >
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "sending" ? "Sending…" : "Start my closing"}
        </button>
      </div>
    </form>
  );
}
