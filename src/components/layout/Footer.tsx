import Link from "next/link";
import { company } from "@/data/company";
import { navLinks } from "@/data/navigation";
import Container from "@/components/ui/Container";

export default async function Footer() {
      "use cache";
  return (
    <footer className="bg-brand-navy text-white">
      <Container className="grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{company.name}</p>
          <p className="mt-2 text-sm text-gray-200">{company.tagline}</p>
          <p className="mt-2 text-sm text-gray-200">{company.headquarters}</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-semibold uppercase tracking-wide">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-gray-200 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-200">
            <li>{company.contact.phone}</li>
            <li>{company.contact.email}</li>
            <li>{company.contact.address}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/20 py-4 text-center text-xs text-gray-300">
        © {new Date().getFullYear()} {company.name}. All rights reserved.
      </div>
    </footer>
  );
}