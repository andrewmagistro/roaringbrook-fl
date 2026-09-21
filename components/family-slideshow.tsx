"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// TODO: swap these placeholders for real family photos, then update the
// alt text for each (e.g. "Chris with his wife and kids on Merritt Island").
const photos = [
  { id: 1, src: "/chris-kimler.jpg", alt: "The Kimler family" },
  { id: 2, src: "/chris-kimler.jpg", alt: "The Kimler family" },
  { id: 3, src: "/chris-kimler.jpg", alt: "The Kimler family" },
  { id: 4, src: "/chris-kimler.jpg", alt: "The Kimler family" },
  { id: 5, src: "/chris-kimler.jpg", alt: "The Kimler family" },
  { id: 6, src: "/chris-kimler.jpg", alt: "The Kimler family" },
];

const VISIBLE = 3;

export default function FamilySlideshow() {
  const [start, setStart] = useState(0);

  useEffect(() => {
    if (photos.length <= VISIBLE) return;
    const timer = setInterval(() => {
      setStart((s) => (s + 1) % photos.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const visible = Array.from(
    { length: Math.min(VISIBLE, photos.length) },
    (_, i) => photos[(start + i) % photos.length]
  );

  return (
    <div className="flex gap-2.5 overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        {visible.map((photo) => (
          <motion.img
            key={photo.id}
            layout
            src={photo.src}
            alt={photo.alt}
            initial={{ opacity: 0, x: 32, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -32, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-square w-1/3 shrink-0 rounded-xl border border-border object-cover object-top"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
