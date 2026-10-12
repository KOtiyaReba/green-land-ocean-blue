import { company } from "@/data/company";
import { products } from "@/data/products";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/products/ProductCard";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
            {company.tagline}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold text-brand-navy sm:text-5xl">
            {company.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-gray-700">{company.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/products">Explore Products</Button>
            <Button href="/contact" variant="secondary">
              Become a Distributor
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="py-16">
        <Container>
          <SectionHeading
            title="Our Products and Services"
            subtitle="Explore our range of products and business opportunities."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Network */}
      <section className="bg-brand-navy py-16 text-white">
        <Container className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Our Distribution Network</h2>
            <p className="mt-3 text-gray-200">
              We currently serve {company.coverage.current.join(" and ")}.{" "}
              {company.coverage.expansion}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button href="/locations">View Coverage</Button>
            <Button
              href="/contact"
              variant="secondary"
              className="border-white text-white hover:bg-white hover:text-brand-navy"
            >
              Join Our Network
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}