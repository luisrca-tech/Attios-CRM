import type { InferSelectModel } from "drizzle-orm";
import type { leads } from "~/server/db/schema";
import type { tags } from "~/server/db/schema/tags";

export type Lead = InferSelectModel<typeof leads> & {
  tag: InferSelectModel<typeof tags> | null;
};
