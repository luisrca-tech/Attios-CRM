import { z } from "zod";

export const userSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  fullName: z.string(),
});
