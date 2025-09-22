import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: "src/database/data/packages.db" },
  dialect: "sqlite",
  verbose: true,
  strict: true,
});

