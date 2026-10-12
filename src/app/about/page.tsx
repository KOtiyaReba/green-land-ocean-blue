import type { Metadata } from "next";
import { company } from "@/data/company";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Green Land and Ocean Blue Energy, our vision, mission, values and partnerships.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-surface py-16">
        <Container>
          <h1 className="text-3xl font-bold text-brand-navy sm:text-4xl">About Us</h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-700">{company.intro}</p>
          <p className="mt-3 max-w-3xl text-gray-700">
            Our headquarters is in {company.headquarters}.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-brand-navy">Our Vision</h2>
            <p className="mt-3 text-gray-700">{company.vision}</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-brand-navy">Our Mission</h2>
            <p className="mt-3 text-gray-700">{company.mission}</p>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16">
        <Container>
          <SectionHeading title="Our Values" />
          <ul className="mt-6 flex flex-wrap gap-3">
            {company.values.map((value) => (
              <li
                key={value}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-navy shadow-sm"
              >
                {value}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading title="Partnerships" />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {company.partners.map((partner) => (
              <li key={partner.name} className="rounded-lg border border-gray-200 p-5">
                <p className="font-semibold text-brand-navy">{partner.name}</p>
                <p className="mt-1 text-sm text-gray-600">{partner.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}