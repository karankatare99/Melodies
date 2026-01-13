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

        const queue = await prisma.song.findMany({ where: { spaceId } });
        if (!queue) return NextResponse.json({ message: "Empty Queue" });
        if (queue.length === 1) return NextResponse.json([{ queue }]);

        let topSong = { votes: 0 };
        queue.map((song) => {
            if (song.votes >= topSong.votes) { topSong = song }
        })

        return NextResponse.json({ topSong })
    } catch (e) {
        console.error('Topsong API error:', e);
        return NextResponse.json({ message: "Failed to fetch top Song" }, { status: 500 });
    }
}