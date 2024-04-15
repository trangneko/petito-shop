import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { mergeAnonCartIntoUserCart } from "./db/cart";
import db from "./db/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (user && session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async signIn({user}) {
      if (user.id) {
        await mergeAnonCartIntoUserCart(user.id);
      } else {
        console.error("User ID is undefined.");
      }
    }
  }
});
