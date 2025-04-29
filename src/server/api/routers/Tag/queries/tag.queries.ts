import { publicProcedure } from "~/server/api/trpc";

const requiredTagRelations = {
  leads: {
    columns: {
      id: true,
      name: true,
    },
  },
} as const;

export const tagQueries = {
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.tags.findMany({
      with: requiredTagRelations,
    });
  }),
};
