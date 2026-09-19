import { randomBytes } from "crypto";
import { mkdir, writeFile, readFile } from "fs/promises";
import path from "path";

/**
 * Storage for uploaded contracts.
 *
 * Executed contracts routinely contain Social Security numbers, bank account
 * and routing numbers, and wire instructions. They are deliberately NOT sent
 * as email attachments — a mailbox keeps them in plain text indefinitely, and
 * title companies are a standing target for wire-fraud phishing. Instead the
 * file is written here and Chris receives an expiring download link.
 *
 * Files live OUTSIDE public/ so nothing is web-reachable except through
 * /api/contract/[token]/[file], which checks the token and the expiry.
 *
 * IMPORTANT — this uses the server's local disk, which requires a host with a
 * persistent filesystem (a VPS, or Render/Railway/Fly with a mounted volume).
 * On Vercel the filesystem is ephemeral and read-only, so uploads would vanish.
 * To move to S3 later, replace saveUpload/readUpload below with S3 calls using
 * server-side encryption; nothing else needs to change.
 */

const UPLOAD_ROOT =
  process.env.RB_UPLOAD_DIR ?? path.join(process.cwd(), ".uploads");

const TTL_DAYS = Number(process.env.RB_LINK_TTL_DAYS ?? 7);

export const MAX_BYTES = 20 * 1024 * 1024;

/** Only these logical slots exist, so the URL can never name an arbitrary file. */
export const FILE_SLOTS = ["contract", "addenda"] as const;
export type FileSlot = (typeof FILE_SLOTS)[number];

export type StoredMeta = {
  token: string;
  createdAt: string;
  expiresAt: string;
  fields: Record<string, string>;
  files: Partial<Record<FileSlot, { originalName: string; size: number }>>;
};

/** base64url, 32 bytes — 43 chars of [A-Za-z0-9_-]. */
const TOKEN_RE = /^[A-Za-z0-9_-]{43}$/;

export function isValidToken(token: string): boolean {
  return TOKEN_RE.test(token);
}

export function isValidSlot(slot: string): slot is FileSlot {
  return (FILE_SLOTS as readonly string[]).includes(slot);
}

/** A PDF always starts with "%PDF-". Trust this, not the browser's MIME type. */
export function looksLikePdf(bytes: Uint8Array): boolean {
  return (
    bytes.length > 5 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d
  );
}

export async function saveUpload(
  fields: Record<string, string>,
  files: Partial<Record<FileSlot, { originalName: string; bytes: Buffer }>>
): Promise<StoredMeta> {
  const token = randomBytes(32).toString("base64url");
  const dir = path.join(UPLOAD_ROOT, token);
  await mkdir(dir, { recursive: true, mode: 0o700 });

  const now = new Date();
  const meta: StoredMeta = {
    token,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + TTL_DAYS * 86400_000).toISOString(),
    fields,
    files: {},
  };

  for (const slot of FILE_SLOTS) {
    const file = files[slot];
    if (!file) continue;
    await writeFile(path.join(dir, `${slot}.pdf`), file.bytes, { mode: 0o600 });
    meta.files[slot] = { originalName: file.originalName, size: file.bytes.length };
  }

  await writeFile(path.join(dir, "meta.json"), JSON.stringify(meta, null, 2), {
    mode: 0o600,
  });

  return meta;
}

export async function readMeta(token: string): Promise<StoredMeta | null> {
  if (!isValidToken(token)) return null;
  try {
    const raw = await readFile(path.join(UPLOAD_ROOT, token, "meta.json"), "utf8");
    return JSON.parse(raw) as StoredMeta;
  } catch {
    return null;
  }
}

export async function readUpload(
  token: string,
  slot: FileSlot
): Promise<Buffer | null> {
  if (!isValidToken(token) || !isValidSlot(slot)) return null;
  try {
    return await readFile(path.join(UPLOAD_ROOT, token, `${slot}.pdf`));
  } catch {
    return null;
  }
}

export function isExpired(meta: StoredMeta): boolean {
  return Date.now() > Date.parse(meta.expiresAt);
}
