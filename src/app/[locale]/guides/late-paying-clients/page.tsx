import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Deal With Late-Paying Clients",
  description:
    "Practical steps for handling late-paying clients: how to prevent late payments up front, how to follow up without damaging the relationship, and what to do when an invoice is seriously overdue.",
  alternates: {
    canonical: "/en/guides/late-paying-clients",
    languages: {
      en: "/en/guides/late-paying-clients",
      "x-default": "/en/guides/late-paying-clients",
    },
  },
};

const URL = `${SITE.url}/en/guides/late-paying-clients`;

const faqs = [
  {
    q: "How do I politely ask a client for an overdue payment?",
    a: "Keep the first reminder short and friendly: reference the invoice number, note that it is now past due, restate the amount and how to pay, and assume it was an oversight. Most late payments are simple forgetfulness, so a gentle nudge usually works.",
  },
  {
    q: "How long should I wait before following up on a late invoice?",
    a: "Send a friendly reminder the day after the due date, a firmer one about a week later, and a final notice around two to three weeks overdue. Consistent, scheduled follow-ups get better results than waiting and hoping.",
  },
  {
    q: "Can I charge a late fee for overdue invoices?",
    a: "Yes, if you stated the late-fee policy in advance on the invoice or in your contract. A common approach is a small percentage per month overdue. Never spring a surprise fee that the client never agreed to — set the expectation before the work starts.",
  },
  {
    q: "How do I stop clients from paying late in the first place?",
    a: "Prevent it up front: agree on clear payment terms, put an explicit due date on every invoice, invoice promptly, make paying easy with a payment link or bank details, and for new or higher-risk clients consider a deposit or shorter terms.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Deal With Late-Paying Clients",
    description:
      "How to prevent late payments, follow up without damaging the relationship, and handle seriously overdue invoices.",
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
      { "@type": "ListItem", position: 2, name: "Late-Paying Clients", item: URL },
    ],
  },
];

export default function LatePayingClientsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd data={jsonLd} />
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        How to Deal With Late-Paying Clients
      </h1>

      <div className="mt-6 space-y-5 text-muted">
        <p>
          Late payments are one of the most stressful parts of running a small business
          or freelancing. The good news is that most of them are avoidable, and the ones
          that do happen usually resolve with a calm, systematic follow-up rather than a
          confrontation. Here is how to prevent late payments and handle them when they
          occur.
        </p>

        <h2 className="text-xl font-semibold text-ink">Prevent late payments before they start</h2>
        <p>
          The best cure is prevention. Agree on payment terms in writing before the work
          begins, and put an explicit due date on every invoice — not just &quot;Net
          30&quot; buried in an old email. Invoice the moment the work is done, since the
          payment clock usually starts from the invoice date, and make paying effortless
          with a payment link or clear bank details. If you are choosing terms, our guide
          on{" "}
          <Link
            href="/en/guides/net-30-vs-net-15"
            className="text-accent hover:text-accent-hover"
          >
            Net 15 vs Net 30 vs Net 60
          </Link>{" "}
          can help you pick.
        </p>

        <h2 className="text-xl font-semibold text-ink">The first reminder: assume good faith</h2>
        <p>
          When a payment slips past its due date, start gently. Most late payments are
          oversights, not refusals. A short reminder the day after the due date —
          referencing the invoice number, the amount, and how to pay — is usually enough.
          Keep the tone warm and matter-of-fact; you are helping them fix a small
          administrative miss, not accusing them of anything.
        </p>

        <h2 className="text-xl font-semibold text-ink">Escalate calmly and on a schedule</h2>
        <p>
          If the first nudge goes unanswered, follow up on a predictable rhythm: a firmer
          note about a week later, then a final notice around two to three weeks overdue.
          Each message should stay professional, restate the outstanding amount, and make
          the next step obvious. A consistent schedule signals that you track your
          receivables and that the invoice will not simply be forgotten.
        </p>

        <h2 className="text-xl font-semibold text-ink">When an invoice is seriously overdue</h2>
        <p>
          For payments that drag well past the due date, apply any late fee you disclosed
          up front, and consider pausing further work until the balance is cleared. Keep
          every communication in writing so you have a clear record. For large sums that
          remain unpaid despite repeated follow-ups, a formal demand letter or a
          small-claims process may be warranted — but that is a last resort, and rules
          vary by location, so check what applies to you.
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
          A clear invoice with an explicit due date is your first line of defense against
          late payment. Create one in minutes with our{" "}
          <Link href="/en/invoice-generator" className="text-accent hover:text-accent-hover">
            free Invoice Generator
          </Link>{" "}
          — no sign-up required.
        </p>
      </div>
    </article>
  );
}
