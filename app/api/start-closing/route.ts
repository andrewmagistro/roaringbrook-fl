import { NextResponse } from "next/server";
import {
  readMailConfig,
  createTransport,
  detailTable,
  emailShell,
  headerSafe,
} from "@/lib/mailer";

/**
 * "Start Your Closing" lead intake.
 *
 * No documents and no financial account data, so unlike /api/submit-contract
 * the whole submission is safe to put in the body of the email.
 */

export const runtime = "nodejs";

const FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "role",
  "stage",
  "propertyAddress",
  "notes",
] as const;

export async function POST(request: Request) {
  const mail = readMailConfig();
  if (!mail) {
    console.error(
      "[start-closing] SMTP is not configured. Set RB_SMTP_HOST, RB_SMTP_USER, " +
        "RB_SMTP_PASS and RB_NOTIFY_TO in .env.local."
    );
    return NextResponse.json(
      { error: "Lead intake is not configured yet." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const fields: Record<string, string> = {};
  for (const key of FIELDS) {
    const value = body[key];
    if (typeof value === "string" && value.trim()) {
      fields[key] = value.trim().slice(0, 2000);
    }
  }

  for (const required of ["firstName", "lastName", "email", "phone", "role", "stage"]) {
    if (!fields[required]) {
      return NextResponse.json(
        { error: `Missing required field: ${required}` },
        { status: 400 }
      );
    }
  }

  const who = `${fields.firstName} ${fields.lastName}`;
  const subject = fields.propertyAddress
    ? `New closing inquiry — ${fields.propertyAddress}`
    : `New closing inquiry — ${who}`;

  const html = emailShell(
    subject,
    `
      ${detailTable([
        ["Name", who],
        ["Role", fields.role],
        ["Email", fields.email],
        ["Phone", fields.phone],
        ["Stage", fields.stage],
        ["Property", fields.propertyAddress],
        ["Notes", fields.notes],
      ])}
      <p style="margin:26px 0 0;padding-top:22px;border-top:1px solid #e5e1d8;color:#5b6472;font-size:12px;">
        Submitted from the Start Your Closing form. Reply directly to reach them.
      </p>
    `
  );

  const text = [
    subject,
    "",
    `Name:     ${who}`,
    `Role:     ${fields.role}`,
    `Email:    ${fields.email}`,
    `Phone:    ${fields.phone}`,
    `Stage:    ${fields.stage}`,
    fields.propertyAddress ? `Property: ${fields.propertyAddress}` : "",
    fields.notes ? `\nNotes:\n${fields.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await createTransport(mail).sendMail({
      from: mail.from,
      to: mail.to,
      replyTo: headerSafe(fields.email),
      subject: headerSafe(subject),
      text,
      html,
    });
  } catch (err) {
    console.error("[start-closing] Notification email failed:", err);
    return NextResponse.json(
      { error: "Could not send notification." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
