import { NextRequest, NextResponse } from "next/server";
import {
  readMailConfig,
  createTransport,
  detailTable,
  emailShell,
  headerSafe,
} from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token, name, email, phone, service, message } = body;

  // Verify reCAPTCHA token
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const verifyRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    { method: "POST" }
  );
  const verifyData = await verifyRes.json();

  if (!verifyData.success || verifyData.score < 0.5) {
    return NextResponse.json(
      { error: "Failed reCAPTCHA verification." },
      { status: 400 }
    );
  }

  const mail = readMailConfig();
  if (!mail) {
    console.error(
      "[contact] SMTP is not configured. Submission was not delivered:",
      { name, email, phone, service }
    );
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 503 }
    );
  }

  const clean = (v: unknown) => String(v ?? "").trim().slice(0, 2000);
  const subject = `Website contact — ${clean(name) || "no name given"}`;

  const html = emailShell(
    subject,
    `
      ${detailTable([
        ["Name", clean(name)],
        ["Email", clean(email)],
        ["Phone", clean(phone)],
        ["Interested in", clean(service)],
        ["Message", clean(message)],
      ])}
      <p style="margin:26px 0 0;padding-top:22px;border-top:1px solid #e5e1d8;color:#5b6472;font-size:12px;">
        Submitted from the website contact form. Reply directly to reach them.
      </p>
    `
  );

  const text = [
    subject,
    "",
    `Name:    ${clean(name)}`,
    `Email:   ${clean(email)}`,
    `Phone:   ${clean(phone)}`,
    `Service: ${clean(service)}`,
    "",
    clean(message),
  ].join("\n");

  try {
    await createTransport(mail).sendMail({
      from: mail.from,
      to: mail.to,
      replyTo: headerSafe(email),
      subject: headerSafe(subject),
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] Notification email failed:", err);
    return NextResponse.json(
      { error: "Could not send message." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
