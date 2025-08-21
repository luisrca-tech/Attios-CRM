import type { z } from "zod";
import type { billToSchema } from "../schemas/billToForm.schema";

export type BillToFormValues = z.infer<typeof billToSchema>;