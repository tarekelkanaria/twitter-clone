import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { db } from "@/firebase/config";
import type { NextAuthOptions } from "next-auth";
import type { FirebaseAdapterConfig } from "@next-auth/firebase-adapter";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID!;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET!;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
    }),
  ],
  adapter: FirestoreAdapter(db as FirebaseAdapterConfig),
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
