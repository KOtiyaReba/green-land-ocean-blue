import type { Metadata } from "next";
import { company } from "@/data/company";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import WhatsAppLink from "@/components/ui/WhatsAppLink";

export const metadata: Metadata = {
  title: "Contact & Distributor Registration",
  description:
    "Contact Green Land and Ocean Blue Energy or register your interest as a distributor, franchise or AdBlue filling station partner.",
};

export default function ContactPage() {
  return (
    <section className="py-16">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy sm:text-4xl">Contact Us</h1>
          <p className="mt-4 text-gray-700">
            Reach out for enquiries, distributor or franchise registration,
            complaints or careers.
          </p>

          <dl className="mt-8 space-y-4">
            <div>
              <dt className="text-sm font-semibold text-brand-navy">Phone</dt>
              <dd className="text-gray-700">{company.contact.phone}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-brand-navy">Email</dt>
              <dd className="text-gray-700">{company.contact.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-brand-navy">Address</dt>
              <dd className="text-gray-700">{company.contact.address}</dd>
            </div>
          </dl>
         <div className="mt-6">
            <WhatsAppLink>Chat on WhatsApp</WhatsAppLink>
          </div>
          <p className="mt-6 text-sm text-gray-600">
            Contact categories: {company.contactCategories.join(", ")}.
          </p>
        </div>

        <div>
          <SectionHeading title="Distributor Registration" />
          {/* The enquiry form will be added in Step 8 */}
          <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-6 text-sm text-gray-500">
            Registration form coming in the next step.
          </div>
          <p className="mt-4 text-xs text-gray-500">
            [PLACEHOLDER: Privacy notice to be finalized by the business before launch.]
          </p>
        </div>
      </Container>
    </section>
  );
}