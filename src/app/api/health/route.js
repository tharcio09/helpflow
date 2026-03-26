import prisma from "@/lib/prisma";

export async function GET() {
    try {
        await prisma.user.findFirst();
        return Response.json({ status: "ok", db: "connected" });
    } catch (error) {
        console.error(error);
        return Response.json({
            status: "error",
            message: error.message,
        }, { status: 500 });
    }
}