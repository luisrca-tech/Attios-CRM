import type { z } from "zod";
import type { confirmEmailSchema } from "../schemas/confirmEmail.schema";

export type ConfirmEmail = z.infer<typeof confirmEmailSchema>;