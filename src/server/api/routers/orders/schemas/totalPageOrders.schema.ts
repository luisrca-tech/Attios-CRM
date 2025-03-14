import { z } from "zod";
import { totalPagesQuerySchema } from "../../schemas/totalPagesQuery.schema";

export const totalPageOrdersSchema = totalPagesQuerySchema.extend({
  timeFrame: z.enum(["day", "week", "month"]).optional(),
});
