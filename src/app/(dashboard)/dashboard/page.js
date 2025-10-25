
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
  useEffect(() => {
    if (status === 'authenticated') {
      fetchTickets();
    }
  }, [status]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Olá, {session?.user?.name}!</h1>
      <p className="text-gray-400 mb-8">Aqui estão os seus tickets. Papel: {session?.user?.role}</p>
      <TicketList tickets={tickets} loading={loading} error={error} />
    </div>
  );
}