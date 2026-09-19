import { NextResponse } from "next/server";
import {
  isExpired,
  isValidSlot,
  isValidToken,
  readMeta,
  readUpload,
} from "@/lib/contract-storage";

/**
 * Expiring download for a stored contract.
 *
 * The token is 32 random bytes, so the URL is unguessable, and it stops working
 * after RB_LINK_TTL_DAYS. Anyone holding the link can download until then —
 * that is the tradeoff for not requiring Chris to log in. If you later want
 * these gated behind a password, add the check here; nothing else changes.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { token: string; file: string } }
) {
  const { token, file } = params;

  if (!isValidToken(token) || !isValidSlot(file)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const meta = await readMeta(token);
  if (!meta) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (isExpired(meta)) {
    return new NextResponse(
      "This download link has expired. Contact the office and we'll re-send it.",
      { status: 410, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  const bytes = await readUpload(token, file);
  if (!bytes) {
    return new NextResponse("Not found", { status: 404 });
  }

  const original = meta.files[file]?.originalName ?? `${file}.pdf`;
  // Quote-safe filename for the Content-Disposition header.
  const safeName = original.replace(/["\\]/g, "");

  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safeName}"`,
      "Content-Length": String(bytes.length),
      "Cache-Control": "no-store, private",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
