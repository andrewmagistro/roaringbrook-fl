"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const serviceOptions = [
  "Title Insurance Policy",
  "Title Search",
  "Title Examination",
  "Real Estate Closing",
  "Legal Representation (Real Property)",
  "Probate / Trust",
  "Not Sure — Need Guidance",
];

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(321) 498-0135",
    sub: "Calls returned same day",
  },
  {
    icon: MapPin,
    label: "Melbourne Office",
    value: "Brevard County, FL",
    sub: "[Melbourne, FL office address — coming soon]",
  },
  {
    icon: Mail,
    label: "Email",
    value: "crkimler@kimlerlaw.com",
    sub: "We respond promptly",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri, 9 AM – 5 PM",
    sub: "Available for urgent matters outside hours",
  },
];

export default function Consultation() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="consultation" className="py-28 bg-cream">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-14"
        >
          <p className="eyebrow text-navy/70 mb-4">
            <span className="h-1 w-1 rounded-full bg-gold" /> Get in touch
          </p>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-ink leading-[1.05]">
            Let's close your <span className="italic text-navy">deal</span>.
          </h2>
          <p className="mt-4 text-ink-soft text-lg">
            Reach out and we'll get back to you right away — no waiting, no
            runaround.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-navy-deep rounded-[1.6rem] p-8">
              <h3 className="text-cream font-serif text-2xl mb-6">Our Offices</h3>
              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="flex gap-4">
                    <div className="flex-shrink-0 p-2.5 bg-gold/10 rounded-lg h-fit">
                      <Icon className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-white font-medium text-sm mt-0.5">
                        {value}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-[1.6rem] p-6 border border-border">
              <p className="text-navy font-semibold text-sm mb-4">
                You Can Count On Us For:
              </p>
              <ul className="space-y-3">
                {[
                  "Fast, responsive communication",
                  "Attorney-reviewed title examination",
                  "Accurate, thorough title searches",
                  "Smooth closings on your schedule",
                  "Legal representation when needed",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-[1.6rem] border border-border p-8 md:p-10 shadow-soft">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy">Message Received!</h3>
                  <p className="text-muted-foreground mt-3 max-w-sm">
                    Thank you, {form.name}. We'll be in touch right away to
                    discuss your transaction.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", service: "", message: "" });
                    }}
                    className="mt-8 text-sm text-gold underline underline-offset-4 hover:text-gold-dark transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-navy font-medium">
                        Full Name <span className="text-gold">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Jane Smith"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-navy font-medium">
                        Email Address <span className="text-gold">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-navy font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(321) 555-0100"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-navy font-medium">
                        Service Needed <span className="text-gold">*</span>
                      </Label>
                      <select
                        id="service"
                        required
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
                      >
                        <option value="" disabled>Select a service…</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-navy font-medium">
                      Tell Us About Your Transaction <span className="text-gold">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Property address, type of transaction, target closing date, or any questions you have…"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
