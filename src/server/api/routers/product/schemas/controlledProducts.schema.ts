import { z } from "zod";
import { controlledQuerySchema } from "../../schemas/controlledQuery.schema";

export const controlledProductsSchema = controlledQuerySchema.extend({
  sort: z
    .object({
      column: z.enum(["name", "quantity", "listPrice", "modelYear"]),
      direction: z.enum(["asc", "desc"]).default("asc"),
    })
    .optional(),
});
