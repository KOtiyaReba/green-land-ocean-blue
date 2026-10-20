// Returns the site's origin (e.g. "https://www.example.com"),
// or null until NEXT_PUBLIC_SITE_URL is configured.
export function getSiteUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}