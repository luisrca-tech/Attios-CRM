import { z } from "zod";

export const newInvoiceSchema = z.object({
  salesman: z.string().optional(),
  outsideSeller: z.boolean().default(false),
  outsideSellerFirstName: z.string().optional(),
  outsideSellerLastName: z.string().optional(),
  outsideSellerIdentification: z.string().optional(),
  outsideSellerEmail: z.string().email().optional(),
  outsideSellerPhone: z.string().optional(),
});

export type NewInvoice = z.infer<typeof newInvoiceSchema>;
