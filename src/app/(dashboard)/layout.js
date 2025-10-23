

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LuLayoutDashboard, LuTicketPlus } from 'react-icons/lu';
import UserProfile from '../components/UserProfile'; 

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  // --- ROTA PROTEGIDA ---
  // Se não houver sessão (usuário não logado), redireciona para a página inicial
  if (!session) {
    redirect('/');
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Barra Lateral (Sidebar) */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-10">HelpFlow</h1>
          <nav className="space-y-4">
            <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-600 transition-colors">
              <LuLayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard/tickets/new" className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-600 transition-colors">
              <LuTicketPlus size={20} />
              <span>Novo Ticket</span>
            </Link>
          </nav>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <UserProfile />
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}