import { publicProcedure } from "~/server/api/trpc";

export const salesmanQueries = {
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.salesmen.findMany();
  }),
};
