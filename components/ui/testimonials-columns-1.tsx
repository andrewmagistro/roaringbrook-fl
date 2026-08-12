"use client";
import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  name: string;
  role: string;
};

const avatarColors = [
  "bg-blue-500",
  "bg-navy",
  "bg-emerald-600",
  "bg-violet-600",
  "bg-rose-500",
  "bg-amber-600",
  "bg-teal-600",
  "bg-indigo-500",
  "bg-pink-600",
];

function InitialAvatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const color = avatarColors[index % avatarColors.length];
  return (
    <div className={`h-10 w-10 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
      <span className="text-white text-sm font-semibold">{initials}</span>
    </div>
  );
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, name, role }, i) => (
              <div
                className="p-8 rounded-2xl border border-border shadow-lg shadow-primary/5 max-w-xs w-full bg-white"
                key={i}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-sm text-foreground/80 leading-relaxed italic">
                  &ldquo;{text}&rdquo;
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
                  <InitialAvatar name={name} index={i} />
                  <div className="flex flex-col">
                    <div className="font-semibold text-navy text-sm leading-5">{name}</div>
                    <div className="text-xs text-muted-foreground leading-5">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
