import { publicProcedure } from "~/server/api/trpc";
import { salesmen } from "~/server/db/schema";
import { salesmanSchema } from "../schemas/salesman.schema";

export const salesmanMutations = {
  create: publicProcedure.input(salesmanSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(salesmen).values(input);
  }),
};
