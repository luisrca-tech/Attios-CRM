import { publicProcedure } from "~/server/api/trpc";
import { asc, desc, sql, eq } from "drizzle-orm";
import { leads } from "~/server/db/schema/leads";
import { paginatedLeadsSchema } from "../schemas/paginatedLeads.schema";
import { totalPagesQuerySchema } from "../../schemas/totalPagesQuery.schema";
import { controlledLeadsSchema } from "../schemas/controlledLeads.schema";
import { z } from "zod";
import { tags } from "~/server/db/schema/tags";

export const leadQueries = {
  getLeadsPaginated: publicProcedure
    .input(paginatedLeadsSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.query.leads.findMany({
        limit: input.pageSize,
        offset: (input.page - 1) * input.pageSize,
        with: {
          tag: true,
        },
        orderBy: input.sort
          ? [
              input.sort.column === "name"
                ? input.sort.direction === "asc"
                  ? asc(
                      sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`
                    )
                  : desc(
                      sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`
                    )
                : input.sort.column === "tag"
                  ? input.sort.direction === "asc"
                    ? asc(tags.name)
                    : desc(tags.name)
                  : input.sort.column === "email"
                    ? input.sort.direction === "asc"
                      ? asc(leads.email)
                      : desc(leads.email)
                    : input.sort.column === "phone"
                      ? input.sort.direction === "asc"
                        ? asc(leads.phone)
                        : desc(leads.phone)
                      : input.sort.column === "status"
                        ? input.sort.direction === "asc"
                          ? asc(leads.status)
                          : desc(leads.status)
                        : input.sort.direction === "asc"
                          ? asc(leads.firstName)
                          : desc(leads.firstName),
            ]
          : [
              asc(
                sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`
              ),
            ],
      });
    }),

  getTotalPages: publicProcedure
    .input(totalPagesQuerySchema)
    .query(async ({ ctx, input }) => {
      const [result] = await ctx.db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(leads);

      const totalCount = result?.count ?? 0;
      return Math.ceil(totalCount / input.pageSize);
    }),

  // This is the infinite scroll query for the mobile leads table
  getControlledLeadsInfinite: publicProcedure
    .input(controlledLeadsSchema)
    .query(async ({ ctx, input }) => {
      const { limit, cursor, sort } = input;

      const items = await ctx.db.query.leads.findMany({
        limit: limit + 1,
        offset: cursor,
        with: {
          tag: true,
        },
        orderBy: sort
          ? [
              sort.column === "name"
                ? sort.direction === "asc"
                  ? asc(
                      sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`
                    )
                  : desc(
                      sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`
                    )
                : sort.column === "tag"
                  ? sort.direction === "asc"
                    ? asc(tags.name)
                    : desc(tags.name)
                  : sort.column === "email"
                    ? sort.direction === "asc"
                      ? asc(leads.email)
                      : desc(leads.email)
                    : sort.column === "phone"
                      ? sort.direction === "asc"
                        ? asc(leads.phone)
                        : desc(leads.phone)
                      : sort.column === "status"
                        ? sort.direction === "asc"
                          ? asc(leads.status)
                          : desc(leads.status)
                        : sort.direction === "asc"
                          ? asc(leads.firstName)
                          : desc(leads.firstName),
            ]
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

      // If sorting by name, we need to sort the results in memory
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
  getLeadsByTag: publicProcedure
    .input(
      z.object({
        tag: z.enum(["Customer", "Prospect", "Partner", "Supplier"]),
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { tag, page, pageSize } = input;

      const leadsByRole = await ctx.db.query.leads.findMany({
        with: {
          tag: true,
        },
        where: eq(tags.name, tag),
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
        .where(eq(tags.name, tag));

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
