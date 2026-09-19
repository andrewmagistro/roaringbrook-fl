import { NextResponse } from "next/server";

/**
 * "Start Your Closing" lead intake — NOT YET WIRED UP.
 *
 * Unlike /api/submit-contract, this form carries no documents and no financial
 * account data, so it is safe to forward by ordinary means (email, CRM webhook).
 * It still contains personal contact details, so it needs a real destination
 * before it goes live.
 *
 * Set RB_LEAD_WEBHOOK to a URL that accepts a JSON POST — a CRM intake hook,
 * a Zapier/Make catch hook, or an internal endpoint that emails the team.
 *
 * Until that is set, submissions are logged server-side (so nothing is lost in
 * testing) and the form shows its "call us instead" fallback.
 */

export const runtime = "nodejs";

export async function POST(request: Request) {
  const lead = await request.json();
  const destination = process.env.RB_LEAD_WEBHOOK;

  if (!destination) {
    console.warn(
      "[start-closing] Lead received but RB_LEAD_WEBHOOK is not set. Nothing was forwarded:",
      lead
    );
    return NextResponse.json(
      {
        error: "Lead intake is not configured yet.",
        hint: "Set RB_LEAD_WEBHOOK to a JSON webhook URL.",
      },
      { status: 501 }
    );
  }

  const upstream = await fetch(destination, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, source: "start-closing", receivedAt: new Date().toISOString() }),
  });

  if (!upstream.ok) {
    console.error("[start-closing] Upstream rejected lead:", upstream.status);
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
