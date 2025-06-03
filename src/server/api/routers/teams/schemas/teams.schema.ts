import { z } from "zod";

export const createTeamSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  workspace: z
    .string()
    .min(1, { message: "Workspace is required" })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Subdomain must contain only lowercase letters, numbers, and hyphens",
    }),
});
