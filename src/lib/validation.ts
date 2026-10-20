import { z } from "zod";

export const INTEREST_TYPES = [
  "Distributor",
  "Franchise",
  "AdBlue Filling Station",
] as const;

export const PRODUCT_INTERESTS = [
  "AdBlue / DEF",
  "Battery Water",
  "Drinking Water",
  "Anti-Corrosive Coatings",
  "Not sure yet",
] as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Accepts "98765 43210", "+91 98765 43210", "09876543210" -> "9876543210"
function normalizeMobile(value: string): string {
  const cleaned = value.replace(/[\s\-().]/g, "").replace(/^\+/, "");
  return /^(91|0)\d{10}$/.test(cleaned) ? cleaned.replace(/^(91|0)/, "") : cleaned;
}

const text = (max: number) =>
  z.string().trim().max(max, `Please use ${max} characters or fewer.`);

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Please use 100 characters or fewer."),
  mobile: z
    .string()
    .trim()
    .transform(normalizeMobile)
    .pipe(
      z
        .string()
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),
    ),
  email: text(150).refine(
    (v) => v === "" || EMAIL.test(v),
    "Enter a valid email address.",
  ),
  businessName: text(120),
  state: z
    .string()
    .trim()
    .min(2, "Please enter your state.")
    .max(60, "Please use 60 characters or fewer."),
  district: z
    .string()
    .trim()
    .min(2, "Please enter your district.")
    .max(60, "Please use 60 characters or fewer."),
  interest: z.enum(INTEREST_TYPES, { message: "Please select an option." }),
  productInterest: z.enum(PRODUCT_INTERESTS, {
    message: "Please select an option.",
  }),
  message: text(1000),
  consent: z
    .boolean()
    .refine((v) => v === true, "Please accept to continue."),
});

export type Lead = z.infer<typeof leadSchema>;