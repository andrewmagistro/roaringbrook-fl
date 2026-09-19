import nodemailer from "nodemailer";

/**
 * SMTP transport for form notifications.
 *
 * Configure in .env.local (never commit it):
 *
 *   RB_SMTP_HOST=smtp.office365.com
 *   RB_SMTP_PORT=587
 *   RB_SMTP_USER=crkimler@kimlerlaw.com
 *   RB_SMTP_PASS=<app password, not the account password>
 *   RB_MAIL_FROM="Roaring Brook Website <crkimler@kimlerlaw.com>"
 *   RB_NOTIFY_TO=crkimler@kimlerlaw.com
 *
 * Notes:
 *  - Port 587 uses STARTTLS, port 465 uses implicit TLS. Both are fine.
 *  - Microsoft 365 and Google Workspace both require an app password (or
 *    OAuth) rather than the normal mailbox password when MFA is on.
 *  - Many hosts block outbound port 25. Use 587 or 465.
 */

export type MailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
};

export function readMailConfig(): MailConfig | null {
  const host = process.env.RB_SMTP_HOST;
  const user = process.env.RB_SMTP_USER;
  const pass = process.env.RB_SMTP_PASS;
  const to = process.env.RB_NOTIFY_TO;

  if (!host || !user || !pass || !to) return null;

  return {
    host,
    port: Number(process.env.RB_SMTP_PORT ?? 587),
    user,
    pass,
    from: process.env.RB_MAIL_FROM ?? user,
    to,
  };
}

export function createTransport(config: MailConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });
}

/** Escape anything that came from a form field before putting it in HTML. */
export function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Strip CR/LF from anything that lands in a header (subject, reply-to) so a
 * form field can't inject extra headers.
 */
export function headerSafe(value: unknown): string {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

/** Simple label/value table shared by both notification emails. */
export function detailTable(rows: [string, unknown][]): string {
  const cells = rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 16px 8px 0;color:#5b6472;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(
            label
          )}</td>
          <td style="padding:8px 0;color:#0b213c;font-size:14px;font-weight:500;">${esc(
            value
          )}</td>
        </tr>`
    )
    .join("");

  return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${cells}</table>`;
}

export function emailShell(title: string, body: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f5f3ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e1d8;border-radius:14px;overflow:hidden;">
      <div style="background:#0b213c;padding:20px 28px;">
        <div style="color:#ffffff;font-size:15px;font-weight:600;letter-spacing:0.02em;">
          Roaring Brook Title and Escrow Agency
        </div>
      </div>
      <div style="padding:28px;">
        <h1 style="margin:0 0 20px;font-size:19px;line-height:1.3;color:#0b213c;">${esc(
          title
        )}</h1>
        ${body}
      </div>
    </div>
  </body>
</html>`;
}
