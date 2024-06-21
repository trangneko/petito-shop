import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Provider } from "next-auth/providers";

import authConfig from "@/auth.config";
import db from "./db/db";
import { mergeAnonCartIntoUserCart } from "./db/cart";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      try {
        if (token.sub) {
          const userData = await db.user.findUnique({
            where: { id: token.sub },
          });

          if (userData) {
            session.user = {
              ...(session.user || {}),
              ...userData,
              isGuest: !(userData.name && userData.email && userData.phone && userData.address),
            } as any; // Use any to prevent type conflicts, but handle it with care
          }
        }
        return session;
      } catch (error) {
        console.error("Error in session callback", error);
        return session;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  events: {
    async signIn({ user }) {
      if (user?.id) {
        await mergeAnonCartIntoUserCart(user.id);
      } else {
        console.error("User ID is undefined or sign-in process failed.");
      }
    },
  },
  // pages: {
  //   signIn: '/auth/login',
  // },
  ...authConfig,
});

export const providerMap = (authConfig.providers as Provider[]).map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});