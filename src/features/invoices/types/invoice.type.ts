import type { InferSelectModel } from "drizzle-orm";
import type { invoices, customers } from "~/server/db/schema";

export type Invoice = InferSelectModel<typeof invoices> & {
  customer: InferSelectModel<typeof customers> | null;
};
