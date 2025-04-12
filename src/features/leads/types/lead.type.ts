import type { InferSelectModel } from "drizzle-orm";
import type { leads } from "~/server/db/schema";
import type { roles } from "~/server/db/schema/roles";

export type Lead = InferSelectModel<typeof leads> & {
  role?: InferSelectModel<typeof roles>;
};
