export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

export type InvoiceTemplate = "classic" | "modern" | "minimal";
export type DiscountType = "percent" | "fixed";

// Persists across invoices — "who you are". Survives "New Invoice".
export type BusinessProfile = {
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessLogo: string; // data URL, "" if none
  template: InvoiceTemplate;
  nextInvoiceNumber: string;
};

// Resets on "New Invoice" — "this specific bill".
export type InvoiceDraft = {
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  currency: string; // e.g. "USD"
  items: InvoiceItem[];
  taxRate: number; // percent, e.g. 8.5
  discountType: DiscountType;
  discountValue: number; // percent points, or a fixed amount in `currency`
  notes: string;
};

export type InvoiceData = BusinessProfile & InvoiceDraft;

export function calculateTotals(data: InvoiceData) {
  const subtotal = data.items.reduce(
    (sum, i) => sum + i.quantity * i.unitPrice,
    0,
  );
  const rawDiscount =
    data.discountType === "percent"
      ? subtotal * (data.discountValue / 100)
      : data.discountValue;
  const discount = Math.min(Math.max(rawDiscount, 0), subtotal);
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * (data.taxRate / 100);
  return { subtotal, discount, tax, total: taxableAmount + tax };
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

// Bumps the trailing numeric run in an invoice number, preserving any
// prefix/suffix and zero-padding width (e.g. "INV-0001" -> "INV-0002").
// Falls back to appending "-2" when there's no trailing number to bump.
export function incrementInvoiceNumber(current: string): string {
  const match = current.match(/^(.*?)(\d+)(\D*)$/);
  if (!match) {
    return current ? `${current}-2` : "INV-0002";
  }
  const [, prefix, digits, suffix] = match;
  const next = String(Number(digits) + 1).padStart(digits.length, "0");
  return `${prefix}${next}${suffix}`;
}

export function defaultBusinessProfile(): BusinessProfile {
  return {
    businessName: "",
    businessAddress: "",
    businessEmail: "",
    businessLogo: "",
    template: "classic",
    nextInvoiceNumber: "INV-0002",
  };
}

export function defaultDraft(): InvoiceDraft {
  const today = new Date();
  const due = new Date(today);
  due.setDate(due.getDate() + 30);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  return {
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    invoiceNumber: "INV-0001",
    issueDate: iso(today),
    dueDate: iso(due),
    currency: "USD",
    items: [{ id: makeId(), description: "", quantity: 1, unitPrice: 0 }],
    taxRate: 0,
    discountType: "percent",
    discountValue: 0,
    notes: "",
  };
}

export function defaultInvoice(): InvoiceData {
  return { ...defaultBusinessProfile(), ...defaultDraft() };
}

export function newInvoiceItem(): InvoiceItem {
  return { id: makeId(), description: "", quantity: 1, unitPrice: 0 };
}

export const BUSINESS_PROFILE_KEYS: (keyof BusinessProfile)[] = [
  "businessName",
  "businessAddress",
  "businessEmail",
  "businessLogo",
  "template",
  "nextInvoiceNumber",
];

export const DRAFT_KEYS: (keyof InvoiceDraft)[] = [
  "clientName",
  "clientAddress",
  "clientEmail",
  "invoiceNumber",
  "issueDate",
  "dueDate",
  "currency",
  "items",
  "taxRate",
  "discountType",
  "discountValue",
  "notes",
];

export function splitBusinessProfile(data: InvoiceData): BusinessProfile {
  const profile = {} as BusinessProfile;
  for (const key of BUSINESS_PROFILE_KEYS) {
    (profile as Record<string, unknown>)[key] = data[key];
  }
  return profile;
}

export function splitDraft(data: InvoiceData): InvoiceDraft {
  const draft = {} as InvoiceDraft;
  for (const key of DRAFT_KEYS) {
    (draft as Record<string, unknown>)[key] = data[key];
  }
  return draft;
}
