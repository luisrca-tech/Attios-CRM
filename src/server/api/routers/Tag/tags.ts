import { createTRPCRouter } from "../../trpc";
import { tagMutations } from "./mutations/tags.mutations";
import { tagQueries } from "./queries/tag.queries";

export const tagRouter = createTRPCRouter({
  ...tagQueries,
  ...tagMutations,
});
