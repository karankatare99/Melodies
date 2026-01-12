import prisma from "@/app/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import YouTube from "youtube-sr";
import z from "zod";

const Schema = z.object({
    space: z.object({
        id: z.string(),
        userId: z.string(),
        name: z.string(),
        songs: z.any()
    }),
    url: z.string().includes("https://www.youtube.com/watch?v=")
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parseResult = Schema.safeParse(body);
        if (!parseResult.success) return NextResponse.json({ message: "Invalid Body" })

        const { id, songs } = parseResult.data.space;
        const { url } = parseResult.data;

        const video_data = await YouTube.getVideo(url);

        if (!video_data) return NextResponse.json({ message: "Video not found" }, { status: 400 })

        let { title } = video_data;
        if (!title) title = "Title Unavailable";

        const { channel } = video_data;
        let channel_name = channel?.name;
        if (!channel_name) channel_name = "Channel Unavailable";

        let streaming = false;
        if (!songs) streaming = true 

        const songId = url.split("?v=")[1]
        const newSong = await prisma.song.create({ data: { id: songId, streaming, spaceId: id, title, channel: channel_name, url, votes: 0 } })

        return NextResponse.json({ newSong })
    } catch (e) {
        console.error('Addsong API error:', e);
        return NextResponse.json({ message: "Failed to add Song" }, { status: 500 });
    }
}