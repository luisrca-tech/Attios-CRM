import { createTRPCRouter } from "../../trpc";
import { imagesMutations } from "./mutations/imagesMutations";

export const imagesRouter = createTRPCRouter({
  ...imagesMutations
})