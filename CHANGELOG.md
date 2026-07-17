# Changelog

Notes for anyone (or Claude Code) picking up this project. Newest first.

## 2026-07-17 — SEO overhaul, security, and invoice features

Four commits landed this day. All changes are live on https://eliteteconline.com
(Next.js app, Docker on a VPS, deployed via `git pull` + `docker compose ... up -d --build`).

### `9905af4` — Structured data + schema fix + richer guides
- Added a reusable `<JsonLd>` component: `src/components/json-ld.tsx`.
- Guides now emit `Article` + `FAQPage` + `BreadcrumbList` JSON-LD, each with a
  visible FAQ section that matches the schema.
- Fixed misplaced schema: `SoftwareApplication` JSON-LD was in the global
  `[locale]/layout.tsx` (so it rendered on every page). Moved it to the
  invoice-generator page only; the layout now emits `WebSite` + `Organization`.
- Expanded both original guides (were thin) with extra sections + FAQs.

### `c915c6b` — Self-referencing canonicals (important SEO fix)
- Every inner page inherited `canonical: /en` from the layout, telling Google
  they were duplicates of the homepage. Added a self-referencing `alternates`
  (canonical + hreflang) to each inner page's `metadata`:
  about, contact, privacy-policy, terms, invoice-generator, and all guides.
- The homepage still (correctly) canonicalizes to `/en` via the layout default.

### `84793aa` — Three new guide articles + internal linking
- New guides under `src/app/[locale]/guides/`:
  - `invoice-vs-receipt`
  - `how-to-send-an-invoice`
  - `late-paying-clients`
  Each has full Article/FAQPage/BreadcrumbList schema and a self-canonical.
- Added an "Invoicing guides" section to `src/components/footer.tsx` so all
  5 guides are linked site-wide (previously they were orphan pages).
- `src/app/sitemap.ts` now lists all 11 URLs.

### `1cf0b26` — Invoice tool: three features
Touches `src/lib/invoice-types.ts`, `invoice-generator-client.tsx`,
`src/lib/invoice-pdf.tsx`, `messages/en.json`.
- **Saved invoices history**: new `localStorage` key `invoice-generator:saved`
  holding `SavedInvoice[]`. UI panel to Save / Load / Duplicate / Delete.
- **Duplicate button**: clones the current invoice under a fresh number.
- **Multiple tax lines**: replaced the single `taxRate: number` with
  `taxes: TaxLine[]` (`{id, label, rate}`). `calculateTotals` now returns a
  `taxLines` breakdown + total `tax`. Preview and PDF render each line.
  - Backward compatible: `ensureTaxes()` migrates old drafts (single `taxRate`)
    into a one-line taxes array on load.
- Math verified: subtotal → discount → per-line tax on the taxable amount.

## Notes / conventions
- Knowledge files `EliteTec_Model.md` and `EliteTec_Invoice_Tool.md` are
  gitignored (Claude project context, not part of the app).
- The site is English-only for now (`routing.ts` has `locales: ["en"]`) despite
  the i18n scaffolding — this is intentional (US-focused, AdSense).
- SEO status: sitemap submitted in Search Console; new pages awaiting Google
  crawl/indexing (normal lag, not a bug).
