"use client";

import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import type { InvoiceData, InvoiceTemplate } from "./invoice-types";
import { calculateTotals, formatCurrency } from "./invoice-types";

// react-pdf components must run client-side for pdf().toBlob() to work in
// the browser download flow used by invoice-generator-client.tsx.

const TEMPLATE_ACCENT: Record<InvoiceTemplate, string> = {
  classic: "#14171f",
  modern: "#4f46e5",
  minimal: "#14171f",
};

const TEMPLATE_RULE_WIDTH: Record<InvoiceTemplate, number> = {
  classic: 1,
  modern: 2,
  minimal: 0.5,
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
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
    fontFamily: "Helvetica-Bold",
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
    fontFamily: "Helvetica-Bold",
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
  const accent = TEMPLATE_ACCENT[data.template] ?? TEMPLATE_ACCENT.classic;
  const ruleWidth = TEMPLATE_RULE_WIDTH[data.template] ?? 1;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.businessBlock}>
            {!!data.businessLogo && (
              // eslint-disable-next-line jsx-a11y/alt-text -- react-pdf's Image has no alt prop
              <Image style={styles.logo} src={data.businessLogo} />
            )}
            <Text style={[styles.businessName, { color: accent }]}>
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
            <Text style={[styles.invoiceTitle, { color: accent }]}>INVOICE</Text>
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
          <Text style={styles.clientName}>
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
              styles.tableRow,
              { borderBottomWidth: ruleWidth, borderBottomColor: accent, paddingVertical: 0, marginBottom: 6, paddingBottom: 6 },
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
            <View style={styles.tableRow} key={item.id} wrap={false}>
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
          <View style={[styles.grandTotalRow, { borderTopWidth: ruleWidth, borderTopColor: accent }]}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={[styles.grandTotalValue, { color: accent }]}>
              {formatCurrency(total, data.currency)}
            </Text>
          </View>
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
