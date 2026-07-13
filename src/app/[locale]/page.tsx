import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const TOOLS = [
  {
    slug: "invoice-generator",
    titleKey: "invoiceGenerator.title",
    descriptionKey: "invoiceGenerator.description",
  },
] as const;

export default function HomePage() {
  const t = useTranslations("home");
  const tTools = useTranslations("tools");

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {t("heroHeading")}
        </h1>
        <p className="mt-4 text-lg text-muted">{t("heroSubheading")}</p>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-ink">
              {tTools(tool.titleKey)}
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted">
              {tTools(tool.descriptionKey)}
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-accent group-hover:text-accent-hover">
              {t("toolCtaLabel")}
              <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
