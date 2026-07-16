import type { Metadata } from "next";
import { InvoiceGeneratorClient } from "./invoice-generator-client";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Invoice Generator — No Sign-Up, PDF Download",
  description:
    "Create a professional invoice for free, right in your browser. No sign-up required — fill in your details and download a print-ready PDF instantly.",
  alternates: {
    canonical: "/en/invoice-generator",
    languages: { en: "/en/invoice-generator", "x-default": "/en/invoice-generator" },
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Invoice Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    url: `${SITE.url}/en/invoice-generator`,
    description:
      "Create a professional invoice for free, right in your browser. No sign-up required — download a print-ready PDF instantly.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE.url}/en`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Invoice Generator",
        item: `${SITE.url}/en/invoice-generator`,
      },
    ],
  },
];

export default function InvoiceGeneratorPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <InvoiceGeneratorClient />
    </>
  );
}
