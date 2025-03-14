import { z } from "zod";
import { controlledQuerySchema } from "../../schemas/controlledQuery.schema";

export const controlledOrdersSchema = controlledQuerySchema.extend({
  timeFrame: z.enum(["day", "week", "month"]).optional(),
});
