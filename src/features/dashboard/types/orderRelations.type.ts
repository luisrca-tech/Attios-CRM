import type { InferSelectModel } from "drizzle-orm";
import type {
  customers,
  orderItems,
  orders,
  products,
} from "~/server/db/schema";

export type OrderRelations = typeof orders.$inferSelect & {
  customer: InferSelectModel<typeof customers>;
  orderItems: (InferSelectModel<typeof orderItems> & {
    product: Pick<InferSelectModel<typeof products>, "id" | "name">;
    productImage: string | null;
  })[];
};
