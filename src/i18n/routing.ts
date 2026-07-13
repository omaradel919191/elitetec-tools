import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  // "always" avoids a redirect loop seen with "as-needed" in Next's
  // standalone server output — keep this even with a single locale.
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
