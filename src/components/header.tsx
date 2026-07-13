import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
          {SITE.name}
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-muted">
          <Link href="/invoice-generator" className="transition-colors hover:text-ink">
            {t("invoiceGenerator")}
          </Link>
          <Link href="/about" className="transition-colors hover:text-ink">
            {t("about")}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-ink">
            {t("contact")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
