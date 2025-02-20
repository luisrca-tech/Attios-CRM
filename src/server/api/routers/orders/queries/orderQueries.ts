import { desc, sql } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { orders } from "~/server/db/schema/orders";
import { paginationSchema } from "../../schemas/pagination.schema";

const requiredOrderRelations = {
  customer: true,
  orderItems: {
    with: {
      product: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  },
} as const;

export const orderQueries = {
  getOrdersPaginated: publicProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query.orders.findMany({
        with: requiredOrderRelations,
        limit: input.pageSize,
        offset: (input.page - 1) * input.pageSize,
        orderBy: [desc(orders.createdAt)],
      });

      return result.map((order) => ({
        ...order,
        orderItems: order.orderItems.map((item) => ({
          ...item,
          productName: item.product.name,
        })),
      }));
    }),

  getTotalPages: publicProcedure
    .input(z.object({ pageSize: z.number().default(8) }))
    .query(async ({ ctx, input }) => {
      const [result] = await ctx.db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(orders);

      const totalCount = result?.count ?? 0;
      return Math.ceil(totalCount / input.pageSize);
    }),
};
