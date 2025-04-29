import type { z } from "zod";
import type { tagSchema } from "../schemas/tag.schema";

export type tagType = z.infer<typeof tagSchema>;
