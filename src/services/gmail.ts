/**
 * Google Workspace Gmail API Client
 * Uses https://www.googleapis.com/auth/gmail.send
 */

import { ADMIN_EMAIL } from './firebase';

function makeBase64Url(str: string): string {
  // UTF-8 safe base64url encoding
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.byteLength; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export interface MilestoneEmailParams {
  totalVisits: number;
  dateStr: string;
  recipientEmail?: string;
  accessToken: string;
}

/**
 * Sends a visitor milestone notification email using the Gmail API
 */
export async function sendMilestoneNotificationEmail({
  totalVisits,
  dateStr,
  recipientEmail = ADMIN_EMAIL,
  accessToken
}: MilestoneEmailParams): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const subject = `Stassen's Archive Milestone: ${totalVisits} Total Visitors Recorded`;
    const emailBody = `From: "Stassen Archive Bot" <me>
To: ${recipientEmail}
Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=
MIME-Version: 1.0
Content-Type: text/html; charset=utf-8

<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #121212; color: #F5F5F0; margin: 0; padding: 24px; }
    .card { background-color: #161616; border: 1px solid rgba(245,245,240,0.15); max-width: 540px; margin: 0 auto; padding: 32px; border-radius: 4px; }
    .header { font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; color: #C5A059; margin-bottom: 12px; }
    .title { font-size: 26px; font-family: Georgia, serif; color: #F5F5F0; margin: 0 0 16px 0; font-weight: normal; }
    .milestone-badge { display: inline-block; background-color: #C5A059; color: #121212; font-weight: bold; font-size: 16px; padding: 6px 14px; margin-bottom: 20px; }
    .detail { font-size: 13px; line-height: 1.6; color: rgba(245,245,240,0.8); margin-bottom: 16px; }
    .meta-table { width: 100%; border-top: 1px solid rgba(245,245,240,0.1); margin-top: 24px; padding-top: 16px; font-size: 11px; color: rgba(245,245,240,0.6); }
    .footer { margin-top: 24px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A059; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">Living Archive Telemetry • Automated Dispatch</div>
    <h1 class="title">Visitor Traffic Milestone Cross</h1>
    <div class="milestone-badge">${totalVisits} Visitors Milestone</div>
    <p class="detail">
      The living catalog for <strong>Stassen's Collection of Ingredients</strong> has officially reached <strong>${totalVisits} total visits</strong> as of <strong>${dateStr}</strong>.
    </p>
    <p class="detail">
      Curated botanical specimens, seasonal harvest narratives, and terroir dossiers continue to be actively explored across the globe.
    </p>
    <div class="meta-table">
      <div><strong>Milestone:</strong> ${totalVisits} Visits</div>
      <div><strong>Recorded At:</strong> ${dateStr}</div>
      <div><strong>Archive:</strong> Stassen's Collection of Ingredients</div>
    </div>
    <div class="footer">Stassen Editorial Archive • Terroir Provenance</div>
  </div>
</body>
</html>`;

    const rawBase64 = makeBase64Url(emailBody);

    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: rawBase64,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gmail API send error:', errorData);
      return {
        success: false,
        error: errorData.error?.message || `HTTP ${response.status}: Failed to send email via Gmail API`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.id,
    };
  } catch (err: any) {
    console.error('Error invoking Gmail API:', err);
    return {
      success: false,
      error: err.message || 'Unknown error dispatching email',
    };
  }
}
