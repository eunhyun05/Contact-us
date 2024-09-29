import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const data = await request.json();

    const newContact = await prisma.contact.create({
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
    });

    return new Response(JSON.stringify({ status: 'success', contact: newContact }), { status: 200 });
}

export async function GET() {
    const data = await prisma.contact.findMany();
    return new Response(JSON.stringify({ status: 'success', contact: data }), { status: 200 });
}