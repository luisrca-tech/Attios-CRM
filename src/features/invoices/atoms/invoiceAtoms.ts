import { atom } from "jotai";

export type InvoiceSection = "BillTo" | "From" | "Description";

export const selectedInvoiceSectionAtom = atom<InvoiceSection>("BillTo");
