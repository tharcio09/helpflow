
'use client'; 

import Link from 'next/link';
import { LuLayoutDashboard, LuTicketPlus } from 'react-icons/lu';

import { usePathname } from 'next/navigation'; 

export default function SidebarNav() {
  const pathname = usePathname(); // Pega a rota atual

  return (
    <nav className="space-y-4">
      <Link 
        href="/dashboard" 
        className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
          // Destaca se a rota atual for /dashboard
          pathname === '/dashboard' ? 'bg-indigo-600' : 'hover:bg-indigo-600' 
        }`}
      >
        <LuLayoutDashboard size={20} />
        <span>Dashboard</span>
      </Link>
      <Link 
        href="/dashboard/tickets/new" 
        className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
           // Destaca se a rota atual for /dashboard/tickets/new
          pathname === '/dashboard/tickets/new' ? 'bg-indigo-600' : 'hover:bg-indigo-600' 
        }`}
      >
        <LuTicketPlus size={20} />
        <span>Novo Ticket</span>
      </Link>
    </nav>
  );
}