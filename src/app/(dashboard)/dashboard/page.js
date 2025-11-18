'use client';

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import TicketList from "../../components/TicketList";

export default function DashboardPage() {
  const { data: session, status } = useSession();
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

  const handleTicketDeleted = (deletedTicketId) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== deletedTicketId));
  };

  const handleTicketUpdated = (updatedTicket) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen rounded-xl shadow-lg border border-gray-800">

      <h1 className="text-4xl font-bold mb-2 text-white">
        Olá, {session?.user?.name} 👋
      </h1>
      <p className="text-gray-400 mb-8 text-lg">
        Aqui estão seus tickets — <span className="font-medium text-indigo-400">{session?.user?.role}</span>
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md">
        <TicketList
          tickets={tickets}
          loading={loading}
          error={error}
          onTicketDeleted={handleTicketDeleted}
          onTicketUpdated={handleTicketUpdated}
          session={session}
        />
      </div>
      
    </div>
  );
}
