import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import type { NextAuthOptions } from "next-auth";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const FIREBASE_PRIVATE_KEY = JSON.parse(
  process.env.FIREBASE_PRIVATE_KEY!
).private_key;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY,
    }),
  }),
  pages: {
    signIn: "/auth/signin",
  },
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user.userName = user
        .name!.split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = user.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
