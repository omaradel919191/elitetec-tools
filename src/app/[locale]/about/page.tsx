import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "EliteTec Tools is a small hub of free, browser-based business utilities, starting with an Invoice Generator.",
  alternates: {
    canonical: "/en/about",
    languages: { en: "/en/about", "x-default": "/en/about" },
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">About EliteTec Tools</h1>
      <div className="mt-6 space-y-4 text-muted">
        <p>
          EliteTec Tools is a small, growing collection of free business utilities that
          run entirely in your browser. We started with an Invoice Generator because
          it&apos;s one of the most common things freelancers and small businesses need
          to do quickly, without signing up for yet another account.
        </p>
        <p>
          Every tool here is designed to work without a login and without sending your
          data to a server. What you type stays on your device — the app just uses it
          to render a preview and, when you ask for it, generate a PDF you can download.
        </p>
        <p>
          Beyond standard, privacy-respecting analytics and — once the site is approved
          — advertising to help cover hosting costs, we don&apos;t collect the
          information you enter into the tools themselves.
        </p>
        <p>
          EliteTec Tools is built and maintained by an independent developer. More
          tools are on the way; if there&apos;s something you&apos;d find useful, feel
          free to reach out on the Contact page.
        </p>
      </div>
    </div>
  );
}
