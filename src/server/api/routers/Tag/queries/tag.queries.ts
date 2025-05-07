import { publicProcedure } from "~/server/api/trpc";
import { requiredTagRelations } from "../constants/requiredTagRelations";

export const tagQueries = {
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.tags.findMany({
      with: requiredTagRelations,
    });
  }),
};
