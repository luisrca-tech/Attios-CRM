import { z } from "zod";

export const fromFormSchema = z.object({
  salesman: z.string().optional(),
  outsideSeller: z.boolean().default(false),
  outsideSellerFirstName: z.string().optional(),
  outsideSellerLastName: z.string().optional(),
  outsideSellerIdentification: z.string().optional(),
  outsideSellerEmail: z.union([z.string().email(), z.literal("")]).optional(),
  outsideSellerPhone: z.string().optional(),
  outsideSellerCountry: z.string().optional(),
  outsideSellerCity: z.string().optional(),
});
