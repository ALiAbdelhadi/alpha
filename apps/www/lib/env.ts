import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_CLARITY_ID: z.string().optional(),
  SENDGRID_API_KEY: isProd ? z.string().min(1) : z.string().min(1).optional().default("dev_key"),
  SLACK_WEBHOOK_URL: z.string().url().optional(),
  ZAPIER_WEBHOOK_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_URL: isProd ? z.string().url() : z.string().url().optional().default("http://localhost:8080"),
  UPSTASH_REDIS_REST_TOKEN: isProd ? z.string().min(1) : z.string().min(1).optional().default("dev_token"),
  DATABASE_URL: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsed.error.format(), null, 2)
  );
  if (process.env.NODE_ENV === "production") {
    throw new Error("Invalid environment variables. Check server logs.");
  }
}

export const env = parsed.data;
