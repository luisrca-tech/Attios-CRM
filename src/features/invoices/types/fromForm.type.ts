import type { z } from "zod";
import type { fromFormSchema } from "../schemas/fromForm.schema";

export type FromFormValues = z.infer<typeof fromFormSchema>;
