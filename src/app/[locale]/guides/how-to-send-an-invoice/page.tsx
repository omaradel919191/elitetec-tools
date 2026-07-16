import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Send an Invoice (Email Steps + What to Say)",
  description:
    "A step-by-step guide to sending an invoice by email: when to send it, what to attach, what to write in the email body, and a copy-paste template that gets you paid faster.",
  alternates: {
    canonical: "/en/guides/how-to-send-an-invoice",
    languages: {
      en: "/en/guides/how-to-send-an-invoice",
      "x-default": "/en/guides/how-to-send-an-invoice",
    },
  },
};

const URL = `${SITE.url}/en/guides/how-to-send-an-invoice`;

const faqs = [
  {
    q: "How should I send an invoice to a client?",
    a: "The most common and reliable way is by email, with the invoice attached as a PDF. PDF keeps the layout intact on any device and can't be edited accidentally. Paste a short, polite message in the email body and put the invoice number in the subject line.",
  },
  {
    q: "What should the invoice email subject line say?",
    a: "Keep it clear and searchable, for example: \"Invoice INV-0007 from [Your Business] — due Aug 15.\" Including the invoice number and due date helps the client's finance team find and process it quickly.",
  },
  {
    q: "When is the best time to send an invoice?",
    a: "Send it as soon as the work is delivered or the milestone is reached. The payment clock usually starts from the invoice date, so every day you delay sending is a day added to when you get paid.",
  },
  {
    q: "Should I send the invoice as a PDF or in the email body?",
    a: "Attach it as a PDF. A PDF looks professional, prints cleanly, and can't be altered. Use the email body only for a short cover note, not for the invoice details themselves.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Send an Invoice (Email Steps + What to Say)",
    description:
      "When to send an invoice, what to attach, what to write in the email, and a copy-paste template.",
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
      { "@type": "ListItem", position: 2, name: "How to Send an Invoice", item: URL },
    ],
  },
];

export default function HowToSendAnInvoicePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd data={jsonLd} />
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        How to Send an Invoice (Email Steps + What to Say)
      </h1>

      <div className="mt-6 space-y-5 text-muted">
        <p>
          Writing a good invoice is only half the job — how you send it affects how fast
          you get paid. A clear email with the right attachment and a polite nudge makes
          it easy for the client to act. A vague one gets ignored. Here is a simple,
          repeatable way to send invoices that land well.
        </p>

        <h2 className="text-xl font-semibold text-ink">Step 1: Finish the invoice and export a PDF</h2>
        <p>
          Before you write a single line of email, make sure the invoice itself is
          complete: a unique invoice number, issue and due dates, itemized charges, tax,
          and the total. Export it as a PDF so the layout stays intact on any device. If
          you need a quick way to produce one, our{" "}
          <Link href="/en/invoice-generator" className="text-accent hover:text-accent-hover">
            free Invoice Generator
          </Link>{" "}
          gives you a print-ready PDF in minutes. Not sure what belongs on it? See{" "}
          <Link
            href="/en/guides/how-to-write-an-invoice"
            className="text-accent hover:text-accent-hover"
          >
            how to write a professional invoice
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold text-ink">Step 2: Write a clear subject line</h2>
        <p>
          The subject line is what a busy accounts payable clerk scans first. Make it
          specific: include your business name, the invoice number, and the due date.
          For example: <em>Invoice INV-0007 from Bright Studio — due August 15</em>.
          This makes the email easy to find later and signals exactly what it is.
        </p>

        <h2 className="text-xl font-semibold text-ink">Step 3: Keep the email body short and polite</h2>
        <p>
          The body is a cover note, not the invoice. Thank the client, state what the
          invoice is for, note the amount and due date, and point to the payment method.
          A few sentences is plenty — the detail lives in the attached PDF.
        </p>

        <h2 className="text-xl font-semibold text-ink">A copy-paste email template</h2>
        <p>
          Hi [Client name], thank you for your business. Please find attached invoice
          [INV-0007] for [brief description of work], totaling [$ amount]. Payment is
          due by [date] via [bank transfer / payment link]. If you have any questions
          about the invoice, just reply to this email and I&apos;ll be happy to help.
          Best regards, [Your name].
        </p>

        <h2 className="text-xl font-semibold text-ink">Step 4: Follow up on time</h2>
        <p>
          If the due date passes without payment, a short, friendly reminder usually
          does the trick — most late payments are simple oversights, not refusals. State
          the payment terms clearly up front (for instance{" "}
          <Link
            href="/en/guides/net-30-vs-net-15"
            className="text-accent hover:text-accent-hover"
          >
            Net 30
          </Link>
          ) so the deadline is never a surprise.
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
          Ready to create the invoice itself? Start with our{" "}
          <Link href="/en/invoice-generator" className="text-accent hover:text-accent-hover">
            free Invoice Generator
          </Link>{" "}
          — no sign-up, and you download the PDF straight from your browser.
        </p>
      </div>
    </article>
  );
}
