interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

/**
 * Sends a transactional email via the configured provider (e.g. Resend,
 * SendGrid, Postmark). In development, when EMAIL_API_KEY isn't set, this
 * logs the email to the console instead of sending it.
 */
export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<void> {
  const apiKey = process.env.EMAIL_API_KEY;

  if (!apiKey) {
    console.info(`[email:dev] To: ${to} | Subject: ${subject}\n${html}`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "NovaBank <no-reply@novabank.io>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to send email: ${res.status} ${body}`);
  }
}

export function otpEmailTemplate(code: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2>Your NovaBank verification code</h2>
      <p>Use the code below to continue. It expires in ${process.env.OTP_EXPIRY_MINUTES ?? 10} minutes.</p>
      <p style="font-size: 32px; font-weight: 700; letter-spacing: 8px;">${code}</p>
      <p>If you didn't request this code, you can safely ignore this email.</p>
    </div>
  `;
}

export function passwordResetEmailTemplate(resetUrl: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2>Reset your NovaBank password</h2>
      <p>Click the button below to choose a new password. This link expires in 30 minutes.</p>
      <p><a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#6d5efc;color:#fff;border-radius:8px;text-decoration:none;">Reset password</a></p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    </div>
  `;
}
