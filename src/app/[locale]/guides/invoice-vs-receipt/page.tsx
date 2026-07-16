import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Invoice vs Receipt: What's the Difference?",
  description:
    "Invoices and receipts are not the same document. Learn what each one is, when to send it, what it should contain, and why the difference matters for getting paid and keeping records.",
  alternates: {
    canonical: "/en/guides/invoice-vs-receipt",
    languages: {
      en: "/en/guides/invoice-vs-receipt",
      "x-default": "/en/guides/invoice-vs-receipt",
    },
  },
};

const URL = `${SITE.url}/en/guides/invoice-vs-receipt`;

const faqs = [
  {
    q: "Is an invoice the same as a receipt?",
    a: "No. An invoice is a request for payment sent before the client pays — it says how much is owed and by when. A receipt is proof of payment issued after the client has paid. They serve opposite ends of the same transaction.",
  },
  {
    q: "Do I need to send both an invoice and a receipt?",
    a: "Usually yes. You send the invoice to ask for payment, then a receipt once the payment clears so the client has proof for their records. Some small cash sales only need a receipt, but for most business-to-business work you issue both.",
  },
  {
    q: "Can one document act as both an invoice and a receipt?",
    a: "For paid-on-the-spot sales, a single document marked \"Paid\" can serve as both. But when payment happens later (for example on Net 30 terms), you need a separate invoice up front and a receipt after payment.",
  },
  {
    q: "Does a receipt need an invoice number?",
    a: "A good receipt references the invoice it settles, so both parties can match the payment to the original request. Include the invoice number, the amount paid, the payment date, and the method used.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Invoice vs Receipt: What's the Difference?",
    description:
      "What an invoice is, what a receipt is, when to send each, and why the difference matters for getting paid and keeping records.",
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
      { "@type": "ListItem", position: 2, name: "Invoice vs Receipt", item: URL },
    ],
  },
];

export default function InvoiceVsReceiptPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd data={jsonLd} />
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        Invoice vs Receipt: What&apos;s the Difference?
      </h1>

      <div className="mt-6 space-y-5 text-muted">
        <p>
          Invoice and receipt get used almost interchangeably in everyday speech, but
          they are two different documents that do opposite jobs. Mixing them up can
          confuse clients, slow down payment, and make your bookkeeping messier than it
          needs to be. The distinction is simple once you see it: an invoice asks for
          money, a receipt confirms money was paid.
        </p>

        <h2 className="text-xl font-semibold text-ink">What an invoice is</h2>
        <p>
          An invoice is a request for payment. You send it <em>before</em> the client
          has paid, to tell them how much they owe, what it is for, and when payment is
          due. It carries a unique invoice number, the issue and due dates, an itemized
          list of charges, any tax, and the total amount owed. Until it is paid, an
          invoice represents money you are still waiting to receive. If you are not sure
          what to put on one, see our guide on{" "}
          <Link
            href="/en/guides/how-to-write-an-invoice"
            className="text-accent hover:text-accent-hover"
          >
            how to write a professional invoice
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold text-ink">What a receipt is</h2>
        <p>
          A receipt is proof of payment. You issue it <em>after</em> the client has
          paid, so both of you have a record that the transaction is settled. A receipt
          usually shows the amount paid, the date of payment, the payment method, and a
          reference back to the original invoice. Where an invoice says &quot;please
          pay,&quot; a receipt says &quot;payment received — we&apos;re square.&quot;
        </p>

        <h2 className="text-xl font-semibold text-ink">The key differences at a glance</h2>
        <p>
          Timing is the biggest one: an invoice comes before payment, a receipt after.
          Purpose follows from that — an invoice requests money and often states payment
          terms like{" "}
          <Link
            href="/en/guides/net-30-vs-net-15"
            className="text-accent hover:text-accent-hover"
          >
            Net 30
          </Link>
          , while a receipt simply confirms the money arrived. Accounting-wise, an
          unpaid invoice sits in accounts receivable (money owed to you); a receipt
          marks that balance as cleared. And legally, an invoice is a demand for
          payment, whereas a receipt is evidence a debt was discharged.
        </p>

        <h2 className="text-xl font-semibold text-ink">Why the difference matters</h2>
        <p>
          Clients — especially larger ones with an accounts payable team — expect the
          right document at the right time. Send a &quot;receipt&quot; when you actually
          mean &quot;invoice&quot; and it may never get routed for payment, because a
          receipt implies nothing is owed. Send an invoice after payment and you risk
          looking like you are double-billing. Getting the labels right keeps the
          transaction clean and your records accurate at tax time.
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
          Need to send the request-for-payment side of this? Our{" "}
          <Link href="/en/invoice-generator" className="text-accent hover:text-accent-hover">
            free Invoice Generator
          </Link>{" "}
          creates a clean, professional invoice you can download as a PDF in minutes —
          no account required.
        </p>
      </div>
    </article>
  );
}
