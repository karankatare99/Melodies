import prisma from "@/app/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const Schema = z.object({
    songId: z.string()
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parseResult = Schema.safeParse(body);
        if (!parseResult.success) return NextResponse.json({ message: "Invalid Body" });

        const { songId } = parseResult.data;

        await prisma.song.update({ where: { id: songId }, data: { votes: { increment: 1 } } })

    } catch (e) {
        console.error('Topsong API error:', e);
        return NextResponse.json({ message: "Failed to fetch top Song" }, { status: 500 });
    }
}