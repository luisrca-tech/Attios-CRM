import { z } from "zod";
import { loginFormSchema } from "../schemas/loginForm.schema";

export type LoginForm = z.infer<typeof loginFormSchema>;
