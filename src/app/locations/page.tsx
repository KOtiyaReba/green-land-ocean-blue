import type { Metadata } from "next";
import { company } from "@/data/company";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Our coverage in Kerala and South Tamil Nadu, and distributor and AdBlue filling station opportunities across India.",
};

export default function LocationsPage() {
  return (
    <>
      <section className="bg-surface py-16">
        <Container>
          <h1 className="text-3xl font-bold text-brand-navy sm:text-4xl">Locations</h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-700">
            Headquartered in {company.headquarters}.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading title="Current Coverage" />
          <ul className="mt-6 flex flex-wrap gap-3">
            {company.coverage.current.map((area) => (
              <li
                key={area}
                className="rounded-full bg-brand-green px-4 py-2 text-sm font-medium text-white"
              >
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-2xl text-gray-700">{company.coverage.expansion}</p>
        </Container>
      </section>

      <section className="bg-surface py-16">
        <Container>
          <SectionHeading
            title="Partner With Us"
            subtitle="We welcome enquiries from businesses who would like to join our network."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Distributor",
                text: "Interested in distributing our products in your region? Get in touch.",
              },
              {
                title: "Franchise",
                text: "Enquire about franchise opportunities with Green Land and Ocean Blue Energy.",
              },
              {
                title: "AdBlue Filling Station",
                text: "Explore the AdBlue Filling Station (AFS) franchise opportunity.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
          <Button href="/contact" className="mt-8">
            Register Your Interest
          </Button>
        </Container>
      </section>
    </>
  );
}