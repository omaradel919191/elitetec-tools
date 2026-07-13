import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Net 15 vs Net 30 vs Net 60: Which Payment Term Should You Use?",
  description:
    "A plain-English explanation of Net 15, Net 30, and Net 60 payment terms, and when freelancers and small businesses typically use each.",
};

export default function Net30VsNet15Page() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
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
          buried in earlier correspondence.
        </p>

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
