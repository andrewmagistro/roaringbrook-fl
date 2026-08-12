"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const word = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden"
    >
      {/* Coastal video background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 bg-navy-deep">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source src="/hero-video-compressed.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy-deep/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="container relative z-20 mx-auto max-w-7xl px-6 pb-20 pt-36"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="eyebrow text-cream/80 mb-7"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Attorney-Led Title &amp; Closings · Serving All of Florida
        </motion.div>

        {/* Oversized editorial headline */}
        <h1 className="font-serif text-cream leading-[1.05] tracking-[-0.03em] text-[clamp(2.8rem,9vw,7.5rem)]">
          {["Close quickly.", "Done right."].map((line, li) => (
            <span key={line} className="block overflow-visible pb-1">
              <motion.span
                custom={li}
                variants={word}
                initial="hidden"
                animate="show"
                className="inline-block"
              >
                {li === 1 ? (
                  <span className="italic text-gold-light">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-6 max-w-xl text-lg leading-relaxed text-cream/75"
          >
            When you need to move quickly on your real estate transaction, tell
            your lender or realtor you want{" "}
            <span className="text-cream font-medium">Roaring Brook Abstract</span>.
            Attorney-owned and operated — we answer your calls and close your
            deal right away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="lg:col-span-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center lg:justify-end"
          >
            <Button variant="gold" size="xl" className="pr-2 group" asChild>
              <a href="#consultation">
                Start Your Closing
                <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/15 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </Button>
            <Button variant="navy-outline" size="xl" asChild>
              <a href="tel:3214980135">
                <Phone className="mr-2 h-4 w-4" />
                (321) 498-0135
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Bottom trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-cream/15 pt-7"
        >
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-sm text-cream/70">Trusted by local buyers &amp; realtors</span>
          </div>
          <span className="hidden h-4 w-px bg-cream/20 sm:block" />
          <span className="text-sm text-cream/70">BBB Accredited · A+ Rated</span>
          <span className="hidden h-4 w-px bg-cream/20 sm:block" />
          <span className="text-sm text-cream/70">Attorney &amp; Title Agent — in-house</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
