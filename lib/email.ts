import nodemailer from "nodemailer";
import {
  ENGAGEMENT_BUDGET_OPTIONS,
  FUNDING_STAGE_OPTIONS,
  type ContactIntakePayload,
} from "@/lib/validation/contact-intake";

function labelForFunding(value: ContactIntakePayload["fundingStage"]): string {
  return (
    FUNDING_STAGE_OPTIONS.find((o) => o.value === value)?.label ?? value
  );
}

function labelForBudget(
  value: ContactIntakePayload["engagementBudgetRange"]
): string {
  return (
    ENGAGEMENT_BUDGET_OPTIONS.find((o) => o.value === value)?.label ?? value
  );
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
 * Sends an internal notification email to NOTIFICATION_EMAIL when an executive
 * intake form is submitted. Throws if the transport fails; callers decide
 * whether to surface the error or swallow it.
 */
export async function sendContactNotification(
  payload: ContactIntakePayload
): Promise<void> {
  const {
    executiveName,
    company,
    corporateEmail,
    fundingStage,
    immediateTechnicalHurdle,
    engagementBudgetRange,
  } = payload;

  const from = process.env.ZOHO_EMAIL;
  const to = process.env.NOTIFICATION_EMAIL;

  if (!from || !process.env.ZOHO_PASSWORD) {
    throw new Error(
      "Zoho SMTP credentials (ZOHO_EMAIL / ZOHO_PASSWORD) are not configured."
    );
  }
  if (!to) {
    throw new Error("NOTIFICATION_EMAIL is not configured.");
  }

  const transport = createZohoTransport();

  const fundingLabel = labelForFunding(fundingStage);
  const budgetLabel = labelForBudget(engagementBudgetRange);

  const textBody = [
    "Executive intake submission (funded-client gate)",
    "",
    `Executive: ${executiveName}`,
    `Company:   ${company}`,
    `Email:     ${corporateEmail}`,
    `Funding:   ${fundingLabel}`,
    `Budget:    ${budgetLabel}`,
    "",
    "Immediate technical hurdle:",
    immediateTechnicalHurdle,
    "",
    "---",
    "Stepfault automated notification",
  ].join("\n");

  const htmlTable = `
      <table cellpadding="6" style="border-collapse:collapse;font-family:monospace;font-size:13px;">
        <tr><td><strong>Executive</strong></td><td>${escapeHtml(executiveName)}</td></tr>
        <tr><td><strong>Company</strong></td><td>${escapeHtml(company)}</td></tr>
        <tr><td><strong>Email</strong></td><td><a href="mailto:${escapeAttr(corporateEmail)}">${escapeHtml(corporateEmail)}</a></td></tr>
        <tr><td><strong>Funding stage</strong></td><td>${escapeHtml(fundingLabel)}</td></tr>
        <tr><td><strong>Budget range</strong></td><td>${escapeHtml(budgetLabel)}</td></tr>
      </table>`;

  await transport.sendMail({
    from: `"Stepfault" <${from}>`,
    to,
    subject: `[Stepfault] Executive intake: ${company} · ${executiveName}`,
    text: textBody,
    html: `
      <p><strong>Executive intake submission</strong></p>
      ${htmlTable}
      <p><strong>Immediate technical hurdle:</strong></p>
      <blockquote style="border-left:3px solid #34d399;margin:0;padding:0 1rem;">
        <pre style="white-space:pre-wrap;">${escapeHtml(immediateTechnicalHurdle)}</pre>
      </blockquote>
      <hr/>
      <small style="color:#71717a;">Stepfault automated notification</small>
    `,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(s: string): string {
  return escapeHtml(s).replace(/'/g, "&#39;");
}
