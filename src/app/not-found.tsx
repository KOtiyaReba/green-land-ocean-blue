import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container>
        <h1 className="text-3xl font-bold text-brand-navy">Page not found</h1>
        <p className="mt-3 text-gray-700">
          The page you are looking for does not exist or has moved.
        </p>
        <Button href="/" className="mt-6">
          Back to Home
        </Button>
      </Container>
    </section>
  );
}