import { protectedProcedure } from "~/server/api/trpc";
import { eq } from "drizzle-orm";
import { subDomains } from "~/server/db/schema";
import { getCurrentUser } from "~/server/api/routers/utils/getCurrentUser";

export const subdomainQueries = {
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const subdomains = await ctx.db.query.subDomains.findMany();
    return subdomains;
  }),
  getByCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await getCurrentUser(ctx);
    if (!user?.subDomainId) return null;
    const subdomain = await ctx.db.query.subDomains.findFirst({
      where: eq(subDomains.id, user.subDomainId),
    });
    return subdomain;
  }),
};
