import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Net 15 vs Net 30 vs Net 60: Which Payment Term Should You Use?",
  description:
    "A plain-English explanation of Net 15, Net 30, and Net 60 payment terms, when freelancers and small businesses use each, and answers to common questions.",
};

const URL = `${SITE.url}/en/guides/net-30-vs-net-15`;

const faqs = [
  {
    q: "What does Net 30 mean on an invoice?",
    a: "Net 30 means the full invoice amount is due 30 days after the invoice date, with no early-payment discount. Net 15 and Net 60 work the same way with 15 or 60 days instead.",
  },
  {
    q: "Is Net 30 counted from the invoice date or the delivery date?",
    a: "By default it is counted from the invoice (issue) date. If you want it measured from delivery or from receipt, say so explicitly on the invoice, because otherwise the client will assume the invoice date.",
  },
  {
    q: "What does 2/10 Net 30 mean?",
    a: "It means the full amount is due in 30 days, but the client can take a 2% discount if they pay within 10 days. It is a way to encourage faster payment in exchange for a small price reduction.",
  },
  {
    q: "Which payment term is best for freelancers?",
    a: "Net 15 or due-on-receipt is often better for freelancers and small jobs because it keeps cash flow tight. Net 30 is a safe default for business-to-business work, and Net 60 is usually only worth accepting for large clients if you price the delay into your rates.",
  },
  {
    q: "Can I charge a late fee if a client misses the term?",
    a: "Yes, if you stated the late-fee policy in advance on the invoice or in your contract. Make the terms visible before the work starts rather than adding a surprise fee afterward.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Net 15 vs Net 30 vs Net 60: Which Payment Term Should You Use?",
    description:
      "A plain-English explanation of Net 15, Net 30, and Net 60 payment terms, and when freelancers and small businesses typically use each.",
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: URL,
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/en` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Net 15 vs Net 30 vs Net 60",
        item: URL,
      },
    ],
  },
];

export default function Net30VsNet15Page() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd data={jsonLd} />
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        Net 15 vs Net 30 vs Net 60: Which Payment Term Should You Use?
      </h1>

      <div className="mt-6 space-y-5 text-muted">
        <p>
          &quot;Net 30&quot; is one of those phrases that shows up on almost every
          invoice but rarely gets explained. It simply means payment is due 30 days
          after the invoice date. Net 15 and Net 60 work the same way, just with 15 or
          60 days instead. The &quot;net&quot; refers to the full amount owed, with no
          early-payment discount attached — as opposed to terms like &quot;2/10 Net
          30,&quot; which offer a discount for paying within 10 days.
        </p>

        <h2 className="text-xl font-semibold text-ink">Net 15</h2>
        <p>
          A 15-day window is common for smaller jobs, new client relationships where
          you want to keep cash flow tight, or freelancers who simply prefer getting
          paid sooner rather than later. It puts more pressure on the client to pay
          quickly, which is reasonable for lower-value or one-off engagements, but it
          can feel aggressive for larger corporate clients who are used to longer
          cycles.
        </p>

        <h2 className="text-xl font-semibold text-ink">Net 30</h2>
        <p>
          This is the most widely used default in business-to-business invoicing. It
          gives the client a full billing cycle to process payment through their
          accounts payable workflow, which is often how larger companies operate
          regardless of what you ask for. If you don&apos;t have a strong reason to
          choose something else, Net 30 is a safe, expected starting point.
        </p>

        <h2 className="text-xl font-semibold text-ink">Net 60</h2>
        <p>
          Longer terms like Net 60 usually show up in relationships with larger
          enterprise clients, agencies billing on behalf of another party, or
          industries where long payment cycles are the norm (construction and
          wholesale, for example). Net 60 is friendlier to the client&apos;s cash flow
          but harder on yours, so it&apos;s worth pricing that trade-off into your
          rates if a client requires it.
        </p>

        <h2 className="text-xl font-semibold text-ink">
          Due-on-receipt and early-payment discounts
        </h2>
        <p>
          Two other options are worth knowing. &quot;Due on receipt&quot; asks for
          payment as soon as the invoice arrives — useful for one-off jobs or clients
          you haven&apos;t worked with before. Early-payment discounts like 2/10 Net 30
          keep a standard 30-day term but reward the client for paying early; they can
          speed up cash flow, but only offer one if the small discount is worth it to
          you.
        </p>

        <h2 className="text-xl font-semibold text-ink">Which one should you use?</h2>
        <p>
          For most freelancers and small businesses, Net 30 is a reasonable default
          unless you have a specific reason to shorten or extend it. If cash flow is
          tight, or you&apos;re working with a new client whose reliability you
          haven&apos;t tested yet, Net 15 (or even due-on-receipt) reduces your risk.
          If you&apos;re working with a large client whose finance department has
          strict, longer cycles, you may not have much choice beyond Net 60 — in which
          case it&apos;s worth factoring that delay into your pricing or cash-flow
          planning.
        </p>

        <h2 className="text-xl font-semibold text-ink">The one rule that matters most</h2>
        <p>
          Whatever term you choose, state it clearly on every single invoice — not
          just in an email or a contract the client signed months ago. A due date
          printed directly on the invoice is far less likely to be missed than a term
          buried in earlier correspondence. If you&apos;re still deciding what else
          belongs on the document, see our guide on{" "}
          <Link
            href="/en/guides/how-to-write-an-invoice"
            className="text-accent hover:text-accent-hover"
          >
            how to write a professional invoice
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold text-ink">Frequently asked questions</h2>
        <div className="space-y-5">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-ink">{f.q}</h3>
              <p className="mt-1">{f.a}</p>
            </div>
          ))}
        </div>

        <p>
          Our{" "}
          <Link href="/en/invoice-generator" className="text-accent hover:text-accent-hover">
            free Invoice Generator
          </Link>{" "}
          lets you set an issue date and due date directly on the invoice, so your
          payment terms are always front and center.
        </p>
      </div>
    </article>
  );
}
