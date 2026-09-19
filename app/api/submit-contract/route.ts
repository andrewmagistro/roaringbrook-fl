import { NextResponse } from "next/server";

/**
 * Contract intake endpoint — NOT YET WIRED UP.
 *
 * Executed contracts contain SSNs, bank details, and other PII, so this route
 * deliberately refuses to accept submissions until a destination is configured.
 * Decide where files should land, then implement one of:
 *
 *   1. Title software intake (Qualia / SoftPro order API) — preferred.
 *   2. Encrypted storage (S3 with SSE + signed URLs) plus an email notification.
 *   3. A third-party secure form vendor, in which case delete this route and
 *      point components/contract-form.tsx at their endpoint instead.
 *
 * Do NOT just email the PDF as an attachment over plain SMTP.
 *
 * When ready, set RB_INTAKE_WEBHOOK and replace the body of this handler.
 */

export const runtime = "nodejs";

export async function POST(request: Request) {
  const destination = process.env.RB_INTAKE_WEBHOOK;

  if (!destination) {
    console.warn(
      "[submit-contract] Received a submission but RB_INTAKE_WEBHOOK is not set. " +
        "Nothing was stored or forwarded."
    );
    return NextResponse.json(
      {
        error: "Contract intake is not configured yet.",
        hint: "Set RB_INTAKE_WEBHOOK and implement forwarding in app/api/submit-contract/route.ts",
      },
      { status: 501 }
    );
  }

  const formData = await request.formData();

  const upstream = await fetch(destination, {
    method: "POST",
    body: formData,
  });

  if (!upstream.ok) {
    console.error("[submit-contract] Upstream rejected submission:", upstream.status);
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
