
'use client';

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import TicketList from "../../components/TicketList";

export default function DashboardPage() {
  const { data: session, status } = useSession(); // Pegamos o 'status' aqui
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/tickets');
      if (!res.ok) {
        throw new Error('Falha ao buscar os tickets.');
      }
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // --- AQUI ESTÁ A CORREÇÃO ---
  // Trocamos a dependência de [session] para [status]
  useEffect(() => {
    // Só buscamos os tickets quando temos certeza de que o usuário está autenticado.
    if (status === 'authenticated') {
      fetchTickets();
    }
  }, [status]); // O useEffect agora só roda quando o 'status' da sessão muda.

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Olá, {session?.user?.name}!</h1>
      <p className="text-gray-400 mb-8">Aqui estão os seus tickets. Papel: {session?.user?.role}</p>
      
      {/* Passamos os estados para o TicketList como props */}
      <TicketList tickets={tickets} loading={loading} error={error} />
    </div>
  );
}