import { or, ilike } from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import type { Column } from "drizzle-orm";

/**
 * Creates a search condition for a table based on a search term and field mappings
 * @param searchTerm The search term to filter by
 * @param fieldMappings An object mapping field names to their corresponding database columns
 * @returns A condition that can be used in a where clause, or undefined if no search term
 */
export const createSearchCondition = (
  searchTerm: string | undefined,
  fieldMappings: Record<string, Column>
): SQL<unknown> | undefined => {
  const trimmedSearchTerm = searchTerm?.trim() || "";

  if (!trimmedSearchTerm) {
    return undefined;
  }

  // Create an array of ilike conditions for each field
  const conditions = Object.entries(fieldMappings).map(([_, column]) =>
    ilike(column, `%${trimmedSearchTerm}%`)
  );

  // Return an OR condition combining all field conditions
  return or(...conditions);
};
