import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userName: string;
      uid: string;
    } & DefaultSession["user"];
  }
}
