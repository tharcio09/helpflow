'use client';

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {session.user.image && (
            <img
              src={session.user.image}
              alt="Avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
          )}
          <span className="text-sm text-gray-800">
            Olá, <span className="font-semibold">{session.user.name || session.user.email}</span>
          </span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="rounded-md bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-700">Você não está autenticado.</span>
      <button
        onClick={() => signIn("github")}
        className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Entrar com GitHub
      </button>
      <Link
        href="/login"
        className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
      >
        Entrar com email
      </Link>
    </div>
  );
}
