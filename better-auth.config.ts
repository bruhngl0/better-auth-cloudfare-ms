/**
 * Better Auth CLI configuration file
 *
 * Docs: https://www.better-auth.com/docs/concepts/cli
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { betterAuthOptions } from "./src/lib/better-auth/options";
import * as schema from "./src/db/schema";

const { DATABASE_URL, BETTER_AUTH_URL, BETTER_AUTH_SECRET } = process.env;

const sql = neon(DATABASE_URL!);
const db = drizzle(sql, { schema });

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  ...betterAuthOptions,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});
