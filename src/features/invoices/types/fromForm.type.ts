import { z } from "zod";
import { fromFormSchema } from "../schemas/fromForm.schema";

export type FromFormValues = z.infer<typeof fromFormSchema>;
