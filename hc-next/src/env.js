import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  // Server-side environment variables schema
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    AUTH_SENDGRID_KEY: z.string(),
    AUTH_EMAIL_ADDRESS: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    BACKEND_PORT:z.string()
  },

  /**
   * Client-side environment variables schema.
   * To expose them to the client, prefix them with `NEXT_PUBLIC_`
   */
  client: {
    // NEXT_PUBLIC_CLIENT_VAR: z.string(),
  },

  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_SENDGRID_KEY: process.env.AUTH_SENDGRID_KEY,
    AUTH_EMAIL_ADDRESS: process.env.AUTH_EMAIL_ADDRESS,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    BACKEND_PORT:process.env.BACKEND_PORT,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
