// src/app/api/tickets/[id]/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// FUNÇÃO GET (Já correta)
export async function GET(req, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }
  try {
    // Sanitize and ensure params.id is a string
    const id = String(params?.id ?? '');
    console.debug('[ticket GET] params.id=', params, 'resolved id=', id, 'session.user.id=', session?.user?.id);

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!ticket) {
      console.warn(`[ticket GET] Ticket not found for id=${id}`);
      return NextResponse.json({ message: 'Ticket não encontrado' }, { status: 404 });
    }

    if (session.user.role !== 'AGENT' && ticket.userId !== session.user.id) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
    }

    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar o ticket:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}

// FUNÇÃO PATCH (Já correta)
export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'AGENT') {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }
  try {
    const body = await req.json();
    const { status } = body;
    if (!['OPEN', 'IN_PROGRESS', 'CLOSED'].includes(status)) {
        return NextResponse.json({ message: 'Status inválido' }, { status: 400 });
    }
    const updatedTicket = await prisma.ticket.update({
      where: { id: params.id },
      data: { status },
    });
    return NextResponse.json(updatedTicket, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar o ticket:", error);
     if (error.code === 'P2025') {
         return NextResponse.json({ message: 'Ticket não encontrado para atualização' }, { status: 404 });
     }
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}

// --- FUNÇÃO DELETE CORRIGIDA ---
// 1. Garantimos que o segundo argumento é { params }
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  // Apenas AGENTES podem deletar
  if (!session || session.user.role !== 'AGENT') {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }

  try {
    // Usar o Prisma para deletar o ticket pelo ID (params.id funciona aqui)
    await prisma.ticket.delete({
      where: { id: params.id },
    });

    // 2. CORREÇÃO: Usar a Response padrão para 204 No Content
    return new Response(null, { status: 204 });

  } catch (error) {
    console.error("Erro ao deletar o ticket:", error);
    // Verifica se o erro foi porque o ticket não foi encontrado
    if (error.code === 'P2025') {
         return NextResponse.json({ message: 'Ticket não encontrado para exclusão' }, { status: 404 });
     }
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}