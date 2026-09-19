"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Phone } from "lucide-react";

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.85, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
};

const words = ["Safe.", "Simple.", "Secure."];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100dvh-5rem)] flex-col justify-end overflow-hidden"
    >
      {/* Coastal video background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 bg-brand-deep">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        >
          <source src="/hero-video-compressed.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/60 to-brand-deep/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/75 via-transparent to-transparent" />
      </motion.div>

      <div className="container relative z-20 mx-auto max-w-7xl px-6 pb-20 pt-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="eyebrow mb-7 text-cream/75"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Attorney Owned &amp; Operated · Florida Title &amp; Escrow
        </motion.p>

        <h1 className="font-serif leading-[1.02] tracking-[-0.03em] text-cream text-[clamp(3rem,9vw,7.5rem)]">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden pb-1">
              <motion.span
                custom={i}
                variants={line}
                initial="hidden"
                animate="show"
                className="inline-block"
              >
                {i === 2 ? <span className="italic text-gold-light">{w}</span> : w}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="max-w-xl text-lg leading-relaxed text-cream/75 lg:col-span-6"
          >
            Attorney owned and operated, we handle your file with care from
            contract through recording.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:col-span-6 lg:justify-end"
          >
            <Link
              href="/submit-contract"
              className="group inline-flex items-center gap-2 rounded-full bg-gold py-4 pl-7 pr-3 text-base font-semibold text-brand-deep shadow-soft transition-colors duration-300 hover:bg-gold-light"
            >
              Submit a Contract
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-deep/15 transition-transform duration-500 ease-expo group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
            <a
              href="tel:3214980135"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-4 text-base font-medium text-cream transition-colors duration-300 hover:bg-cream/10"
            >
              <Phone className="h-4 w-4" />
              (321) 498-0135
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
