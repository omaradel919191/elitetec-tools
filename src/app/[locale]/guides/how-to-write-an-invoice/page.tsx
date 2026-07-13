import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Write a Professional Invoice",
  description:
    "A practical guide to what belongs on a professional invoice: business details, client details, itemized charges, tax, payment terms, and notes.",
};

export default function HowToWriteAnInvoicePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        How to Write a Professional Invoice
      </h1>

      <div className="mt-6 space-y-5 text-muted">
        <p>
          A good invoice does two jobs at once: it asks to be paid, and it removes
          every reason a client might have to delay paying. Vague invoices — missing a
          due date, unclear about what was delivered, or hard to match against a
          quote — get pushed to the bottom of the pile. Clear ones tend to get paid
          faster. Here is what a professional invoice should include.
        </p>

        <h2 className="text-xl font-semibold text-ink">Your business details</h2>
        <p>
          Start with who is asking to be paid. Include your business name, address,
          and an email address the client can use to ask questions. If you operate as
          a sole proprietor, your own name is fine — the point is that the client can
          immediately tell who sent the invoice and how to reach you.
        </p>

        <h2 className="text-xl font-semibold text-ink">Client details</h2>
        <p>
          Add the client&apos;s name or company name and their billing address. This
          matters more than it sounds: larger clients often route invoices through an
          accounts payable department, and if the invoice isn&apos;t addressed clearly
          to the right entity, it can sit in a queue far longer than it should.
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

        <h2 className="text-xl font-semibold text-ink">Tax</h2>
        <p>
          If you&apos;re required to charge sales tax, VAT, or another tax, show the
          rate and the resulting amount as a separate line from the subtotal, with a
          clear total underneath. Tax rules vary widely by location and business type,
          so if you&apos;re not sure what applies to you, it&apos;s worth a quick check
          with a local accountant rather than guessing.
        </p>

        <h2 className="text-xl font-semibold text-ink">Payment terms</h2>
        <p>
          State how you expect to be paid — bank transfer details, a payment link, or
          whatever method you accept — and restate the payment terms (for example, Net
          30) directly on the invoice, even if you already agreed on them elsewhere.
          Clients handle dozens of vendors; don&apos;t make them dig through old emails
          to find your terms.
        </p>

        <h2 className="text-xl font-semibold text-ink">Notes</h2>
        <p>
          A short notes section is useful for anything that doesn&apos;t fit
          elsewhere: a thank-you message, a reminder of a late-payment policy, or
          reference numbers the client&apos;s finance team might need. Keep it brief —
          this is a supplement to the invoice, not another place to bury important
          terms.
        </p>

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
