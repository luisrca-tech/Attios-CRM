import { sql } from "drizzle-orm";

import { tags } from "~/server/db/schema/tags";

import { desc } from "drizzle-orm";

import { asc } from "drizzle-orm";
import { leads } from "~/server/db/schema";

export const getLeadOrderBy = (column: string, direction: "asc" | "desc") => {
  const sortMap = {
    name:
      direction === "asc"
        ? asc(sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`)
        : desc(sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`),
    tag: direction === "asc" ? asc(tags.name) : desc(tags.name),
    email: direction === "asc" ? asc(leads.email) : desc(leads.email),
    phone: direction === "asc" ? asc(leads.phone) : desc(leads.phone),
    status: direction === "asc" ? asc(leads.status) : desc(leads.status),
    firstName:
      direction === "asc" ? asc(leads.firstName) : desc(leads.firstName),
  };

  return sortMap[column as keyof typeof sortMap] ?? sortMap.firstName;
};
