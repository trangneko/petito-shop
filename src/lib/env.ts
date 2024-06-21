import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1),
  ADMIN_USERNAME: zod.string().min(1),
  HASHED_ADMIN_PASSWORD: zod.string().min(1),
  AUTH_GOOGLE_CLIENT_ID: zod.string().min(1),
  AUTH_GOOGLE_CLIENT_SECRET: zod.string().min(1),
  NEXTAUTH_URL: zod.string().min(1),
  NEXTAUTH_SECRET: zod.string().min(1),
  NEXT_PUBLIC_PAYOS_CLIENT_ID: zod.string(),
  NEXT_PUBLIC_PAYOS_API_KEY: zod.string(),
  NEXT_PUBLIC_PAYOS_CHECKSUM_KEY: zod.string(),
});

export const env = envSchema.parse(process.env);
