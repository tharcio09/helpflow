import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "../../../../lib/prisma";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Não autorizado" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { title, description } = body;

    const agentId = session.user.id;

    const newTicket = await prisma.ticket.create({
      data: {
        title,
        description,
        agentId,
      },
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar o ticket:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// --- FUNÇÃO PARA LER OS TICKETS ---

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Não autorizado" },
      { status: 401 }
    );
  }

  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        agentId: session.user.id,
      },
      include: { agent: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar os tickets:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
