import nodemailer from "nodemailer";

export interface ContactNotificationPayload {
  name: string;
  email: string;
  message: string;
}

/**
 * Creates a one-shot Nodemailer transport bound to Zoho SMTP.
 * Port 587 → STARTTLS (secure: false, starttls upgrade handled by nodemailer).
 * Port 465 → implicit TLS (secure: true).
 */
function createZohoTransport() {
  const port = Number(process.env.ZOHO_SMTP_PORT ?? 587);
  return nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST ?? "smtp.zoho.com",
    port,
    secure: port === 465,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
  });
}

/**
 * Sends an internal notification email to NOTIFICATION_EMAIL when a contact
 * form is submitted. Throws if the transport fails; callers decide whether
 * to surface the error or swallow it.
 */
export async function sendContactNotification(
  payload: ContactNotificationPayload
): Promise<void> {
  const { name, email, message } = payload;

  const from = process.env.ZOHO_EMAIL;
  const to = process.env.NOTIFICATION_EMAIL;

  if (!from || !process.env.ZOHO_PASSWORD) {
    throw new Error("Zoho SMTP credentials (ZOHO_EMAIL / ZOHO_PASSWORD) are not configured.");
  }
  if (!to) {
    throw new Error("NOTIFICATION_EMAIL is not configured.");
  }

  const transport = createZohoTransport();

  await transport.sendMail({
    from: `"Stepfault" <${from}>`,
    to,
    subject: `[Stepfault] New contact from ${name}`,
    text: [
      "New contact form submission\n",
      `Name:    ${name}`,
      `Email:   ${email}`,
      `\nMessage:\n${message}`,
      "\n---",
      "Stepfault automated notification",
    ].join("\n"),
    html: `
      <p><strong>New contact form submission</strong></p>
      <table cellpadding="6" style="border-collapse:collapse;font-family:monospace;">
        <tr><td><strong>Name</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
      </table>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left:3px solid #34d399;margin:0;padding:0 1rem;">
        <pre style="white-space:pre-wrap;">${message}</pre>
      </blockquote>
      <hr/>
      <small style="color:#71717a;">Stepfault automated notification</small>
    `,
  });
}
