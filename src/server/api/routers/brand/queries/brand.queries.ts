import { publicProcedure } from "~/server/api/trpc";
import { requiredBrandRelations } from "../constants/requiredBrandRelations";

export const brandQueries = {
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.brands.findMany({
      with: requiredBrandRelations,
    });
  }),
};
