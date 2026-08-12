import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.json({ error: "Failed reCAPTCHA verification." }, { status: 400 });
  }

  // Log the submission (replace with email sending if needed)
  console.log("Contact form submission:", { name, email, phone, service, message });

  return NextResponse.json({ success: true });
}
