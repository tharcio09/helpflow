

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
    // Este callback é chamado sempre que uma sessão é verificada.
    // Suporta tanto o fluxo com adapter (user) quanto JWT (token).
    async session({ session, user, token }) {
      if (!session?.user) return session;
      // Preferir o `user` (quando houver adapter). Caso contrário ler do token (JWT).
      session.user.id = user?.id ?? token?.id ?? token?.sub ?? null;
      session.user.role = user?.role ?? token?.role ?? null;
      return session;
    },

    // Quando usamos `session.strategy = 'jwt'`, persistimos id/role no token
    // para que o `session` callback consiga retorná-los sem consultar o DB.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  // Permite usar AUTH_SECRET no .env (legacy) ou NEXTAUTH_SECRET
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  // Usar JWT para sessão evita chamadas ao banco para a tabela `Session`
  // (útil como workaround quando o adapter falha por questões de pooler)
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };