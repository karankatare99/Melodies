import prisma from "@/app/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const Schema = z.object({
    userId: z.string(),
    spaceName: z.string()
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parseResult = Schema.safeParse(body);

        if (!parseResult.success) return NextResponse.json({ message: "Invalid Body" })

        const { userId, spaceName } = parseResult.data;

        const existing_space = await prisma.space.findUnique({
            where: { name: spaceName }
        })

        if (existing_space?.id) return NextResponse.json({ message: "Space already exists" })

        const new_space = await prisma.space.create({
            data: { userId, name: spaceName }
        })

        return NextResponse.json({ spaceId: new_space.id })
    } catch (e) {
        console.error('Space API error:', e);
        return NextResponse.json({ message: "Failed to create Space" }, { status: 500 });
    }
}