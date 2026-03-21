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
  const errors = parsed.error.format();
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(errors, null, 2)
  );
  
  if (process.env.NODE_ENV === "production") {
    const missingFields = Object.keys(errors).filter(k => k !== "_errors").join(", ");
    throw new Error(`Invalid environment variables: ${missingFields}. Check Vercel project settings.`);
  }
}

export const env = parsed.data;
