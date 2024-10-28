import { z } from "zod";
import { loginFormSchema } from "../schemas/signUpForm.schema";

export type LoginForm = z.infer<typeof loginFormSchema>;
