import { z } from "zod";
import { defaultProductSchema } from "./defaultProduct.schema";

export const newProductSchema = z.object({
  ...defaultProductSchema.shape,
  productId: z.string().optional(),
  brand: z.string().nonempty({ message: "Brand is required" }),
  file: z.instanceof(File).optional(),
  productImages: z
    .array(
      z.object({
        url: z.string(),
        key: z.string(),
      })
    )
    .optional(),
});
