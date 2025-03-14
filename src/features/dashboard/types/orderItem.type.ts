import type { InferSelectModel } from "drizzle-orm";
import type { orderItems, products } from "~/server/db/schema";

export type OrderItem = InferSelectModel<typeof orderItems> & {
  product: Pick<InferSelectModel<typeof products>, "id" | "name">;
};
