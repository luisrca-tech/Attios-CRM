import { protectedProcedure } from "~/server/api/trpc";
import { asc, sql, eq, and } from "drizzle-orm";
import { leads } from "~/server/db/schema/leads";
import { paginatedLeadsSchema } from "../schemas/paginatedLeads.schema";
import { totalPagesQuerySchema } from "../../schemas/totalPagesQuery.schema";
import { controlledLeadsSchema } from "../schemas/controlledLeads.schema";
import { z } from "zod";
import { tags } from "~/server/db/schema/tags";
import { createSearchCondition } from "~/server/api/routers/utils/searchCondition";
import { getLeadOrderBy } from "../utils/getLeadOrderBy";
import { getCurrentUser } from "~/server/api/routers/utils/getCurrentUser";

export const leadQueries = {
  getLeadsPaginated: protectedProcedure
    .input(paginatedLeadsSchema)
    .query(async ({ ctx, input }) => {
      const currentUser = await getCurrentUser(ctx);
      if (currentUser.workspaceId == null) {
        throw new Error("User has no workspace assigned");
      }
      const workspaceId: number = currentUser.workspaceId;

      const searchCondition = createSearchCondition(input.search, {
        firstName: leads.firstName,
        lastName: leads.lastName,
      });

      const workspaceCondition = eq(leads.workspaceId, workspaceId);
      const whereCondition = searchCondition
        ? and(searchCondition, workspaceCondition)
        : workspaceCondition;

      return ctx.db.query.leads.findMany({
        limit: input.pageSize,
        offset: (input.page - 1) * input.pageSize,
        with: {
          tag: true,
          team: true,
        },
        where: whereCondition,
        orderBy: input.sort
          ? [getLeadOrderBy(input.sort.column, input.sort.direction)]
          : [
              asc(
                sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`
              ),
            ],
      });
    }),

  getTotalPages: protectedProcedure
    .input(totalPagesQuerySchema)
    .query(async ({ ctx, input }) => {
      const currentUser = await getCurrentUser(ctx);
      if (currentUser.workspaceId == null) {
        throw new Error("User has no workspace assigned");
      }
      const workspaceId: number = currentUser.workspaceId;

      const searchCondition = createSearchCondition(input.search, {
        firstName: leads.firstName,
        lastName: leads.lastName,
      });

      const workspaceCondition = eq(leads.workspaceId, workspaceId);
      const whereCondition = searchCondition
        ? and(searchCondition, workspaceCondition)
        : workspaceCondition;

      const [result] = await ctx.db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(leads)
        .where(whereCondition);

      const totalCount = result?.count ?? 0;
      return Math.ceil(totalCount / input.pageSize);
    }),

  // This is the infinite scroll query for the mobile leads table
  getControlledLeadsInfinite: protectedProcedure
    .input(controlledLeadsSchema)
    .query(async ({ ctx, input }) => {
      const currentUser = await getCurrentUser(ctx);
      if (currentUser.workspaceId == null) {
        throw new Error("User has no workspace assigned");
      }
      const workspaceId: number = currentUser.workspaceId;
      const { limit, cursor, sort } = input;

      const searchCondition = createSearchCondition(input.search, {
        firstName: leads.firstName,
        lastName: leads.lastName,
      });

      const workspaceCondition = eq(leads.workspaceId, workspaceId);
      const whereCondition = searchCondition
        ? and(searchCondition, workspaceCondition)
        : workspaceCondition;

      const items = await ctx.db.query.leads.findMany({
        limit: limit + 1,
        offset: cursor,
        with: {
          tag: true,
          team: true,
        },
        where: whereCondition,
        orderBy: sort
          ? [getLeadOrderBy(sort.column, sort.direction)]
          : [
              asc(
                sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`
              ),
            ],
      });

      let nextCursor: number | undefined = undefined;
      if (items.length > limit) {
        items.pop();
        nextCursor = cursor + limit;
      }

      if (sort?.column === "name") {
        items.sort((a, b) => {
          const aName = `${a.firstName ?? ""} ${a.lastName ?? ""}`;
          const bName = `${b.firstName ?? ""} ${b.lastName ?? ""}`;
          return sort.direction === "asc"
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName);
        });
      }

      return {
        items,
        nextCursor,
      };
    }),

  // Get leads by tag
  getLeadsByTag: protectedProcedure
    .input(
      z.object({
        tag: z.enum(["Customer", "Prospect", "Partner", "Supplier"]),
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const currentUser = await getCurrentUser(ctx);
      if (currentUser.workspaceId == null) {
        throw new Error("User has no workspace assigned");
      }
      const workspaceId: number = currentUser.workspaceId;
      const { tag, page, pageSize } = input;

      const leadsByRole = await ctx.db.query.leads.findMany({
        with: {
          tag: true,
        },
        where: and(eq(tags.name, tag), eq(leads.workspaceId, workspaceId)),
        limit: pageSize,
        offset: (page - 1) * pageSize,
        orderBy: [
          asc(sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`),
        ],
      });

      const [countResult] = await ctx.db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(leads)
        .innerJoin(tags, eq(leads.tagId, tags.id))
        .where(and(eq(tags.name, tag), eq(leads.workspaceId, workspaceId)));

      const totalCount = countResult?.count ?? 0;
      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        leads: leadsByRole,
        pagination: {
          total: totalCount,
          totalPages,
          currentPage: page,
          pageSize,
        },
      };
    }),
};
