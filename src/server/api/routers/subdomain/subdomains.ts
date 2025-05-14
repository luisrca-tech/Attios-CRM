import { createTRPCRouter } from "~/server/api/trpc";
import { subdomainMutations } from "./mutations/subdomain.mutation";
import { subdomainQueries } from "./queries/subdomain.queries";

export const subdomainRouter = createTRPCRouter({
  ...subdomainQueries,
  ...subdomainMutations,
});
