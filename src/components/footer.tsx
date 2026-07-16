import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const GUIDES = [
  { href: "/guides/how-to-write-an-invoice", label: "How to Write an Invoice" },
  { href: "/guides/how-to-send-an-invoice", label: "How to Send an Invoice" },
  { href: "/guides/invoice-vs-receipt", label: "Invoice vs Receipt" },
  { href: "/guides/net-30-vs-net-15", label: "Net 15 vs Net 30 vs Net 60" },
  { href: "/guides/late-paying-clients", label: "Late-Paying Clients" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-ink">
            Invoicing guides
          </h2>
          <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
            {GUIDES.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="transition-colors hover:text-ink"
              >
                {g.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright", { year })}</p>
          <nav className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="transition-colors hover:text-ink">
              {t("aboutLabel")}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-ink">
              {t("contactLabel")}
            </Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-ink">
              {t("privacyLabel")}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              {t("termsLabel")}
            </Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-border px-6 py-3 text-center text-xs text-muted">
        {t("browserOnlyNote")}
      </div>
    </footer>
  );
}
