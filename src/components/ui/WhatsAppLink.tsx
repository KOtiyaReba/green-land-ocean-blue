import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function WhatsAppLink({
  children = "Chat on WhatsApp",
  message,
  className = "",
}: {
  children?: ReactNode;
  message?: string;
  className?: string;
}) {
  const url = buildWhatsAppUrl(message);

  // No valid number configured: show nothing in production,
  // and a visible reminder while developing.
  if (!url) {
    return process.env.NODE_ENV === "development" ? (
      <span className="rounded-md border border-dashed border-amber-500 px-3 py-2 text-xs text-amber-700">
        [WhatsApp number not set in .env.local]
      </span>
    ) : null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#1ebe5b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${className}`}
    >
      <MessageCircle size={18} aria-hidden="true" />
      {children}
    </a>
  );
}