import type { InferSelectModel } from "drizzle-orm";
import type { leads } from "~/server/db/schema";

export type Lead = InferSelectModel<typeof leads>;
