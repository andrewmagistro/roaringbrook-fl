"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// TODO: swap these placeholders for real family photos, then update the
// alt text for each (e.g. "Chris with his wife and kids on Merritt Island").
const photos = [
  { src: "/chris-kimler.jpg", alt: "The Kimler family" },
  { src: "/chris-kimler.jpg", alt: "The Kimler family" },
  { src: "/chris-kimler.jpg", alt: "The Kimler family" },
];

export default function FamilySlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative mb-6 overflow-hidden rounded-[1.2rem] border border-border"
      style={{ aspectRatio: "16/9" }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={photos[index].src}
          alt={photos[index].alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </AnimatePresence>
    </div>
  );
}
