import { z } from "zod";
import { signUpEmailVerifySchema } from "../schemas/signUpEmailVerify.schema";

export type SignUpEmailVerify = z.infer<typeof signUpEmailVerifySchema>;
