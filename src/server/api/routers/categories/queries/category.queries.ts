import { publicProcedure } from "~/server/api/trpc";
import { requiredCategoryRelations } from "../constants/requiredCategoryRelations";

export const categoryQueries = {
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.categories.findMany({
      with: requiredCategoryRelations,
    });
  }),
};
