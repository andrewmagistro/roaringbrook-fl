"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const photos = [
  { id: 1, src: "/family-beach.jpg", alt: "Chris Kimler with his wife and four children on the beach in Florida" },
  { id: 2, src: "/family-wesley.jpg", alt: "Chris Kimler with his son Wesley, who serves in the United States Navy" },
  { id: 3, src: "/family-abigail.jpg", alt: "Chris Kimler with his daughter Abigail at a soccer match in Tampa" },
  { id: 4, src: "/family-evan.jpg", alt: "Chris Kimler with his son Evan, an Eagle Scout" },
  { id: 5, src: "/family-zachary.jpg", alt: "Chris Kimler with his son Zachary at Merritt Island High School" },
  { id: 6, src: "/family-evan-camp.jpg", alt: "Chris Kimler with his son Evan at a Boy Scout camp" },
];

const VISIBLE = 3;

// Slot 0 sits up front, center. Slots 1 and 2 peek out from behind it,
// offset and rotated to the sides like a fanned stack of photos.
const slotStyle = [
  { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 3, opacity: 1 },
  { x: 30, y: -16, rotate: 9, scale: 0.86, zIndex: 2, opacity: 0.85 },
  { x: -30, y: -16, rotate: -9, scale: 0.78, zIndex: 1, opacity: 0.65 },
];

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
    <div
      className="relative mx-auto w-full max-w-[220px]"
      style={{ aspectRatio: "1 / 1", perspective: 800 }}
    >
      <AnimatePresence initial={false}>
        {visible.map((photo, i) => (
          <motion.img
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            initial={{ x: -40, y: 10, rotate: -14, scale: 0.6, opacity: 0, zIndex: 0 }}
            animate={slotStyle[i]}
            exit={{ x: 44, y: 22, rotate: 14, scale: 0.6, opacity: 0, zIndex: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full rounded-2xl border border-border object-cover object-top shadow-lift"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
