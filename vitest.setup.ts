import { loadEnvConfig } from "@next/env";
import { config } from "dotenv";
import { resolve } from "node:path";
import { beforeAll } from "vitest";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

console.log(process.env.DATABASE_URL);

beforeAll(() => {
  // Load test environment variables
  config({
    path: resolve(__dirname, ".env.test"),
  });
});
