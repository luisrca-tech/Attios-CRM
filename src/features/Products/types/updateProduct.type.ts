import { z } from "zod";
import { updateProductSchema } from "../schemas/updateProduct.schema";

export type UpdateProduct = z.infer<typeof updateProductSchema>;