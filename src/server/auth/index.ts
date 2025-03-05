import { auth as clerkAuth } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users } from "../db/schema/auth";
import type { InferSelectModel } from "drizzle-orm";

export type UserRole = "free" | "basic" | "premium";

type UserWithRole = InferSelectModel<typeof users> & {
  role: UserRole;
};

export class AuthService {
  static async getCurrentUser(): Promise<UserWithRole> {
    const { userId } = await clerkAuth();

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to access this resource",
      });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    // For now, all users are free
    return { ...user, role: "free" as const };
  }

  static async requireRole(requiredRole: UserRole) {
    const user = await this.getCurrentUser();

    const roleHierarchy: Record<UserRole, number> = {
      free: 0,
      basic: 1,
      premium: 2,
    };

    if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: `This resource requires ${requiredRole} access`,
      });
    }

    return user;
  }

  static async isAuthenticated() {
    const { userId } = await clerkAuth();
    return !!userId;
  }
}
