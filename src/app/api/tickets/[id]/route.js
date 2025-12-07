import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// FUNÇÃO GET
export async function GET(req, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }
  try {
    const id = String(params?.id ?? '');
    console.debug('[ticket GET] params.id=', params, 'resolved id=', id, 'session.user.id=', session?.user?.id);

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: { agent: true },
    });

    if (!ticket) {
      console.warn(`[ticket GET] Ticket not found for id=${id}`);
      return NextResponse.json({ message: 'Ticket não encontrado' }, { status: 404 });
    }

    if (ticket.agentId !== session.user.id) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
    }

    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar o ticket:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}

// FUNÇÃO PATCH 
export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }

  const { id } = params;

  try {
    const body = await req.json();
    const { status } = body;

    if (!['OPEN', 'IN_PROGRESS', 'CLOSED'].includes(status)) {
      return NextResponse.json({ message: 'Status inválido' }, { status: 400 });
    }

    // Verifica se o ticket existe
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      return NextResponse.json({ message: 'Ticket não encontrado' }, { status: 404 });
    }

    // Verifica dono
    if (ticket.agentId !== session.user.id) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
    }

    // Atualiza
    const updatedTicket = await prisma.ticket.update({
      where: { id },
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





// FUNÇÃO PUT
export async function PUT(req, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, description } = body;

        if (!title || !description) {
            return NextResponse.json({ message: 'Título e descrição são obrigatórios' }, { status: 400 });
        }

        const ticket = await prisma.ticket.findUnique({
            where: { id: params.id },
        });

        if (!ticket) {
            return NextResponse.json({ message: 'Ticket não encontrado' }, { status: 404 });
        }

        if (ticket.agentId !== session.user.id) {
            return NextResponse.json({ message: 'Não autorizado a editar este ticket' }, { status: 403 });
        }

        const updatedTicket = await prisma.ticket.update({
            where: { id: params.id },
            data: { title, description },
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

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }

  const { id } = params;

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      return NextResponse.json({ message: 'Ticket não encontrado' }, { status: 404 });
    }

    if (ticket.agentId !== session.user.id) {
      return NextResponse.json({ message: 'Não autorizado a excluir este ticket' }, { status: 403 });
    }

    await prisma.ticket.delete({
      where: { id },
    });

    return new Response(null, { status: 204 });

  } catch (error) {
    console.error("Erro ao deletar o ticket:", error);
    if (error.code === 'P2025') {
      return NextResponse.json({ message: 'Ticket não encontrado para exclusão' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
