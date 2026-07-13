"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  calculateTotals,
  defaultInvoice,
  formatCurrency,
  newInvoiceItem,
  type InvoiceData,
} from "@/lib/invoice-types";

const DRAFT_KEY = "invoice-generator:draft";
const CURRENCIES = ["USD", "EUR", "GBP", "AED", "CAD", "AUD"];

export function InvoiceGeneratorClient() {
  const t = useTranslations("invoice");
  const [data, setData] = useState<InvoiceData>(() => defaultInvoice());
  const [hydrated, setHydrated] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Load a previously saved draft on mount, merging it over the defaults so
  // new fields added later always have a sane fallback.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<InvoiceData>;
        // One-time localStorage hydration on mount (localStorage is unavailable during SSR).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData((current) => ({ ...current, ...saved }));
      }
    } catch {
      // Ignore corrupt/unavailable localStorage — fall back to defaults.
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist every change to localStorage so the draft survives a reload.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {
      // Storage may be unavailable (private browsing, quota) — safe to skip.
    }
  }, [data, hydrated]);

  const { subtotal, tax, total } = calculateTotals(data);

  function updateField<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function updateItem(id: string, patch: Partial<InvoiceData["items"][number]>) {
    setData((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    }));
  }

  function addItem() {
    setData((current) => ({ ...current, items: [...current.items, newInvoiceItem()] }));
  }

  function removeItem(id: string) {
    setData((current) => ({
      ...current,
      items: current.items.filter((item) => item.id !== id),
    }));
  }

  async function handleDownloadPdf() {
    setDownloading(true);
    try {
      const [{ pdf }, { InvoicePdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/lib/invoice-pdf"),
      ]);
      const blob = await pdf(<InvoicePdfDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.invoiceNumber || "invoice"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          {t("pageHeading")}
        </h1>
        <p className="mt-2 text-muted">{t("pageIntro")}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* LEFT: editable form */}
        <div className="space-y-8">
          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {t("businessDetails")}
            </h2>
            <div className="mt-4 space-y-3">
              <Field label={t("name")}>
                <input
                  className="input"
                  value={data.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                />
              </Field>
              <Field label={t("address")}>
                <textarea
                  className="input"
                  rows={2}
                  value={data.businessAddress}
                  onChange={(e) => updateField("businessAddress", e.target.value)}
                />
              </Field>
              <Field label={t("email")}>
                <input
                  type="email"
                  className="input"
                  value={data.businessEmail}
                  onChange={(e) => updateField("businessEmail", e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {t("clientDetails")}
            </h2>
            <div className="mt-4 space-y-3">
              <Field label={t("name")}>
                <input
                  className="input"
                  value={data.clientName}
                  onChange={(e) => updateField("clientName", e.target.value)}
                />
              </Field>
              <Field label={t("address")}>
                <textarea
                  className="input"
                  rows={2}
                  value={data.clientAddress}
                  onChange={(e) => updateField("clientAddress", e.target.value)}
                />
              </Field>
              <Field label={t("email")}>
                <input
                  type="email"
                  className="input"
                  value={data.clientEmail}
                  onChange={(e) => updateField("clientEmail", e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label={t("invoiceNumber")}>
                <input
                  className="input"
                  value={data.invoiceNumber}
                  onChange={(e) => updateField("invoiceNumber", e.target.value)}
                />
              </Field>
              <Field label={t("currency")}>
                <select
                  className="input"
                  value={data.currency}
                  onChange={(e) => updateField("currency", e.target.value)}
                >
                  {CURRENCIES.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("issueDate")}>
                <input
                  type="date"
                  className="input"
                  value={data.issueDate}
                  onChange={(e) => updateField("issueDate", e.target.value)}
                />
              </Field>
              <Field label={t("dueDate")}>
                <input
                  type="date"
                  className="input"
                  value={data.dueDate}
                  onChange={(e) => updateField("dueDate", e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {t("items")}
            </h2>

            <div className="mt-4 space-y-3">
              {data.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 items-end gap-2 border-b border-border pb-3 last:border-b-0 last:pb-0"
                >
                  <div className="col-span-12 sm:col-span-5">
                    <Field label={t("description")}>
                      <input
                        className="input"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, { description: e.target.value })}
                      />
                    </Field>
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <Field label={t("quantity")}>
                      <input
                        type="number"
                        min={0}
                        className="input"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(item.id, { quantity: Number(e.target.value) || 0 })
                        }
                      />
                    </Field>
                  </div>
                  <div className="col-span-4 sm:col-span-3">
                    <Field label={t("unitPrice")}>
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        className="input"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(item.id, { unitPrice: Number(e.target.value) || 0 })
                        }
                      />
                    </Field>
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="h-10 w-full rounded-md border border-border text-sm font-medium text-muted transition-colors hover:border-red-300 hover:text-red-600"
                    >
                      {t("removeItem")}
                    </button>
                  </div>
                </div>
              ))}
              {data.items.length === 0 && (
                <p className="text-sm text-muted">—</p>
              )}
            </div>

            <button
              type="button"
              onClick={addItem}
              className="mt-4 rounded-md border border-dashed border-border px-4 py-2 text-sm font-medium text-accent transition-colors hover:border-accent"
            >
              + {t("addItem")}
            </button>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6">
            <Field label={t("taxRate")}>
              <input
                type="number"
                min={0}
                step="0.01"
                className="input max-w-[10rem]"
                value={data.taxRate}
                onChange={(e) => updateField("taxRate", Number(e.target.value) || 0)}
              />
            </Field>
            <p className="mt-2 text-xs text-muted">{t("taxDisclaimer")}</p>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6">
            <Field label={t("notes")}>
              <textarea
                className="input"
                rows={4}
                placeholder={t("notesPlaceholder")}
                value={data.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </Field>
          </section>
        </div>

        {/* RIGHT: live preview */}
        <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {t("livePreview")}
            </h2>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {downloading ? t("generatingPdf") : t("downloadPdf")}
            </button>
          </div>

          <div className="invoice-preview p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("from")}
                </p>
                <p className="mt-1 font-semibold">{data.businessName || "—"}</p>
                {data.businessAddress && (
                  <p className="whitespace-pre-line text-sm text-muted">
                    {data.businessAddress}
                  </p>
                )}
                {data.businessEmail && (
                  <p className="text-sm text-muted">{data.businessEmail}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold tracking-wide">INVOICE</p>
                <p className="mt-1 text-sm text-muted">
                  {t("invoiceNumber")}: {data.invoiceNumber || "—"}
                </p>
                <p className="text-sm text-muted">
                  {t("issueDate")}: {data.issueDate || "—"}
                </p>
                <p className="text-sm text-muted">
                  {t("dueDate")}: {data.dueDate || "—"}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {t("billTo")}
              </p>
              <p className="mt-1 font-semibold">{data.clientName || "—"}</p>
              {data.clientAddress && (
                <p className="whitespace-pre-line text-sm text-muted">
                  {data.clientAddress}
                </p>
              )}
              {data.clientEmail && <p className="text-sm text-muted">{data.clientEmail}</p>}
            </div>

            <table className="mt-6 w-full text-sm">
              <thead>
                <tr className="border-b border-ink/20 text-left text-xs uppercase tracking-wide text-muted">
                  <th className="py-2 font-semibold">{t("description")}</th>
                  <th className="py-2 text-right font-semibold">{t("quantity")}</th>
                  <th className="py-2 text-right font-semibold">{t("unitPrice")}</th>
                  <th className="py-2 text-right font-semibold">{t("amount")}</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item) => (
                  <tr key={item.id} className="border-b border-border">
                    <td className="py-2">{item.description || "—"}</td>
                    <td className="py-2 text-right">{item.quantity}</td>
                    <td className="py-2 text-right">
                      {formatCurrency(item.unitPrice, data.currency)}
                    </td>
                    <td className="py-2 text-right">
                      {formatCurrency(item.quantity * item.unitPrice, data.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-end">
              <div className="w-56 space-y-1 text-sm">
                <div className="flex justify-between text-muted">
                  <span>{t("subtotal")}</span>
                  <span>{formatCurrency(subtotal, data.currency)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>
                    {t("tax")} ({data.taxRate || 0}%)
                  </span>
                  <span>{formatCurrency(tax, data.currency)}</span>
                </div>
                <div className="flex justify-between border-t border-ink/20 pt-2 text-base font-bold">
                  <span>{t("total")}</span>
                  <span>{formatCurrency(total, data.currency)}</span>
                </div>
              </div>
            </div>

            {data.notes && (
              <div className="mt-8 border-t border-border pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("notes")}
                </p>
                <p className="mt-1 whitespace-pre-line text-sm text-muted">{data.notes}</p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="w-full rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {downloading ? t("generatingPdf") : t("downloadPdf")}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
