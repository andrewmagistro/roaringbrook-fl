"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { UploadCloud, FileText, X, CheckCircle2, Loader2, Lock } from "lucide-react";

const roles = [
  "Buyer",
  "Seller",
  "Buyer's Agent",
  "Seller's Agent (Listing Agent)",
  "Lender / Loan Officer",
  "Other",
];

const MAX_BYTES = 20 * 1024 * 1024;

function FileField({
  id,
  label,
  hint,
  required,
  file,
  onPick,
  onClear,
  error,
}: {
  id: string;
  label: string;
  hint: string;
  required?: boolean;
  file: File | null;
  onPick: (f: File | null) => void;
  onClear: () => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label} {required && <span className="text-gold-dark">*</span>}
      </label>

      {file ? (
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-cream px-5 py-4">
          <FileText className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-ink">{file.name}</span>
            <span className="block text-xs text-ink-soft">
              {(file.size / 1024 / 1024).toFixed(1)} MB
            </span>
          </span>
          <button
            type="button"
            onClick={onClear}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-border hover:text-ink"
            aria-label={`Remove ${file.name}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            onPick(e.dataTransfer.files?.[0] ?? null);
          }}
          className={`rounded-2xl border-2 border-dashed transition-colors ${
            dragging ? "border-brand bg-brand/[0.04]" : "border-border bg-cream"
          }`}
        >
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center gap-2 px-5 py-9 text-center"
          >
            <UploadCloud className="h-7 w-7 text-brand" aria-hidden="true" />
            <span className="text-sm font-medium text-ink">
              Click to upload, or drag a PDF here
            </span>
            <span className="text-xs text-ink-soft">{hint}</span>
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        id={id}
        name={id}
        type="file"
        accept="application/pdf"
        className="sr-only"
        onChange={(e) => onPick(e.target.files?.[0] ?? null)}
      />
      {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-border bg-cream px-5 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-brand focus:ring-2 focus:ring-brand/15";

export default function ContractForm() {
  const [contract, setContract] = useState<File | null>(null);
  const [addenda, setAddenda] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function validate(f: File | null): string | undefined {
    if (!f) return undefined;
    if (f.type !== "application/pdf") return "Please upload a PDF.";
    if (f.size > MAX_BYTES) return "That file is over 20 MB.";
    return undefined;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const err = validate(contract) ?? validate(addenda);
    if (err) {
      setFileError(err);
      return;
    }
    if (!contract) {
      setFileError("The executed contract PDF is required.");
      return;
    }
    setFileError(undefined);
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    data.set("contract", contract);
    if (addenda) data.set("addenda", addenda);

    try {
      // TODO: point this at the real intake endpoint once the destination is decided.
      const res = await fetch("/api/submit-contract", { method: "POST", body: data });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[1.8rem] border border-border bg-card p-12 text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/[0.08]">
          <CheckCircle2 className="h-7 w-7 text-brand" aria-hidden="true" />
        </div>
        <h3 className="mt-6 font-serif text-3xl tracking-tight text-ink">
          Contract received.
        </h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-soft">
          We&apos;ll open your title file and send a confirmation with your file
          number. If we need anything else, we&apos;ll email you directly.
        </p>
        <p className="mt-6 text-sm text-ink-soft">
          Need something sooner? Call{" "}
          <a href="tel:3214980135" className="font-medium text-brand hover:underline">
            (321) 498-0135
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.8rem] border border-border bg-card p-8 md:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-ink">
            First name <span className="text-gold-dark">*</span>
          </label>
          <input id="firstName" name="firstName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-ink">
            Last name <span className="text-gold-dark">*</span>
          </label>
          <input id="lastName" name="lastName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
            Email <span className="text-gold-dark">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
            Phone <span className="text-gold-dark">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="role" className="mb-2 block text-sm font-medium text-ink">
            Your role <span className="text-gold-dark">*</span>
          </label>
          <select id="role" name="role" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select your role…
            </option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="propertyAddress" className="mb-2 block text-sm font-medium text-ink">
            Property address <span className="text-gold-dark">*</span>
          </label>
          <input
            id="propertyAddress"
            name="propertyAddress"
            required
            placeholder="Street, city, FL, ZIP"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="closingDate" className="mb-2 block text-sm font-medium text-ink">
            Closing date <span className="text-ink-soft">(if known)</span>
          </label>
          <input id="closingDate" name="closingDate" type="date" className={inputClass} />
        </div>
        <div>
          <label htmlFor="agentName" className="mb-2 block text-sm font-medium text-ink">
            Agent name <span className="text-ink-soft">(if applicable)</span>
          </label>
          <input id="agentName" name="agentName" className={inputClass} />
        </div>
        <div>
          <label htmlFor="brokerage" className="mb-2 block text-sm font-medium text-ink">
            Brokerage
          </label>
          <input id="brokerage" name="brokerage" className={inputClass} />
        </div>
        <div>
          <label htmlFor="lender" className="mb-2 block text-sm font-medium text-ink">
            Lender
          </label>
          <input id="lender" name="lender" className={inputClass} />
        </div>
      </div>

      <div className="mt-8 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
        <FileField
          id="contract"
          label="Executed contract (PDF)"
          hint="PDF only · up to 20 MB"
          required
          file={contract}
          onPick={(f) => {
            setContract(f);
            setFileError(validate(f));
          }}
          onClear={() => setContract(null)}
          error={fileError}
        />
        <FileField
          id="addenda"
          label="Addenda / amendments"
          hint="Combine multiple addenda into one PDF"
          file={addenda}
          onPick={(f) => setAddenda(f)}
          onClear={() => setAddenda(null)}
        />
      </div>

      <div className="mt-6">
        <label htmlFor="notes" className="mb-2 block text-sm font-medium text-ink">
          Additional notes
        </label>
        <textarea id="notes" name="notes" rows={4} className={inputClass} />
      </div>

      {status === "error" && (
        <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          Something went wrong sending your contract. Please call{" "}
          <a href="tel:3214980135" className="font-medium underline">
            (321) 498-0135
          </a>{" "}
          and we&apos;ll take it over the phone.
        </p>
      )}

      <div className="mt-8 flex flex-col items-start gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-ink-soft">
          <Lock className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
          Transmitted over an encrypted connection and seen only by our team.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-light disabled:opacity-60"
        >
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "sending" ? "Sending…" : "Submit contract & open title file"}
        </button>
      </div>
    </form>
  );
}
