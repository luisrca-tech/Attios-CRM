import { z } from "zod";
import { paginationSchema } from "../../schemas/pagination.schema";

export const paginatedLeadsSchema = paginationSchema.extend({
  sort: z
    .object({
      column: z.enum(["name", "email", "phone", "status", "role"]),
      direction: z.enum(["asc", "desc"]).default("asc"),
    })
    .optional(),
});
