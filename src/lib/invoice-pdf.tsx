"use client";

import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import type { InvoiceData, InvoiceTemplate } from "./invoice-types";
import { calculateTotals, formatCurrency } from "./invoice-types";

// react-pdf components must run client-side for pdf().toBlob() to work in
// the browser download flow used by invoice-generator-client.tsx.

// Each template is a genuinely different visual treatment, not just a color
// swap: different typeface, different header/total structure.
type TemplateConfig = {
  headingFont: string;
  bodyFont: string;
  accent: string;
  titleBadge: boolean; // "INVOICE" sits in a solid color block
  tableHeaderBg: string | null;
  tableHeaderRule: number; // 0 = no rule, rely on the bg/whitespace instead
  totalBadge: boolean; // grand total sits in a solid color block
  totalRule: number;
};

const TEMPLATES: Record<InvoiceTemplate, TemplateConfig> = {
  classic: {
    headingFont: "Times-Bold",
    bodyFont: "Times-Roman",
    accent: "#14171f",
    titleBadge: false,
    tableHeaderBg: null,
    tableHeaderRule: 1.5,
    totalBadge: false,
    totalRule: 1.5,
  },
  modern: {
    headingFont: "Helvetica-Bold",
    bodyFont: "Helvetica",
    accent: "#4f46e5",
    titleBadge: true,
    tableHeaderBg: "#eef2ff",
    tableHeaderRule: 0,
    totalBadge: true,
    totalRule: 0,
  },
  minimal: {
    headingFont: "Helvetica",
    bodyFont: "Helvetica",
    accent: "#14171f",
    titleBadge: false,
    tableHeaderBg: null,
    tableHeaderRule: 0,
    totalBadge: false,
    totalRule: 0.75,
  },
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    color: "#14171f",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  businessBlock: {
    maxWidth: 260,
  },
  logo: {
    width: 120,
    maxHeight: 48,
    objectFit: "contain",
    marginBottom: 8,
  },
  businessName: {
    fontSize: 14,
    marginBottom: 4,
  },
  muted: {
    color: "#5b6472",
    marginBottom: 2,
  },
  invoiceTitleBlock: {
    alignItems: "flex-end",
  },
  invoiceTitle: {
    fontSize: 20,
    marginBottom: 6,
    letterSpacing: 1,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginBottom: 2,
  },
  sectionLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#5b6472",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  billTo: {
    marginBottom: 24,
  },
  clientName: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  table: {
    marginBottom: 16,
  },
  tableHeaderRow: {
    flexDirection: "row",
    paddingHorizontal: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e7ec",
    paddingVertical: 6,
  },
  colDescription: { width: "46%" },
  colQty: { width: "14%", textAlign: "right" },
  colUnitPrice: { width: "20%", textAlign: "right" },
  colAmount: { width: "20%", textAlign: "right" },
  headerCell: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: "#5b6472",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  totalsBlock: {
    alignSelf: "flex-end",
    width: 220,
    marginTop: 8,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    paddingTop: 6,
  },
  grandTotalLabel: {
    fontFamily: "Helvetica-Bold",
  },
  grandTotalValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
  },
  notesBlock: {
    marginTop: 32,
  },
  notesText: {
    color: "#5b6472",
    lineHeight: 1.5,
  },
});

export function InvoicePdfDocument({ data }: { data: InvoiceData }) {
  const { subtotal, discount, tax, total } = calculateTotals(data);
  const cfg = TEMPLATES[data.template] ?? TEMPLATES.classic;

  return (
    <Document>
      <Page size="A4" style={[styles.page, { fontFamily: cfg.bodyFont }]}>
        <View style={styles.headerRow}>
          <View style={styles.businessBlock}>
            {!!data.businessLogo && (
              // eslint-disable-next-line jsx-a11y/alt-text -- react-pdf's Image has no alt prop
              <Image style={styles.logo} src={data.businessLogo} />
            )}
            <Text style={[styles.businessName, { fontFamily: cfg.headingFont, color: cfg.accent }]}>
              {data.businessName || "Your Business Name"}
            </Text>
            {!!data.businessAddress && (
              <Text style={styles.muted}>{data.businessAddress}</Text>
            )}
            {!!data.businessEmail && (
              <Text style={styles.muted}>{data.businessEmail}</Text>
            )}
          </View>
          <View style={styles.invoiceTitleBlock}>
            {cfg.titleBadge ? (
              <View
                style={{
                  backgroundColor: cfg.accent,
                  borderRadius: 3,
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  marginBottom: 6,
                }}
              >
                <Text style={[styles.invoiceTitle, { fontFamily: cfg.headingFont, color: "#ffffff", marginBottom: 0 }]}>
                  INVOICE
                </Text>
              </View>
            ) : (
              <Text style={[styles.invoiceTitle, { fontFamily: cfg.headingFont, color: cfg.accent }]}>
                INVOICE
              </Text>
            )}
            <View style={styles.metaRow}>
              <Text style={styles.muted}>Invoice #</Text>
              <Text>{data.invoiceNumber || "—"}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.muted}>Issue Date</Text>
              <Text>{data.issueDate || "—"}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.muted}>Due Date</Text>
              <Text>{data.dueDate || "—"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.billTo}>
          <Text style={styles.sectionLabel}>Bill To</Text>
          <Text style={[styles.clientName, { fontFamily: cfg.headingFont }]}>
            {data.clientName || "Client Name"}
          </Text>
          {!!data.clientAddress && (
            <Text style={styles.muted}>{data.clientAddress}</Text>
          )}
          {!!data.clientEmail && (
            <Text style={styles.muted}>{data.clientEmail}</Text>
          )}
        </View>

        <View style={styles.table}>
          <View
            style={[
              styles.tableHeaderRow,
              {
                backgroundColor: cfg.tableHeaderBg ?? undefined,
                borderBottomWidth: cfg.tableHeaderRule,
                borderBottomColor: cfg.accent,
                paddingVertical: cfg.tableHeaderBg ? 6 : 0,
                paddingHorizontal: cfg.tableHeaderBg ? 6 : 0,
                marginBottom: cfg.tableHeaderBg ? 4 : 6,
                paddingBottom: cfg.tableHeaderBg ? 6 : 6,
              },
            ]}
          >
            <Text style={[styles.colDescription, styles.headerCell]}>
              Description
            </Text>
            <Text style={[styles.colQty, styles.headerCell]}>Qty</Text>
            <Text style={[styles.colUnitPrice, styles.headerCell]}>
              Unit Price
            </Text>
            <Text style={[styles.colAmount, styles.headerCell]}>Amount</Text>
          </View>
          {data.items.map((item) => (
            <View style={[styles.tableRow, { paddingHorizontal: cfg.tableHeaderBg ? 6 : 0 }]} key={item.id} wrap={false}>
              <Text style={styles.colDescription}>
                {item.description || "—"}
              </Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colUnitPrice}>
                {formatCurrency(item.unitPrice, data.currency)}
              </Text>
              <Text style={styles.colAmount}>
                {formatCurrency(item.quantity * item.unitPrice, data.currency)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsBlock}>
          <View style={styles.totalsRow}>
            <Text style={styles.muted}>Subtotal</Text>
            <Text>{formatCurrency(subtotal, data.currency)}</Text>
          </View>
          {discount > 0 && (
            <View style={styles.totalsRow}>
              <Text style={styles.muted}>
                Discount
                {data.discountType === "percent" ? ` (${data.discountValue || 0}%)` : ""}
              </Text>
              <Text>-{formatCurrency(discount, data.currency)}</Text>
            </View>
          )}
          <View style={styles.totalsRow}>
            <Text style={styles.muted}>Tax ({data.taxRate || 0}%)</Text>
            <Text>{formatCurrency(tax, data.currency)}</Text>
          </View>
          {cfg.totalBadge ? (
            <View
              style={{
                backgroundColor: cfg.accent,
                borderRadius: 3,
                marginTop: 6,
                paddingVertical: 6,
                paddingHorizontal: 8,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: cfg.headingFont, color: "#ffffff" }}>Total</Text>
              <Text style={{ fontFamily: cfg.headingFont, color: "#ffffff", fontSize: 12 }}>
                {formatCurrency(total, data.currency)}
              </Text>
            </View>
          ) : (
            <View style={[styles.grandTotalRow, { borderTopWidth: cfg.totalRule, borderTopColor: cfg.accent }]}>
              <Text style={[styles.grandTotalLabel, { fontFamily: cfg.headingFont }]}>Total</Text>
              <Text style={[styles.grandTotalValue, { fontFamily: cfg.headingFont, color: cfg.accent }]}>
                {formatCurrency(total, data.currency)}
              </Text>
            </View>
          )}
        </View>

        {!!data.notes && (
          <View style={styles.notesBlock}>
            <Text style={styles.sectionLabel}>Notes</Text>
            <Text style={styles.notesText}>{data.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
