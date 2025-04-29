import { z } from "zod";
import { controlledQuerySchema } from "../../schemas/controlledQuery.schema";

export const controlledLeadsSchema = controlledQuerySchema.extend({
  sort: z
    .object({
      column: z.enum(["name", "email", "phone", "status", "role", "tag"]),
      direction: z.enum(["asc", "desc"]).default("asc"),
    })
    .optional(),
});
