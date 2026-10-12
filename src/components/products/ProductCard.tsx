import { Droplet, Fuel, Battery, GlassWater, Shield } from "lucide-react";
import type { Product } from "@/data/products";
import Button from "@/components/ui/Button";

const icons = {
  droplet: Droplet,
  fuel: Fuel,
  battery: Battery,
  "glass-water": GlassWater,
  shield: Shield,
};

export default function ProductCard({ product }: { product: Product }) {
  const Icon = icons[product.icon];

  return (
    <article className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-surface text-brand-green">
        <Icon size={24} aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-brand-navy">{product.name}</h3>
      <p className="mt-2 flex-1 text-sm text-gray-600">{product.description}</p>
      <Button href="/contact" variant="secondary" className="mt-5 self-start">
        Enquire
      </Button>
    </article>
  );
}