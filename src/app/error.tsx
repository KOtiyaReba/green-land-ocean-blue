"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="py-24">
      <Container>
        <h1 className="text-3xl font-bold text-brand-navy">Something went wrong</h1>
        <p className="mt-3 text-gray-700">
          Please try again. If the problem continues, contact us.
        </p>
        <Button className="mt-6" type="button" onClick={() => reset()}>
          Try again
        </Button>
      </Container>
    </section>
  );
}