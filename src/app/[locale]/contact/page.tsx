import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the EliteTec Tools team.",
  alternates: {
    canonical: "/en/contact",
    languages: { en: "/en/contact", "x-default": "/en/contact" },
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Contact</h1>
      <div className="mt-6 space-y-4 text-muted">
        <p>
          Questions, bug reports, or ideas for the next tool? We&apos;d like to hear
          from you.
        </p>
        <p>
          <a
            href="mailto:info@eliteteconline.com"
            className="font-medium text-accent hover:text-accent-hover"
          >
            info@eliteteconline.com
          </a>
        </p>
        <p>We try to reply to every message, though it may take a few days.</p>
      </div>
    </div>
  );
}
