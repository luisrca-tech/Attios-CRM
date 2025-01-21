import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import * as schema from "~/server/db/schema";

type Database = PostgresJsDatabase<typeof schema>;

const mockDb = mockDeep<Database>();

beforeEach(() => {
    mockReset(mockDb)
})

export default mockDb
