import { Resend } from 'resend';

interface BroadcastRequest {
  payload: {
    subject: string;
    previewText?: string;
    headline?: string;
    body: string;
    imageUrl?: string;
    buttonLabel?: string;
    buttonLink?: string;
  };
  recipients: string[];
  isTest?: boolean;
}

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: 'RESEND_API_KEY is not configured in Netlify environment variables.',
      }),
    };
  }

  try {
    const data: BroadcastRequest = JSON.parse(event.body || '{}');
    const { payload, recipients, isTest } = data;

    if (!payload?.subject || !payload?.body) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Subject and body are required.' }),
      };
    }

    if (!recipients || recipients.length === 0) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'No recipients provided.' }),
      };
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Baby First Health <updates@babyfirsthealth.com>';
    const replyTo = 'babyfirsthealth@gmail.com';

    // Helper to format HTML
    const formatEmailHtml = (recipientEmail: string) => {
      const escapeHtml = (str: string) =>
        str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');

      const parseInline = (str: string) => {
        let escaped = escapeHtml(str);
        return escaped.replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight: 700; color: #0f172a;">$1</strong>');
      };

      const lines = payload.body.split('\n');
      const formattedLines: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const rawLine = lines[i].trim();
        if (!rawLine) continue;

        if (rawLine.startsWith('# ')) {
          const content = parseInline(rawLine.replace(/^#\s+/, ''));
          formattedLines.push(`<h1 style="color: #134e4a; font-size: 22px; font-weight: 800; margin: 20px 0 10px 0; line-height: 1.3;">${content}</h1>`);
          continue;
        }

        if (rawLine.startsWith('### ')) {
          const content = parseInline(rawLine.replace(/^###\s+/, ''));
          formattedLines.push(`<h3 style="color: #0f766e; font-size: 17px; font-weight: 700; margin: 16px 0 8px 0; line-height: 1.4;">${content}</h3>`);
          continue;
        }

        const content = parseInline(rawLine);
        formattedLines.push(`<p style="margin: 0 0 14px 0; line-height: 1.65; color: #1e293b; font-size: 16px;">${content}</p>`);
      }

      const formattedBody = formattedLines.join('');

      const imageSection = payload.imageUrl?.trim()
        ? `<div style="margin-bottom: 24px; text-align: center;">
            <img src="${escapeHtml(payload.imageUrl.trim())}" alt="Article visual" style="max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 0 auto; border: 1px solid #e2e8f0;" />
           </div>`
        : '';

      const buttonSection = payload.buttonLink?.trim() && payload.buttonLabel?.trim()
        ? `<div style="margin: 28px 0; text-align: center;">
            <a href="${escapeHtml(payload.buttonLink.trim())}" style="display: inline-block; background-color: #ea580c; color: #ffffff; text-decoration: none; padding: 14px 28px; font-weight: 600; font-size: 16px; border-radius: 9999px;">
              ${escapeHtml(payload.buttonLabel.trim())}
            </a>
           </div>`
        : '';

      const headlineSection = payload.headline?.trim()
        ? `<h1 style="margin: 0 0 20px 0; color: #134e4a; font-size: 24px; font-weight: 800; line-height: 1.3;">${escapeHtml(payload.headline.trim())}</h1>`
        : '';

      return `<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; background-color: #f0fdfa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f0fdfa; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(15, 118, 110, 0.08); border: 1px solid #ccfbf1;">
          <tr>
            <td style="background-color: #115e59; padding: 22px 28px; text-align: left;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="vertical-align: middle; padding-right: 12px;">
                    <a href="https://babyfirsthealth.com" style="text-decoration: none; display: block;">
                      <img src="https://babyfirsthealth.com/BFH-logo.svg" alt="Baby First Health" width="38" height="38" style="display: block; width: 38px; height: 38px; border-radius: 8px;" />
                    </a>
                  </td>
                  <td style="vertical-align: middle;">
                    <a href="https://babyfirsthealth.com" style="text-decoration: none; display: block;">
                      <span style="color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.2; display: block;">Baby First Health</span>
                      <span style="color: #ccfbf1; font-size: 12px; font-weight: 300; letter-spacing: 0.3px; display: block; margin-top: 2px;">Every Baby Comes First</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              ${headlineSection}
              ${imageSection}
              ${formattedBody}
              ${buttonSection}
            </td>
          </tr>
          <tr>
            <td style="background-color: #0f172a; padding: 28px 32px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0 0 10px 0;">
                <a href="https://www.tiktok.com/@babyfirsthealth" style="color: #38bdf8; text-decoration: none; margin: 0 8px;">TikTok</a> • 
                <a href="https://www.facebook.com/share/1VG7i45YqA/" style="color: #38bdf8; text-decoration: none; margin: 0 8px;">Facebook</a> • 
                <a href="https://babyfirsthealth.com/blog" style="color: #38bdf8; text-decoration: none; margin: 0 8px;">Health Blog</a>
              </p>
              <p style="margin: 0 0 14px 0; color: #cbd5e1; font-size: 12px; font-weight: 400;">
                Empowering parents with practical knowledge for healthy, happy children.
              </p>
              <p style="margin: 0; color: #475569; font-size: 11px;">
                <a href="https://babyfirsthealth.com/terms" style="color: #64748b; text-decoration: underline; margin-right: 8px;">Terms &amp; Policies</a> • 
                <a href="https://babyfirsthealth.com/privacy" style="color: #64748b; text-decoration: underline; margin-right: 8px;">Privacy</a> • 
                <a href="https://babyfirsthealth.com/unsubscribe?email=${encodeURIComponent(recipientEmail)}" style="color: #64748b; text-decoration: underline;">Unsubscribe</a>
              </p>
              <p style="margin: 8px 0 0 0; color: #334155; font-size: 10px;">
                © 2026 Baby First Health. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    };

    // If test email or single recipient
    if (isTest || recipients.length === 1) {
      const recipient = recipients[0];
      const result = await resend.emails.send({
        from: fromAddress,
        to: recipient,
        replyTo,
        subject: payload.subject,
        html: formatEmailHtml(recipient),
      });

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, result }),
      };
    }

    // Batch send up to recipients limit
    const sendPromises = recipients.map((to) =>
      resend.emails.send({
        from: fromAddress,
        to,
        replyTo,
        subject: payload.subject,
        html: formatEmailHtml(to),
      })
    );

    await Promise.all(sendPromises);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, count: recipients.length }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: error.message || 'Sending failed' }),
    };
  }
};
