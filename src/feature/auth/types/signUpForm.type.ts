import { z } from "zod";
import { signUpFormSchema } from "../schemas/signUpForm.schema";

export type SignUpForm = z.infer<typeof signUpFormSchema>;
