import { z } from "zod";
const optionalUrl = z.string().url().optional().or(z.literal(""));
export const serverEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: optionalUrl,
  RESEND_API_KEY: z.string().optional(),
  CONTACT_NOTIFICATION_EMAIL: z.string().email().optional(),
  EMAIL_FROM: z.string().optional(),
  IP_HASH_SECRET: z.string().min(16).optional(),
  UPSTASH_REDIS_REST_URL: optionalUrl,
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
});
export const env = serverEnvSchema.parse(process.env);
