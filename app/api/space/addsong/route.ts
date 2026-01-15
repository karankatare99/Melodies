import prisma from "@/app/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import YouTube from "youtube-sr";
import z from "zod";

const Schema = z.object({
    spaceId: z.string(),
    url: z.string()
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parseResult = Schema.safeParse(body);
        if (!parseResult.success) return NextResponse.json({ message: "Invalid request" }, { status: 400 })
        const { spaceId, url } = parseResult.data;

        const songId = url.split("?v=")[1].split("&")[0]
        if (!songId) return NextResponse.json({ message: "Invalid YouTube URL format" }, { status: 400 })

        const existingSong = await prisma.song.findUnique({ where: { id: songId } })
        if (existingSong) return NextResponse.json({ message: "Song already in the queue" }, { status: 409 })

        const video_data = await YouTube.getVideo(url);
        if (!video_data) return NextResponse.json({ message: "Video not found" }, { status: 404 })

        const title = video_data.title || "Title Unavailable";
        const channel =  video_data.channel?.name || "Channel Unavailable";

        const newSong = await prisma.song.create({ data: { id: songId, spaceId, title, channel, url, votes: 0 } })

        return NextResponse.json({ newSong })
    } catch (e) {
        console.error('Addsong API error:', e);
        return NextResponse.json({ message: "Failed to add Song" }, { status: 500 });
    }
}