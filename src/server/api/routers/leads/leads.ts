import { createTRPCRouter } from "../../trpc";
import { leadQueries } from "./queries/lead.queries";
import { leadMutations } from "./mutations/lead.mutations";

export const leadRouter = createTRPCRouter({
  ...leadQueries,
  ...leadMutations,
});
