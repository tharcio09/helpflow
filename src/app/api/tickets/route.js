
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; // Importa nossas opções de autenticação
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  // 1. Proteger a rota: verificar se o usuário está logado
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    // 2. Pegar os dados do formulário que vieram na requisição
    const body = await req.json();
    const { title, description } = body;

    // 3. Pegar o ID do usuário da sessão
    const userId = session.user.id;

    // 4. Usar o Prisma para criar o novo ticket no banco de dados
    const newTicket = await prisma.ticket.create({
      data: {
        title,
        description,
        userId, // Associa o ticket ao usuário logado
      },
    });

    // 5. Retornar uma resposta de sucesso com o ticket criado
    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar o ticket:", error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}

// --- FUNÇÃO PARA LER OS TICKETS ---

export async function GET() {
  // 1. Proteger a rota e pegar a sessão do usuário
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    // 2. Implementar a lógica de papéis (role-based logic)
    if (session.user.role === 'AGENT') {
      // Se for um AGENTE, buscar todos os tickets
      const tickets = await prisma.ticket.findMany({
        include: { author: true }, // Inclui os dados do autor de cada ticket
        orderBy: { createdAt: 'desc' }, // Mostra os mais recentes primeiro
      });
      return NextResponse.json(tickets, { status: 200 });
    } else {
      // Se for um CLIENTE, buscar apenas os tickets do próprio usuário
      const tickets = await prisma.ticket.findMany({
        where: {
          userId: session.user.id,
        },
        include: { author: true },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(tickets, { status: 200 });
    }
  } catch (error) {
    console.error("Erro ao buscar os tickets:", error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}