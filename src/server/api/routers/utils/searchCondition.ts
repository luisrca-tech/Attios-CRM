import {
	or,
	ilike,
	type Column,
	type ColumnBaseConfig,
	type ColumnDataType
} from 'drizzle-orm';
import type { SQL } from 'drizzle-orm';

/**
 * Creates a search condition for a table based on a search term and field mappings
 * @param searchTerm The search term to filter by
 * @param fieldMappings An object mapping field names to their corresponding database columns
 * @returns A condition that can be used in a where clause, or undefined if no search term
 */
export const createSearchCondition = <
	T extends Record<
		string,
		Column<ColumnBaseConfig<ColumnDataType, string>, object, object>
	>
>(
	searchTerm: string | undefined,
	fieldMappings: Record<string, T[keyof T]>
): SQL<unknown> | undefined => {
	const trimmedSearchTerm = searchTerm?.trim() || '';

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
