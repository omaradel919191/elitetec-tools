import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms under which you may use EliteTec Tools.",
  alternates: {
    canonical: "/en/terms",
    languages: { en: "/en/terms", "x-default": "/en/terms" },
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted">Last updated: 2026</p>

      <div className="mt-6 space-y-6 text-muted">
        <section>
          <h2 className="text-lg font-semibold text-ink">Free, as-is service</h2>
          <p className="mt-2">
            EliteTec Tools, including the Invoice Generator, is provided free of
            charge, &quot;as is&quot; and without any warranty of any kind, express or
            implied. We make no guarantee that the tools will be available at all
            times, free of errors, or fit for any particular purpose.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Not tax, legal, or accounting advice</h2>
          <p className="mt-2">
            Nothing on this site, including any tax rate fields, calculations, or
            invoice templates, constitutes tax, legal, or accounting advice. Rules for
            invoicing, sales tax, VAT, and payment terms vary by jurisdiction and
            change over time. Always verify the accuracy and compliance of any
            document you generate here with a qualified professional before sending it
            to a client or relying on it for any official purpose.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Your responsibility</h2>
          <p className="mt-2">
            You are solely responsible for the accuracy of the information you enter
            into our tools and for confirming that any resulting document complies
            with the laws and regulations that apply to you and your business.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Limitation of liability</h2>
          <p className="mt-2">
            To the fullest extent permitted by law, EliteTec Tools and its operator
            will not be liable for any direct, indirect, incidental, or consequential
            damages arising from your use of, or inability to use, this site or any
            document it helps you generate.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Changes</h2>
          <p className="mt-2">
            We may update these terms from time to time. Continued use of the site
            after changes are posted constitutes acceptance of the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}
