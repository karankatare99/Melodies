import prisma from "@/app/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const Schema = z.object({
    spaceName: z.string()
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parseResult = Schema.safeParse(body);

        if (!parseResult.success) return NextResponse.json({ message: "Invalid Body" })

        const { spaceName } = parseResult.data;

        const existing_space = await prisma.space.findUnique({
            where: { name: spaceName }
        })

        if (existing_space?.id) return NextResponse.json({ spaceId: existing_space.id })

        return NextResponse.json({ message: "Space doesn't exist" })

    } catch (e) {
        console.error('Space API error:', e);
        return NextResponse.json({ message: "Failed to create Space" }, { status: 500 });
    }
}