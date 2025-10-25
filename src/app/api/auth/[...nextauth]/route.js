import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (!session?.user) return session;
      session.user.id = user?.id ?? token?.id ?? token?.sub ?? null;
      session.user.role = user?.role ?? token?.role ?? null;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  session: {
  strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };