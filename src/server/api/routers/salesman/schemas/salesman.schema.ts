import { z } from "zod";

export const salesmanSchema = z.object({
  name: z.string().min(1),
});

export type SalesmanInput = z.infer<typeof salesmanSchema>;
