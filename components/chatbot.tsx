"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Phone } from "lucide-react";

type Message = {
  from: "bot" | "user";
  text: string;
};

const faqs: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["title insurance", "what is title", "why do i need title"],
    answer:
      "Title insurance protects you and your lender from financial loss due to defects in a property's title — things like unpaid liens, ownership disputes, or errors in public records. It's a one-time premium paid at closing that protects you for as long as you own the property.",
  },
  {
    keywords: ["title search", "what is a title search"],
    answer:
      "A title search is a review of public records to trace the ownership history of a property and uncover any issues — like unpaid taxes, judgments, or easements — before you close. At Roaring Brook, Attorney Chris Kimler personally examines every title search.",
  },
  {
    keywords: ["how long", "closing take", "how long does"],
    answer:
      "Most closings take 1–2 hours at the table. The timeline from contract to closing typically ranges from 30–60 days depending on your lender. Roaring Brook is known for fast, efficient closings — we work to get your deal done as quickly as possible.",
  },
  {
    keywords: ["bring to closing", "what do i need", "what to bring"],
    answer:
      "You'll typically need: a valid government-issued photo ID, a certified or cashier's check (or wire transfer) for your closing funds, and any documents your lender or attorney requested. We'll send you a full checklist before your closing date.",
  },
  {
    keywords: ["cost", "fee", "how much", "price", "charge"],
    answer:
      "Fees vary depending on the transaction type and purchase price. Contact us directly for a quote — call (321) 498-0135 and we'll give you a clear breakdown with no surprises.",
  },
  {
    keywords: ["order title", "start", "get started", "how do i order"],
    answer:
      "To order title, just call us or fill out the contact form on this page. Our team will reach out right away to get your transaction started. Call: (321) 498-0135.",
  },
  {
    keywords: ["location", "located", "address", "where are you", "office"],
    answer:
      "We're located in Melbourne, FL, serving Brevard County and the Space Coast.\n\n📍 [Melbourne, FL office address — coming soon]\n📞 (321) 498-0135",
  },
  {
    keywords: ["area", "county", "serve", "coverage", "where do you"],
    answer:
      "We proudly serve Brevard County and the Space Coast, including Melbourne, Palm Bay, Cocoa Beach, Satellite Beach, Indialantic, Viera, Suntree, Rockledge, Titusville, Merritt Island, and surrounding communities.",
  },
  {
    keywords: ["chris", "attorney", "kimler", "lawyer", "who is"],
    answer:
      "Chris Kimler is a licensed attorney and title agent who owns and operates Roaring Brook Abstract. He limits his law practice to real property and title — and personally examines every title. He's also a shareholder in the Law Offices of Christopher R. Kimler, PC.",
  },
  {
    keywords: ["refinance", "refi"],
    answer:
      "Yes, we handle refinance closings! Contact us at (321) 498-0135 and we'll get your refinance moving quickly.",
  },
  {
    keywords: ["hours", "open", "when", "available"],
    answer:
      "Our offices are open Monday–Friday, 9 AM–5 PM. We're also available for urgent matters outside regular hours. Give us a call and we'll do our best to accommodate your schedule.",
  },
  {
    keywords: ["probate", "trust", "estate", "will"],
    answer:
      "Chris Kimler handles real property matters through the Law Offices of Christopher R. Kimler, PC. For legal questions specific to your situation, please call Chris directly at (321) 498-0135 so he can advise you properly.",
  },
];

const GREETING =
  "Hi! I'm the Roaring Brook Abstract virtual assistant. I can answer common questions about title insurance, closings, and our services.\n\nFor legal advice specific to your situation, please call Attorney Chris Kimler directly.\n\nHow can I help you today?";

const QUICK_QUESTIONS = [
  "What is title insurance?",
  "How long does a closing take?",
  "Where are your offices?",
  "How do I order title?",
];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();

  for (const faq of faqs) {
    if (faq.keywords.some((k) => lower.includes(k))) {
      return faq.answer;
    }
  }

  if (
    lower.includes("legal advice") ||
    lower.includes("lawsuit") ||
    lower.includes("sue") ||
    lower.includes("dispute") ||
    lower.includes("court")
  ) {
    return "For legal questions specific to your situation, please contact Attorney Chris Kimler directly — that's exactly what he's here for.\n\n📞 (321) 498-0135\n\nThis chat is for general information only and does not constitute legal advice.";
  }

  if (lower.includes("thank")) {
    return "You're welcome! Is there anything else I can help you with? For specific questions, feel free to call us at (321) 498-0135.";
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hi there! How can I help you today? I can answer questions about title insurance, closings, our services, or office locations.";
  }

  return "That's a great question! For the most accurate answer, I'd recommend calling us directly:\n\n📞 (321) 498-0135\n\nOr fill out the contact form on this page and we'll get back to you right away.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { from: "user", text };
    const botMsg: Message = { from: "bot", text: getBotResponse(text) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-navy rounded-full shadow-teal flex items-center justify-center text-cream"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[350px] bg-card rounded-[1.4rem] shadow-lift overflow-hidden border border-border flex flex-col"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="bg-navy-deep px-5 py-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 font-serif text-gold-light">R</span>
              <div className="flex-1">
                <p className="text-cream font-semibold text-sm">Roaring Brook Abstract</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-white/60 text-xs">Online now</span>
                </div>
              </div>
              <a href="tel:3214980135" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Phone className="h-4 w-4 text-white" />
              </a>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border-b border-amber-100 px-4 py-2">
              <p className="text-amber-700 text-[10px] leading-relaxed">
                ⚠️ For general information only — not legal advice. For legal questions call Chris Kimler directly.
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.from === "user"
                        ? "bg-navy text-white rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 bg-navy/5 hover:bg-navy/10 text-navy rounded-full border border-navy/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Ask a question..."
                className="flex-1 text-sm px-4 py-2.5 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-navy/20"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim()}
                className="w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center hover:bg-navy-dark transition-colors disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
