import { z } from "zod";

export const signUpEmailVerifySchema = z.object({
  code: z.string().min(1, { message: "Code is required" }).max(8, { message: "Code must be 8 digits long" }),
});
