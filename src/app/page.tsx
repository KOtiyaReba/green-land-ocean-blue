import { company } from "@/data/company";
import { products } from "@/data/products";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/products/ProductCard";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import LeadForm from "@/components/forms/LeadForm";

const partnerOptions = [
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
];

export default function HomePage() {
  return (
    <>
      {/* Home / Hero */}
      <section id="home" className="bg-surface py-16 sm:py-24">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
            {company.tagline}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold text-brand-navy sm:text-5xl">
            {company.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-gray-700">{company.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#products">Explore Products</Button>
            <Button href="/#contact" variant="secondary">
              Become a Distributor
            </Button>
            <Button href="/#contact" variant="secondary">
              Contact Us
            </Button>
            <WhatsAppLink>WhatsApp Us</WhatsAppLink>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section id="products" className="py-16">
        <Container>
          <SectionHeading
            title="Our Products and Services"
            subtitle="Contact us for details, availability and enquiries."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* About */}
      <section id="about" className="bg-surface py-16">
        <Container>
          <SectionHeading title="About Us" />
          <p className="mt-4 max-w-3xl text-gray-700">{company.intro}</p>
          <p className="mt-3 max-w-3xl text-gray-700">
            Our headquarters is in {company.headquarters}.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-brand-navy">Our Vision</h3>
              <p className="mt-3 text-gray-700">{company.vision}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-brand-navy">Our Mission</h3>
              <p className="mt-3 text-gray-700">{company.mission}</p>
            </div>
          </div>

          <h3 className="mt-10 text-xl font-semibold text-brand-navy">Our Values</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {company.values.map((value) => (
              <li
                key={value}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-navy shadow-sm"
              >
                {value}
              </li>
            ))}
          </ul>

          <h3 className="mt-10 text-xl font-semibold text-brand-navy">Partnerships</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {company.partners.map((partner) => (
              <li key={partner.name} className="rounded-lg bg-white p-5 shadow-sm">
                <p className="font-semibold text-brand-navy">{partner.name}</p>
                <p className="mt-1 text-sm text-gray-600">{partner.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Locations */}
      <section id="locations" className="py-16">
        <Container>
          <SectionHeading
            title="Locations and Network"
            subtitle={`Headquartered in ${company.headquarters}.`}
          />

          <h3 className="mt-8 text-xl font-semibold text-brand-navy">Current Coverage</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
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

          <h3 className="mt-10 text-xl font-semibold text-brand-navy">Partner With Us</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {partnerOptions.map((item) => (
              <div key={item.title} className="rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-brand-navy">{item.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-surface py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="Contact Us"
              subtitle="Reach out for enquiries, distributor or franchise registration, complaints or careers."
            />

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
            <h3 className="text-xl font-semibold text-brand-navy">
              Distributor Registration
            </h3>
            <div className="mt-6">
              <LeadForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}