import { z } from "zod";

export const billToSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  companyName: z.string().optional(),
  date: z.string().optional(),
  address: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email().optional(),
  taxRate: z
    .union([z.string().regex(/^\d*(\.\d+)?$/, "Invalid number"), z.number()])
    .transform((v) => (typeof v === "string" ? Number(v) : v))
    .refine((v) => !Number.isNaN(v), "Invalid number")
    .optional(),
  images: z.array(z.string()).optional(),
});