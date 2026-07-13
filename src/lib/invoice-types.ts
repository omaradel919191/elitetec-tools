export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

export type InvoiceData = {
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  currency: string; // e.g. "USD"
  items: InvoiceItem[];
  taxRate: number; // percent, e.g. 8.5
  notes: string;
};

export function calculateTotals(data: InvoiceData) {
  const subtotal = data.items.reduce(
    (sum, i) => sum + i.quantity * i.unitPrice,
    0,
  );
  const tax = subtotal * (data.taxRate / 100);
  return { subtotal, tax, total: subtotal + tax };
}

export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(amount);
}

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // SSR / older-runtime fallback — never actually hit in practice since this
  // is only called from a "use client" component's useState initializer.
  return `item-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

export function defaultInvoice(): InvoiceData {
  const today = new Date();
  const due = new Date(today);
  due.setDate(due.getDate() + 30);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  return {
    businessName: "",
    businessAddress: "",
    businessEmail: "",
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    invoiceNumber: "INV-0001",
    issueDate: iso(today),
    dueDate: iso(due),
    currency: "USD",
    items: [{ id: makeId(), description: "", quantity: 1, unitPrice: 0 }],
    taxRate: 0,
    notes: "",
  };
}

export function newInvoiceItem(): InvoiceItem {
  return { id: makeId(), description: "", quantity: 1, unitPrice: 0 };
}
