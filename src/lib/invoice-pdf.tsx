"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { InvoiceData } from "./invoice-types";
import { calculateTotals, formatCurrency } from "./invoice-types";

// react-pdf components must run client-side for pdf().toBlob() to work in
// the browser download flow used by invoice-generator-client.tsx.

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
  tableHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#14171f",
    paddingBottom: 6,
    marginBottom: 6,
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
    borderTopWidth: 1,
    borderTopColor: "#14171f",
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
  const { subtotal, tax, total } = calculateTotals(data);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.businessBlock}>
            <Text style={styles.businessName}>
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
            <Text style={styles.invoiceTitle}>INVOICE</Text>
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
          <View style={styles.tableHeaderRow}>
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
          <View style={styles.totalsRow}>
            <Text style={styles.muted}>Tax ({data.taxRate || 0}%)</Text>
            <Text>{formatCurrency(tax, data.currency)}</Text>
          </View>
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>
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
