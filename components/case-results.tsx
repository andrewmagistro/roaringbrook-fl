"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Phone, Clock, Users, Shield, CheckCircle, Star } from "lucide-react";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const reasons = [
  { icon: Phone, title: "We Answer Our Phones", description: "No waiting a week for a callback. Chris and his team are available to answer your questions and keep your transaction moving forward." },
  { icon: Clock, title: "Fast Closings", description: "Time is critical in real estate. We work efficiently to get your deal closed right away — without cutting corners." },
  { icon: Shield, title: "Attorney-Owned & Operated", description: "As a licensed attorney, Chris personally examines every title. When legal issues arise, you already have an attorney on your team." },
  { icon: Users, title: "Your Deal Stays With Us", description: "We never push your matter off on someone else. Every client gets personal attention from our experienced staff." },
  { icon: Star, title: "BBB A+ Accredited", description: "An A+ rating from the Better Business Bureau reflects our commitment to honest, quality service." },
  { icon: CheckCircle, title: "One-Stop Solution", description: "From title search to closing — and legal representation if needed — we handle everything through our affiliate law office." },
];

const stats = [
  { display: "2", label: "Convenient Offices", isCount: false },
  { display: "A+", label: "BBB Rating", isCount: false },
  { display: "100", label: "Commitment", isCount: true, suffix: "%" },
  { display: "1", label: "Call to Get Started", isCount: false },
];

export default function CaseResults() {
  return (
    <section id="case-results" className="relative overflow-hidden bg-background py-28">
      <div className="container relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="eyebrow text-navy/70 mb-4">
              <span className="h-1 w-1 rounded-full bg-gold" /> Why choose us
            </p>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-6xl">
              Built for clients who <span className="italic text-navy">can't wait</span>.
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">
            Whether you're buying or selling, choose Roaring Brook Abstract for
            your next real estate closing.
          </p>
        </motion.div>

        {/* Stats band */}
        <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-[1.6rem] border border-border bg-border md:grid-cols-4">
          {stats.map(({ display, label, isCount, suffix }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-card px-4 py-8 text-center"
            >
              <div className="font-serif text-4xl text-navy md:text-5xl">
                {isCount ? <CountUp target={parseInt(display)} suffix={suffix} /> : display}
              </div>
              <div className="mt-2 text-sm text-ink-soft">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Reasons grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group rounded-[1.6rem] border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/[0.06] transition-colors duration-500 group-hover:bg-gold/15">
                <Icon className="h-6 w-6 text-navy transition-colors duration-500 group-hover:text-gold-dark" />
              </div>
              <h3 className="mt-6 font-serif text-xl tracking-tight text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
