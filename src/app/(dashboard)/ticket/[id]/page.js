// src/app/(dashboard)/ticket/[id]/page.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function TicketDetailsPage() {
  const { data: session } = useSession();
  const { id } = useParams();
  const router = useRouter();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newStatus, setNewStatus] = useState('OPEN');
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTicket = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/tickets/${id}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('Ticket não encontrado');
        if (res.status === 401 || res.status === 403) throw new Error('Não autorizado');
        throw new Error('Falha ao buscar o ticket');
      }
      const data = await res.json();
      setTicket(data);
      setNewStatus(data.status ?? 'OPEN');
    } catch (err) {
      console.error('Erro ao buscar ticket:', err);
      setError(err.message || 'Erro ao buscar o ticket');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchTicket();
  }, [id, fetchTicket]);

  const handleStatusUpdate = async () => {
    if (!newStatus) return setError('Selecione um status válido');
    setError('');
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        if (res.status === 400) {
          const body = await res.json();
          throw new Error(body.message || 'Status inválido');
        }
        if (res.status === 403 || res.status === 401) throw new Error('Não autorizado');
        throw new Error('Falha ao atualizar o status');
      }
      const updated = await res.json();
      setTicket(updated);
      setNewStatus(updated.status);
      router.refresh();
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      setError(err.message || 'Erro ao atualizar status');
    }
  };

  const handleDeleteTicket = async () => {
    if (!confirm('Tem certeza que deseja deletar este ticket? Esta ação não pode ser desfeita.')) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/tickets/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        if (res.status === 404) throw new Error('Ticket não encontrado para exclusão.');
        throw new Error('Falha ao deletar o ticket.');
      }
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erro ao deletar o ticket.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="p-8 text-white">Carregando...</div>;
  if (error) return <div className="p-8 text-red-400">{error}</div>;

  return (
    <main className="min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="text-indigo-400 hover:text-indigo-300 mb-8 block">&larr; Voltar para a lista</Link>
        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-2">{ticket?.title}</h1>
          <p className="text-sm text-gray-400 mb-4">Criado em: {new Date(ticket?.createdAt).toLocaleString()}</p>
          <p className="mb-4">{ticket?.description}</p>
          <p className="text-xs text-gray-400">Status: <strong>{ticket?.status}</strong></p>
        </div>

        {session?.user?.role === 'AGENT' && (
          <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Painel do Agente</h2>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none"
                >
                  <option value="OPEN">Aberto</option>
                  <option value="IN_PROGRESS">Em Progresso</option>
                  <option value="CLOSED">Fechado</option>
                </select>
                <button onClick={handleStatusUpdate} className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold">Atualizar Status</button>
              </div>

              <button
                onClick={handleDeleteTicket}
                disabled={isDeleting}
                className={`py-2 px-4 rounded-md font-semibold ${isDeleting ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {isDeleting ? 'Deletando...' : 'Deletar Ticket'}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        )}
      </div>
    </main>
  );
}