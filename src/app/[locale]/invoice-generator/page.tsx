import type { Metadata } from "next";
import { InvoiceGeneratorClient } from "./invoice-generator-client";

export const metadata: Metadata = {
  title: "Free Invoice Generator — No Sign-Up, PDF Download",
  description:
    "Create a professional invoice for free, right in your browser. No sign-up required — fill in your details and download a print-ready PDF instantly.",
};

export default function InvoiceGeneratorPage() {
  return <InvoiceGeneratorClient />;
}
