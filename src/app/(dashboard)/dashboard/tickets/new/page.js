
'use client';

import CreateTicketForm from "../../../../components/CreateTicketForm";
import { useRouter } from 'next/navigation';

export default function NewTicketPage() {
  const router = useRouter();

  const handleTicketCreated = () => {
    // Após criar o ticket, redireciona o usuário de volta para o dashboard principal
    router.push('/dashboard');
    router.refresh(); // Força a atualização dos dados na página de dashboard
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Criar um Novo Ticket</h1>
      <CreateTicketForm onTicketCreated={handleTicketCreated} />
    </div>
  );
}