"use client";

import { motion } from "motion/react";
import {
  TestimonialsColumn,
  type Testimonial,
} from "@/components/ui/testimonials-columns-1";

const testimonials: Testimonial[] = [
  {
    text: "Attorney Chris Kimler and his assistant Patti are the most competent team when it comes to Real Estate closings!! Excellent representation, professional, knowledgeable and as a real estate broker with over 35 years experience I believe they are the very Best!! HIGHLY RECOMMENDING THEM!!",
    name: "Denise J. Fey",
    role: "Real Estate Broker, 35+ Years Experience",
  },
  {
    text: "Exceptional service from start to finish! The team at Roaring Brook made my home purchasing process incredibly smooth and stress-free. Their expertise and dedication were evident throughout, ensuring every detail was handled efficiently.",
    name: "Juan Garces",
    role: "Home Buyer",
  },
  {
    text: "Chris Kimler and staff at Roaring Brook were a pleasure to work with. They made my house closing process easy, smooth, and efficient.",
    name: "Janine Basile",
    role: "Home Buyer",
  },
  {
    text: "My wife and I used Roaring Brook Title & Escrow on two occasions. Both times we had a pleasant experience. Chris and Patti were very informative and professional, which made the process very easy. They were helpful and informative for our big purchase.",
    name: "DJ Gozzi",
    role: "Home Buyer",
  },
  {
    text: "I've done business with Roaring Brook Title & Escrow for years and have always been very satisfied. The office staff is exceptionally responsive, helpful and always kind. Chris Kimler, the Attorney, goes above and beyond for me and my clients.",
    name: "Sarah Tigue",
    role: "Real Estate Agent",
  },
  {
    text: "Chris and his team are nothing short of excellent. I've worked with them many times in the world of real estate and can say they have consistently delivered every single time. I highly recommend them for a real estate transaction.",
    name: "Zachary Ranner",
    role: "Real Estate Professional",
  },
  {
    text: "Excellent customer service and care given to my buyers. As a Realtor, the updates from Roaring Brook Title & Escrow as to progress of closing were 100% on point keeping me informed. Feel confident referring your buyers to this company!",
    name: "Lora Ubaldi",
    role: "Realtor",
  },
  {
    text: "Chris and Patti at Roaring Brook Title & Escrow handled our closing very efficiently and professionally and were a pleasure to work with. They handled all the paperwork as required, kept us informed along the way, and explained everything clearly.",
    name: "Michael Ando",
    role: "Home Buyer",
  },
  {
    text: "Easiest and most efficient home closing of my life! Seamless and professional. Chris and staff are the utmost professionals. Highly recommend.",
    name: "Janis Cernese",
    role: "Home Buyer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-background py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[600px] mx-auto mb-4"
        >
          <p className="eyebrow text-navy/70 mb-4">
            <span className="h-1 w-1 rounded-full bg-gold" /> Client reviews
          </p>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-ink text-center leading-[1.05]">
            Trusted, <span className="italic text-navy">deal after deal</span>.
          </h2>
          <div className="flex items-center justify-center gap-1 mt-5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 fill-gold text-gold" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-ink font-semibold text-sm">5.0</span>
            <span className="text-ink-soft text-sm ml-1">· 150+ Google Reviews</span>
          </div>
          <p className="text-center mt-4 text-ink-soft">
            Buyers, sellers, realtors, and lenders trust Roaring Brook Title & Escrow
            for every transaction.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={22}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={20}
          />
        </div>

        {/* Leave a review button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mt-12 gap-3"
        >
          <p className="text-muted-foreground text-sm">Happy with our service?</p>
          <a
            href="https://www.google.com/maps/place/Roaring+Brook+Abstract+Company+Inc/@41.3246706,-74.8100715,17z/data=!4m8!3m7!1s0x89c35b1453fb7eb5:0x7f41d3d26c3d8adc!8m2!3d41.3246706!4d-74.8074966!9m1!1b1!16s%2Fg%2F11cn6rvjms?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-card border border-navy/20 text-navy font-semibold px-8 py-3.5 rounded-full hover:bg-navy hover:text-cream hover:border-navy transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-soft hover:shadow-teal active:scale-[0.97]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Leave Us a Google Review
          </a>
        </motion.div>
      </div>
    </section>
  );
}
