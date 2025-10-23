// src/app/page.js

import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AuthButtons from './components/AuthButtons';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // Se o usuário já estiver logado, redireciona direto para o dashboard
  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-5xl font-bold mb-4">Bem-vindo ao HelpFlow</h1>
      <p className="text-xl text-gray-400 mb-8">Seu sistema de suporte simplificado.</p>
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Faça login para continuar</h2>
        <AuthButtons />
      </div>
    </main>
  );
}