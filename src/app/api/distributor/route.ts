import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";
import { appendLead, NotConfiguredError } from "@/lib/google-sheets";

// Basic in-memory rate limit: 5 submissions per IP per 10 minutes.
// NOTE: this resets on restart and is not shared between server instances,
// so it only slows down casual spam. It is not robust protection.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function fail(status: number, message: string, errors?: Record<string, string>) {
  return NextResponse.json({ ok: false, message, errors }, { status });
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 10_000) return fail(413, "Your submission is too large.");

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return fail(429, "Too many attempts. Please try again later.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail(400, "Invalid request.");
  }
  if (typeof body !== "object" || body === null) {
    return fail(400, "Invalid request.");
  }

  // Honeypot: real people never fill this hidden field, bots often do.
  // We answer "ok" so bots don't learn they were detected, and store nothing.
  const honeypot = (body as Record<string, unknown>).website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return fail(400, "Please correct the highlighted fields.", errors);
  }

  try {
    await appendLead(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    // Log only the error type. Never log the lead's personal details.
    console.error("Lead submission failed:", (error as Error).name);
    if (error instanceof NotConfiguredError) {
      return fail(
        503,
        "Online registration is temporarily unavailable. Please contact us by phone or WhatsApp.",
      );
    }
    return fail(502, "We could not save your details. Please try again later.");
  }
}