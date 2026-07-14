import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How EliteTec Tools handles your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: 2026</p>

      <div className="mt-6 space-y-6 text-muted">
        <section>
          <h2 className="text-lg font-semibold text-ink">Data entered into our tools</h2>
          <p className="mt-2">
            The Invoice Generator, and every tool we add to this site, is designed to
            run entirely in your browser. The business details, client details, line
            items, and any other information you type into a tool are processed
            locally on your device using JavaScript — they are never transmitted to,
            or stored on, any server we operate. When you click &quot;Download PDF,&quot;
            the file is generated in your browser and saved directly to your device.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Local storage</h2>
          <p className="mt-2">
            To save you from re-typing everything if you close the tab, the Invoice
            Generator uses your browser&apos;s local storage to remember your most
            recent draft on your own device. This data never leaves your browser and
            is not accessible to us. You can clear it at any time by clearing your
            browser&apos;s site data for this domain.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Advertising</h2>
          <p className="mt-2">
            Once this site is approved for Google AdSense, Google and its advertising
            partners may use cookies or similar technologies to serve ads and measure
            their performance. This is separate from — and has no access to — the data
            you enter into our tools. You can learn more about how Google uses this
            information, and manage your ad preferences, through Google&apos;s own{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent hover:text-accent-hover"
            >
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Analytics</h2>
          <p className="mt-2">
            We use Google Analytics to understand aggregate traffic to this site — for
            example, how many people visit, which pages they view, and which sites or
            searches referred them. Google Analytics uses cookies and collects data
            such as your approximate location, device/browser type, and the pages you
            visit. This is separate from — and has no access to — the data you enter
            into our tools, which never leaves your browser. You can learn more, or opt
            out of Google Analytics tracking across sites, through{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent hover:text-accent-hover"
            >
              Google&apos;s own Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Server logs</h2>
          <p className="mt-2">
            Like most websites, our hosting infrastructure may automatically collect
            basic web server logs (such as IP address, browser/user agent, and pages
            requested) for security purposes. This is standard operational logging, not
            information tied to what you type into a tool.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Contact</h2>
          <p className="mt-2">
            If you have questions about this policy, please reach out via our{" "}
            <Link href="/contact" className="text-accent hover:text-accent-hover">
              Contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
