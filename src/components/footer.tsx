import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
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
      <div className="border-t border-border px-6 py-3 text-center text-xs text-muted">
        {t("browserOnlyNote")}
      </div>
    </footer>
  );
}
