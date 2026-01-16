import prisma from "@/app/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const Schema = z.object({
    spaceId: z.string()
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parseResult = Schema.safeParse(body);
        if (!parseResult.success) return NextResponse.json({ message: "Invalid Body" });

        const { spaceId } = parseResult.data;

        const queue = await prisma.song.findMany({ where: { spaceId }, orderBy: { votes: 'desc' } });
        if (queue.length === 0) return NextResponse.json({ message: "Empty Queue" }, { status: 404 });
        if (queue.length === 1) {
            const lastSong = queue[0];
            await prisma.song.delete({ where: { id: lastSong.id } });
            return NextResponse.json({ topSong: lastSong })
        };

        const topSong = queue[0];
        await prisma.song.delete({ where: { id: topSong.id } })

        return NextResponse.json({ topSong })
    } catch (e) {
        console.error('Topsong API error:', e);
        return NextResponse.json({ message: "Failed to fetch top Song" });
    }
}