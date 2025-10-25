
'use client';

import CreateTicketForm from "../../../../components/CreateTicketForm";
import { useRouter } from 'next/navigation';

export default function NewTicketPage() {
  const router = useRouter();

  const handleTicketCreated = () => {
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Criar um Novo Ticket</h1>
      <CreateTicketForm onTicketCreated={handleTicketCreated} />
    </div>
  );
}