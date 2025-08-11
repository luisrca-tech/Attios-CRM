import { createTRPCRouter } from "../../trpc";
import { salesmanQueries } from "./queries/salesman.queries";
import { salesmanMutations } from "./mutations/salesman.mutations";

export const salesmanRouter = createTRPCRouter({
  ...salesmanQueries,
  ...salesmanMutations,
});
