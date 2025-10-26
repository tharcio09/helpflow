'use client';

import Link from 'next/link';

// Função auxiliar para traduzir o status
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
                // A div pai agora não precisa de classes de espaçamento
                <div>
                    {/* Usamos 'index' para saber qual item estamos renderizando */}
                    {tickets.map((ticket, index) => (
                        <Link
                            key={ticket.id}
                            href={`/ticket/${ticket.id}`}
                            // --- A SOLUÇÃO APLICADA AQUI ---
                            // Adiciona 'mt-6' (margem superior) se não for o primeiro item (index > 0)
                            // Adiciona 'block' para garantir que a margem funcione corretamente em elementos <a>
                            className={`block ${index > 0 ? 'mt-6' : ''}`}
                        >
                            <div className="p-4 bg-gray-800 rounded-lg shadow-md border-l-4 border-indigo-500 hover:bg-gray-700 transition-colors cursor-pointer">
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
                                    {/* Usamos optional chaining (?.) para segurança caso author não exista */}
                                    Criado por: {ticket.author?.name || 'Desconhecido'} em {new Date(ticket.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}