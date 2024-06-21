import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { LoginSchema } from "./app/auth/schema";
import db from "./db/db";
import { env } from "./lib/env";

export default {
  providers: [
    credentials({
      name: 'password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mật khẩu', type: 'password' },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.user.findUnique({ where: { email } });

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
    google({
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
      // authorization: {
      //   url: "https://accounts.google.com/o/oauth2/auth",
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //     redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
      //   },
      // },
      // Handle the creation or connection of the user
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified ? new Date() : null,
        };
      },
      // profile: async (profile) => {
      //   const user = await db.user.findUnique({
      //     where: { email: profile.email },
      //   });

      //   if (user) {
      //     return user;
      //   } else {
      //     return db.user.create({
      //       data: {
      //         email: profile.email,
      //         name: profile.name,
      //         image: profile.picture,
      //         emailVerified: profile.email_verified ? new Date() : null,
      //         createdAt: new Date(),
      //         updatedAt: new Date(),
      //         isGuest: false,
      //       },
      //     });
      //   }
      // },
    }),
  ],
} satisfies NextAuthConfig;

