import { eq } from "drizzle-orm";
import { z } from "zod";
import { users, workspaces } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { userSchema } from "./schemas/user.schema";

export const userRouter = createTRPCRouter({
  create: publicProcedure.input(userSchema).mutation(async ({ ctx, input }) => {
    const [workspace] = await ctx.db
      .insert(workspaces)
      .values({
        workspace: input.workspaceId ?? "",
      })
      .returning();

    await ctx.db.insert(users).values({
      id: input.id,
      email: input.email,
      fullName: input.fullName,
      workspaceId: workspace?.id,
    });

    return { success: true };
  }),

  getUserById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input),
        with: {
          workspaces: true,
          teams: true,
        },
      });
      return user;
    }),
});
