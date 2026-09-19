import { NextResponse } from "next/server";
import {
  MAX_BYTES,
  FILE_SLOTS,
  type FileSlot,
  looksLikePdf,
  saveUpload,
} from "@/lib/contract-storage";
import {
  readMailConfig,
  createTransport,
  detailTable,
  emailShell,
  esc,
  headerSafe,
} from "@/lib/mailer";

/**
 * Contract intake.
 *
 * The uploaded PDF is written to server-side storage and Chris receives a
 * notification email containing the form details plus an expiring download
 * link. The PDF itself is never attached — see lib/contract-storage.ts for why.
 */

export const runtime = "nodejs";

const TEXT_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "role",
  "propertyAddress",
  "closingDate",
  "agentName",
  "brokerage",
  "lender",
  "notes",
] as const;

export async function POST(request: Request) {
  const mail = readMailConfig();
  if (!mail) {
    console.error(
      "[submit-contract] SMTP is not configured. Set RB_SMTP_HOST, RB_SMTP_USER, " +
        "RB_SMTP_PASS and RB_NOTIFY_TO in .env.local. Submission was NOT accepted."
    );
    return NextResponse.json(
      { error: "Contract intake is not configured yet." },
      { status: 503 }
    );
  }

  const form = await request.formData();

  // ---- Collect and bound the text fields -------------------------------
  const fields: Record<string, string> = {};
  for (const key of TEXT_FIELDS) {
    const value = form.get(key);
    if (typeof value === "string" && value.trim()) {
      fields[key] = value.trim().slice(0, 2000);
    }
  }

  for (const required of [
    "firstName",
    "lastName",
    "email",
    "phone",
    "role",
    "propertyAddress",
  ]) {
    if (!fields[required]) {
      return NextResponse.json(
        { error: `Missing required field: ${required}` },
        { status: 400 }
      );
    }
  }

  // ---- Validate the uploads --------------------------------------------
  const uploads: Partial<Record<FileSlot, { originalName: string; bytes: Buffer }>> =
    {};

  for (const slot of FILE_SLOTS) {
    const entry = form.get(slot);
    if (!entry || typeof entry === "string") continue;

    if (entry.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `${slot} is larger than 20 MB.` },
        { status: 413 }
      );
    }

    const bytes = Buffer.from(await entry.arrayBuffer());
    if (!looksLikePdf(bytes)) {
      return NextResponse.json(
        { error: `${slot} does not appear to be a PDF.` },
        { status: 415 }
      );
    }

    uploads[slot] = {
      originalName:
        entry.name.replace(/[\r\n]/g, "").slice(0, 200) || `${slot}.pdf`,
      bytes,
    };
  }

  if (!uploads.contract) {
    return NextResponse.json(
      { error: "The executed contract PDF is required." },
      { status: 400 }
    );
  }

  // ---- Store, then notify ----------------------------------------------
  const meta = await saveUpload(fields, uploads);

  const origin =
    process.env.RB_SITE_URL ??
    request.headers.get("origin") ??
    new URL(request.url).origin;

  const linkRows = FILE_SLOTS.filter((slot) => meta.files[slot])
    .map((slot) => {
      const label =
        slot === "contract" ? "Executed contract" : "Addenda / amendments";
      const href = `${origin}/api/contract/${meta.token}/${slot}`;
      return `<p style="margin:0 0 10px;">
        <a href="${href}" style="display:inline-block;background:#0b213c;color:#ffffff;text-decoration:none;padding:11px 20px;border-radius:999px;font-size:14px;font-weight:600;">
          Download ${esc(label)}
        </a>
      </p>`;
    })
    .join("");

  const expires = new Date(meta.expiresAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const html = emailShell(
    `New contract — ${fields.propertyAddress}`,
    `
      ${detailTable([
        ["Name", `${fields.firstName} ${fields.lastName}`],
        ["Role", fields.role],
        ["Email", fields.email],
        ["Phone", fields.phone],
        ["Property", fields.propertyAddress],
        ["Closing date", fields.closingDate],
        ["Agent", fields.agentName],
        ["Brokerage", fields.brokerage],
        ["Lender", fields.lender],
        ["Notes", fields.notes],
      ])}
      <div style="margin:26px 0 8px;padding-top:22px;border-top:1px solid #e5e1d8;">
        ${linkRows}
        <p style="margin:14px 0 0;color:#5b6472;font-size:12px;line-height:1.5;">
          These links expire on ${esc(expires)}. The contract is stored on the
          website server rather than attached to this email, because it may
          contain Social Security and bank account numbers. Save a copy to the
          title file before the link expires.
        </p>
      </div>
    `
  );

  const text = [
    `New contract — ${fields.propertyAddress}`,
    "",
    `Name:     ${fields.firstName} ${fields.lastName}`,
    `Role:     ${fields.role}`,
    `Email:    ${fields.email}`,
    `Phone:    ${fields.phone}`,
    `Property: ${fields.propertyAddress}`,
    fields.closingDate ? `Closing:  ${fields.closingDate}` : "",
    fields.agentName ? `Agent:    ${fields.agentName}` : "",
    fields.brokerage ? `Broker:   ${fields.brokerage}` : "",
    fields.lender ? `Lender:   ${fields.lender}` : "",
    fields.notes ? `\nNotes:\n${fields.notes}` : "",
    "",
    ...FILE_SLOTS.filter((s) => meta.files[s]).map(
      (s) => `${s}: ${origin}/api/contract/${meta.token}/${s}`
    ),
    "",
    `Links expire ${expires}.`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await createTransport(mail).sendMail({
      from: mail.from,
      to: mail.to,
      replyTo: headerSafe(fields.email),
      subject: headerSafe(`New contract — ${fields.propertyAddress}`),
      text,
      html,
    });
  } catch (err) {
    // The file is already saved, so the submission is recoverable from disk
    // even though the notification failed.
    console.error(
      `[submit-contract] Stored upload ${meta.token} but the notification email failed:`,
      err
    );
    return NextResponse.json(
      { error: "Could not send notification." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
