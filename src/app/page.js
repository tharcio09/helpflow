"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async (provider) => {
    try {
      setIsLoading(true);
      setError(null);
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Image
              src="/favicon.ico"
              alt="HelpFlow Logo"
              width={64}
              height={64}
              className="mx-auto mb-4"
            />
            <h1 className="text-4xl font-bold text-white mb-2">HelpFlow</h1>
            <p className="text-gray-400">Sistema de suporte simplificado</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-300 text-center">
              Gerencie tickets de suporte com eficiência. Faça login para
              acessar o dashboard.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-6">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => handleSignIn("github")}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {isLoading ? "Carregando..." : "Continuar com GitHub"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
