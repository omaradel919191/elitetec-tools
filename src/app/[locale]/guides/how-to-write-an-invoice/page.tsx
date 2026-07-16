import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Write a Professional Invoice",
  description:
    "A practical guide to what belongs on a professional invoice: business details, client details, itemized charges, tax, payment terms, and notes — plus common mistakes and FAQs.",
};

const URL = `${SITE.url}/en/guides/how-to-write-an-invoice`;

const faqs = [
  {
    q: "What information must a professional invoice include?",
    a: "At minimum: your business name and contact details, the client's name and billing address, a unique invoice number, the issue date and due date, an itemized list of charges with quantities and prices, any tax, the total amount due, and how you want to be paid.",
  },
  {
    q: "Do I legally need to put an invoice number on every invoice?",
    a: "In most countries a unique, sequential invoice number is expected for bookkeeping and tax purposes. Even where it is not strictly required by law, it prevents duplicate payments and makes your records auditable, so you should always include one.",
  },
  {
    q: "Should I charge tax on my invoice?",
    a: "It depends on your location, your registration status, and what you sell. If you are registered for sales tax or VAT you generally must show the rate and amount as a separate line. Tax rules vary widely, so confirm what applies to you with a local accountant rather than guessing.",
  },
  {
    q: "How do I get clients to pay an invoice faster?",
    a: "Send it promptly, state a clear due date directly on the invoice, itemize the work so approvers can verify it, and make payment easy by including bank details or a payment link. Vague, undated invoices are the ones that get delayed.",
  },
  {
    q: "Can I create an invoice for free?",
    a: "Yes. You can build a professional, print-ready PDF invoice for free in your browser with no account using the EliteTec Invoice Generator.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Write a Professional Invoice",
    description:
      "A practical guide to what belongs on a professional invoice: business details, client details, itemized charges, tax, payment terms, and notes.",
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
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
        name: "How to Write a Professional Invoice",
        item: URL,
      },
    ],
  },
];

export default function HowToWriteAnInvoicePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd data={jsonLd} />
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        How to Write a Professional Invoice
      </h1>

      <div className="mt-6 space-y-5 text-muted">
        <p>
          A good invoice does two jobs at once: it asks to be paid, and it removes
          every reason a client might have to delay paying. Vague invoices — missing a
          due date, unclear about what was delivered, or hard to match against a
          quote — get pushed to the bottom of the pile. Clear ones tend to get paid
          faster. Here is what a professional invoice should include, section by
          section, along with the mistakes that most often slow payment down.
        </p>

        <h2 className="text-xl font-semibold text-ink">Your business details</h2>
        <p>
          Start with who is asking to be paid. Include your business name, address,
          and an email address the client can use to ask questions. If you operate as
          a sole proprietor, your own name is fine — the point is that the client can
          immediately tell who sent the invoice and how to reach you. If you have a
          logo, adding it near the top makes the document look established and easier
          to recognize among a stack of vendor invoices.
        </p>

        <h2 className="text-xl font-semibold text-ink">Client details</h2>
        <p>
          Add the client&apos;s name or company name and their billing address. This
          matters more than it sounds: larger clients often route invoices through an
          accounts payable department, and if the invoice isn&apos;t addressed clearly
          to the right entity, it can sit in a queue far longer than it should. If your
          client gave you a purchase order (PO) number, put it on the invoice too —
          many finance teams will not release payment without it.
        </p>

        <h2 className="text-xl font-semibold text-ink">Invoice number and dates</h2>
        <p>
          Every invoice needs a unique invoice number. It doesn&apos;t need to be
          complicated — a simple sequential format like INV-0001, INV-0002, and so on
          works well and makes it easy for both you and your client to reference the
          invoice later. Alongside the number, include the issue date (when the
          invoice was created) and the due date (when payment is expected). Without an
          explicit due date, many clients will default to paying whenever it&apos;s
          convenient for them, which is rarely fast.
        </p>

        <h2 className="text-xl font-semibold text-ink">Itemized charges</h2>
        <p>
          List each product or service as a separate line, with a short description,
          the quantity, and the unit price. Itemizing does more than look tidy — it
          gives the client something to check their own records against, which is
          often exactly what an approver needs before releasing payment. Avoid vague
          single-line invoices like &quot;Services rendered — $1,200&quot;; break the
          work down into recognizable pieces instead.
        </p>

        <h2 className="text-xl font-semibold text-ink">Subtotal, tax, and total</h2>
        <p>
          Show the subtotal (the sum of your line items), then any tax, then the final
          total on its own line. If you&apos;re required to charge sales tax, VAT, or
          another tax, show the rate and the resulting amount separately so the client
          can see exactly how the total was reached. Tax rules vary widely by location
          and business type, so if you&apos;re not sure what applies to you, it&apos;s
          worth a quick check with a local accountant rather than guessing. If you
          offer a discount, apply it before tax and label it clearly.
        </p>

        <h2 className="text-xl font-semibold text-ink">Payment terms</h2>
        <p>
          State how you expect to be paid — bank transfer details, a payment link, or
          whatever method you accept — and restate the payment terms (for example, Net
          30) directly on the invoice, even if you already agreed on them elsewhere.
          Clients handle dozens of vendors; don&apos;t make them dig through old emails
          to find your terms. If you&apos;re unsure which term to choose, see our guide
          on{" "}
          <Link
            href="/en/guides/net-30-vs-net-15"
            className="text-accent hover:text-accent-hover"
          >
            Net 15 vs Net 30 vs Net 60
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold text-ink">Notes</h2>
        <p>
          A short notes section is useful for anything that doesn&apos;t fit
          elsewhere: a thank-you message, a reminder of a late-payment policy, or
          reference numbers the client&apos;s finance team might need. Keep it brief —
          this is a supplement to the invoice, not another place to bury important
          terms.
        </p>

        <h2 className="text-xl font-semibold text-ink">Common mistakes to avoid</h2>
        <p>
          The invoices that get paid late usually share a few avoidable flaws: no due
          date, so there&apos;s no deadline to miss; a single vague line item that an
          approver can&apos;t verify; the wrong billing entity, so it never reaches the
          right desk; a missing PO number; or math that doesn&apos;t add up, which
          forces the client to send it back and start the clock over. Sending the
          invoice late is its own mistake — the sooner it lands, the sooner the payment
          cycle begins.
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
          Once you know what belongs on an invoice, putting one together shouldn&apos;t
          take more than a few minutes. Our{" "}
          <Link href="/en/invoice-generator" className="text-accent hover:text-accent-hover">
            free Invoice Generator
          </Link>{" "}
          walks through exactly these fields and gives you a downloadable PDF the
          moment you&apos;re done — no account required.
        </p>
      </div>
    </article>
  );
}
