"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
    leadSchema,
    INTEREST_TYPES,
    PRODUCT_INTERESTS,
} from "@/lib/validation";
import Button from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-green aria-[invalid=true]:border-red-600";

function Field({
    id,
    label,
    required,
    error,
    children,
}: {
    id: string;
    label: string;
    required?: boolean;
    error?: string;
    children: ReactNode;
}) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-brand-navy">
                {label}
                {required && <span aria-hidden="true"> *</span>}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} className="mt-1 text-sm text-red-700">
                    {error}
                </p>
            )}
        </div>
    );
}

export default function LeadForm() {
    const [status, setStatus] = useState<Status>("idle");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [message, setMessage] = useState("");

    const aria = (name: string) => ({
        "aria-invalid": errors[name] ? true : undefined,
        "aria-describedby": errors[name] ? `${name}-error` : undefined,
    });

    function clearError(event: FormEvent<HTMLFormElement>) {
        const name = (event.target as HTMLInputElement).name;
        if (!name || !errors[name]) return;
        setErrors((prev) => {
            const next = { ...prev };
            delete next[name];
            return next;
        });
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const get = (key: string) => String(data.get(key) ?? "");

        const values = {
            fullName: get("fullName"),
            mobile: get("mobile"),
            email: get("email"),
            businessName: get("businessName"),
            state: get("state"),
            district: get("district"),
            interest: get("interest"),
            productInterest: get("productInterest"),
            message: get("message"),
            consent: data.get("consent") === "on",
            website: get("website"), // honeypot
        };

        // Client-side validation (the server validates again).
        const result = leadSchema.safeParse(values);
        if (!result.success) {
            const found: Record<string, string> = {};
            for (const issue of result.error.issues) {
                const key = String(issue.path[0] ?? "form");
                if (!found[key]) found[key] = issue.message;
            }
            setErrors(found);
            setStatus("error");
            setMessage("Please correct the highlighted fields.");
            return;
        }

        setErrors({});
        setStatus("submitting");
        setMessage("");

        try {
            const res = await fetch("/api/distributor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const json = await res.json().catch(() => null);

            if (res.ok && json?.ok) {
                setStatus("success");
                form.reset();
                return;
            }
            setErrors(json?.errors ?? {});
            setStatus("error");
            setMessage(json?.message ?? "Something went wrong. Please try again.");
        } catch {
            setStatus("error");
            setMessage("Network error. Please check your connection and try again.");
        }
    }

    if (status === "success") {
        return (
            <div role="status" className="rounded-lg border border-brand-green bg-surface p-6">
                <p className="font-semibold text-brand-navy">Thank you for your interest.</p>
                <p className="mt-2 text-sm text-gray-700">
                    We have received your details and will get in touch with you.
                </p>
                <Button
                    variant="secondary"
                    className="mt-4"
                    type="button"
                    onClick={() => setStatus("idle")}
                >
                    Submit another enquiry
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit}onInput={clearError} noValidate className="space-y-5">
            {/* Honeypot: hidden from people and screen readers */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <Field id="fullName" label="Full name" required error={errors.fullName}>
                    <input id="fullName" name="fullName" type="text" autoComplete="name"
                        className={inputClass} {...aria("fullName")} />
                </Field>
                <Field id="mobile" label="Mobile number" required error={errors.mobile}>
                    <input id="mobile" name="mobile" type="tel" autoComplete="tel"
                        className={inputClass} {...aria("mobile")} />
                </Field>
                <Field id="email" label="Email (optional)" error={errors.email}>
                    <input id="email" name="email" type="email" autoComplete="email"
                        className={inputClass} {...aria("email")} />
                </Field>
                <Field id="businessName" label="Business name (optional)" error={errors.businessName}>
                    <input id="businessName" name="businessName" type="text" autoComplete="organization"
                        className={inputClass} {...aria("businessName")} />
                </Field>
                <Field id="state" label="State" required error={errors.state}>
                    <input id="state" name="state" type="text"
                        className={inputClass} {...aria("state")} />
                </Field>
                <Field id="district" label="District" required error={errors.district}>
                    <input id="district" name="district" type="text"
                        className={inputClass} {...aria("district")} />
                </Field>
                <Field id="interest" label="I am interested in" required error={errors.interest}>
                    <select id="interest" name="interest" defaultValue=""
                        className={inputClass} {...aria("interest")}>
                        <option value="" disabled>Select an option</option>
                        {INTEREST_TYPES.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </Field>
                <Field id="productInterest" label="Product interest" required error={errors.productInterest}>
                    <select id="productInterest" name="productInterest" defaultValue=""
                        className={inputClass} {...aria("productInterest")}>
                        <option value="" disabled>Select an option</option>
                        {PRODUCT_INTERESTS.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </Field>
            </div>

            <Field id="message" label="Message (optional)" error={errors.message}>
                <textarea id="message" name="message" rows={4}
                    className={inputClass} {...aria("message")} />
            </Field>

            <div>
                <label className="flex items-start gap-2 text-sm text-gray-700">
                    <input type="checkbox" name="consent"
                        className="mt-1 h-4 w-4 accent-brand-green" {...aria("consent")} />
                    <span>
                        I agree to be contacted about my enquiry and to the processing of my
                        details as described in the privacy notice.{" "}
                        <span className="text-gray-500">
                            [PLACEHOLDER: privacy notice to be finalized by the business before launch.]
                        </span>
                    </span>
                </label>
                {errors.consent && (
                    <p id="consent-error" className="mt-1 text-sm text-red-700">{errors.consent}</p>
                )}
            </div>

            <div aria-live="polite">
                {status === "error" && message && (
                    <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                        {message}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending..." : "Submit Registration"}
            </Button>
        </form>
    );
}