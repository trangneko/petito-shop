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
    // session({ session, user }) {
    //   if (user && session?.user) {
    //     session.user.id = user.id;
    //   }
    //   return session;
    // },

    async session({ session, token }) {
      if (token && token.sub) {
        const user = await db.user.findUnique({
          where: { id: token.sub },
        });

        if (user) {
          // Ensure the user object conforms to the expected session user structure
          session.user = {
            ...session.user, // Spread existing session user properties
            ...user, // Spread full user details from the database
            id: user.id, // Ensure the ID is set correctly
            name: user.name || session.user.name, // Default to existing session name if DB name is not set
            email: user.email || session.user.email,
            image: user.image || session.user.image,
            phone: user.phone || session.user.phone,
            city: user.city || session.user.city,
            address: user.address || session.user.address,
          };
        }
      }

      return session;
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
});
