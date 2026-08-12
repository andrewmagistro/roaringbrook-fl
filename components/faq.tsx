"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    category: "Title Insurance Basics",
    questions: [
      {
        q: "How does title insurance differ from other types of insurance?",
        a: "Title insurance is different from other types of insurance in that it protects you from a loss that may occur from matters or faults from the past. Other types of insurance such as auto, life, or health cover you against losses that may occur in the future. Title insurance doesn't protect you from any future faults — it looks back in time. With title insurance you pay a one-time premium at closing. It protects you from risks or undiscovered interests. There are two principal forms of title insurance: a Lender's Policy and an Owner's Policy.",
      },
      {
        q: "What is a Lender's Policy?",
        a: "A Lender's Policy protects the mortgage holder. If there is a fault in the title that results in a loss, the mortgage holder will be paid back. Most lenders require this policy as a condition of your loan.",
      },
      {
        q: "What is an Owner's Policy?",
        a: "An Owner's Policy protects you, the purchaser, against a loss that may occur from a fault in your ownership or interest you have in the property. It protects the equity in your new home with a Title Policy — and we strongly recommend every buyer obtain one.",
      },
      {
        q: "What does an Owner's Title Policy provide?",
        a: "An Owner's Title Policy provides:\n\n• Protection from financial loss due to demands that may be charged against the title to your home, up to the amount of the title policy\n• Payment of legal costs if the title insurer has to defend your title against a covered claim\n• Payment of successful claims against your home covered by the policy, up to the cost of the policy",
      },
      {
        q: "How long does my coverage last?",
        a: "Once purchased, title insurance remains in effect for as long as you own your property. You pay a one-time premium at closing — there are no monthly or annual payments. Title insurance adds security and peace of mind to home ownership.",
      },
    ],
  },
  {
    category: "Hidden Risks & Protection",
    questions: [
      {
        q: "What \"hidden risks\" are protected under a title policy?",
        a: "A title policy protects you from a wide range of hidden risks, including:\n\n• False impersonation of the true owner of the property\n• Forged deeds, releases, and other documents / fraud\n• Deeds by persons of unsound mind or by minors\n• Invalid documents completed by an expired attorney\n• Invalid deeds delivered after the death of the grantor\n• Deeds by supposedly single persons but actually married\n• Claims for unpaid inheritance and gift taxes against prior owners\n• Unrecorded easements giving another party the right to enter your property\n• Undisclosed descendants or former owners of your home or land",
      },
      {
        q: "What is a title search and why is it important?",
        a: "A title search is a thorough review of public records to trace the ownership history of a property. It uncovers issues like unpaid taxes, liens, judgments, or easements before you close. At Roaring Brook Abstract, Attorney Chris Kimler personally examines every title search to make sure your transaction is legally sound.",
      },
    ],
  },
  {
    category: "Cost & Process",
    questions: [
      {
        q: "How do I obtain title insurance and what does it cost?",
        a: "Let your realtor know you want to purchase an Owner's Title Insurance Policy. In Florida, title insurance premiums are promulgated (set) by the Florida Office of Insurance Regulation, so the rate is the same from agent to agent. You only pay this premium once. The rate depends on the purchase price of the property, and your policy amount must equal the purchase price or mortgage amount.\n\nRoaring Brook Abstract writes title insurance for First American Title Insurance Company — one of the largest and most financially secure title insurance companies in America.",
      },
      {
        q: "How long does a closing take?",
        a: "Most closings take 1–2 hours at the table. The overall timeline from signed contract to closing typically ranges from 30–60 days depending on your lender. Roaring Brook Abstract is known for fast, efficient closings — we work to get your deal done as quickly as possible.",
      },
      {
        q: "What do I bring to closing?",
        a: "You'll typically need:\n\n• A valid government-issued photo ID\n• A certified or cashier's check (or wire transfer) for your closing funds\n• Any documents your lender or attorney requested\n\nWe'll send you a complete checklist before your closing date so there are no surprises.",
      },
      {
        q: "Do I need an attorney for my closing?",
        a: "In Florida, an attorney is not required for a real estate closing, but having one is a significant advantage. Roaring Brook Abstract is attorney-led — Chris Kimler is both a licensed attorney and title agent. For transactions that require legal advice or representation beyond title work, the Law Offices of Christopher R. Kimler, PC works closely alongside us.",
      },
    ],
  },
  {
    category: "Our Services",
    questions: [
      {
        q: "Do you handle commercial real estate closings?",
        a: "Yes — in addition to residential purchases, refinances, and sales, we handle commercial real estate transactions. Contact us to discuss your specific needs.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve Brevard County and the Space Coast, including Melbourne, Palm Bay, Cocoa Beach, Satellite Beach, Indialantic, Viera, Suntree, Rockledge, Titusville, and Merritt Island. Our office is located in Melbourne, FL.",
      },
      {
        q: "Can you handle closings on evenings or weekends?",
        a: "We understand that real estate transactions don't always fit into a 9–5 schedule. We do our best to accommodate our clients' schedules — contact us to discuss your closing timeline and we'll work with you.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="text-ink font-medium text-sm md:text-base leading-snug group-hover:text-navy transition-colors">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown className="h-5 w-5 text-navy/50" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-sm leading-relaxed pb-5 whitespace-pre-line">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  return (
    <section id="faq" className="py-28 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-12"
        >
          <p className="eyebrow text-navy/70 mb-4">
            <span className="h-1 w-1 rounded-full bg-gold" /> Common questions
          </p>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-ink leading-[1.05]">
            Title insurance, <span className="italic text-navy">explained</span>.
          </h2>
          <p className="mt-4 text-ink-soft text-lg">
            Everything you need to know about title insurance and closings. Can't
            find your answer?{" "}
            <a href="#consultation" className="text-navy underline underline-offset-4 hover:text-navy-light">
              Contact us directly.
            </a>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
          >
            {faqs.map(({ category }) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-navy text-cream shadow-soft"
                    : "bg-card text-navy hover:bg-navy/[0.06] border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Questions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-card rounded-[1.6rem] border border-border p-6 md:p-8 shadow-soft"
          >
            <AnimatePresence mode="wait">
              {faqs
                .filter((f) => f.category === activeCategory)
                .map(({ category, questions }) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {questions.map(({ q, a }) => (
                      <FAQItem key={q} q={q} a={a} />
                    ))}
                  </motion.div>
                ))}
            </AnimatePresence>

            {/* CTA at bottom */}
            <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Still have questions? We're happy to help.
              </p>
              <div className="flex gap-3">
                <a
                  href="tel:3214980135"
                  className="text-sm font-medium text-navy hover:text-navy-light underline underline-offset-4 transition-colors"
                >
                  Call Us
                </a>
                <span className="text-muted-foreground">·</span>
                <a
                  href="#consultation"
                  className="text-sm font-medium text-navy hover:text-navy-light underline underline-offset-4 transition-colors"
                >
                  Contact Form
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
