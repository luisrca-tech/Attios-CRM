import { protectedProcedure } from "~/server/api/trpc";

export const subdomainQueries = {
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const subdomains = await ctx.db.query.subDomains.findMany();
    return subdomains;
  }),
};
