import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load the appropriate .env file
if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}

const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set in environment variables");
  }
  return url;
};

export default {
  schema: "./src/server/db/schema/*.ts",
  dialect: "postgresql",
  out: "./src/server/db/migrations",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
  tablesFilter: ["attios_*"],
  verbose: true,
  strict: true,
} satisfies Config;
