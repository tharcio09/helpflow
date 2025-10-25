'use client';

import Link from 'next/link';

const getStatusDisplayNamePT = (status) => {
  switch (status) {
    case 'OPEN': return 'Aberto';
    case 'IN_PROGRESS': return 'Em Progresso';
    case 'CLOSED': return 'Fechado';
    default: return status;
  }
};

export default function TicketList({ tickets, loading, error }) {

  if (loading) {
    return <p className="text-center text-gray-400 mt-12">Carregando tickets...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-12">{error}</p>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Meus Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum ticket encontrado.</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Link key={ticket.id} href={`/ticket/${ticket.id}`}>
              <div key={ticket.id} className="p-4 bg-gray-800 rounded-lg shadow-md border-l-4 border-indigo-500">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">{ticket.title}</h3>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    ticket.status === 'OPEN' ? 'bg-green-600 text-white' :
                    ticket.status === 'IN_PROGRESS' ? 'bg-yellow-500 text-black' :
                    'bg-gray-600 text-gray-300'
                  }`}>
                    {getStatusDisplayNamePT(ticket.status)}
                  </span>
                </div>
                <p className="mt-2 text-gray-400">{ticket.description}</p>
                <p className="mt-3 text-xs text-gray-500">
                  Criado por: {ticket.author.name} em {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}