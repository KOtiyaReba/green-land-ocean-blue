import { JWT } from "google-auth-library";
import type { Lead } from "@/lib/validation";

export class NotConfiguredError extends Error {
  constructor() {
    super("Google Sheets integration is not configured.");
    this.name = "NotConfiguredError";
  }
}

function getConfig() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const tab = process.env.GOOGLE_SHEET_TAB || "Leads";

  if (!email || !rawKey || !sheetId) throw new NotConfiguredError();

  // .env files store line breaks as the two characters "\n"; restore them.
  const key = rawKey.replace(/\\n/g, "\n");
  return { email, key, sheetId, tab };
}

// Stops values that start with = + - @ from being treated as formulas if the
// sheet is later exported to CSV and opened in Excel or Sheets.
function safe(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

export async function appendLead(lead: Lead): Promise<void> {
  const { email, key, sheetId, tab } = getConfig();

  const client = new JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "medium",
  });

  const row = [
    timestamp,
    lead.fullName,
    lead.mobile,
    lead.email,
    lead.businessName,
    lead.state,
    lead.district,
    lead.interest,
    lead.productInterest,
    lead.message,
    lead.consent ? "Yes" : "No",
  ].map((value) => safe(String(value)));

  const range = encodeURIComponent(`${tab}!A:K`);
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append` +
    `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  // Throws if Google returns an error, so the caller never reports false success.
  const response = await client.request({
    url,
    method: "POST",
    data: { values: [row] },
    timeout: 10_000,
  });

  if (response.status !== 200) {
    throw new Error("Unexpected response from Google Sheets.");
  }
}