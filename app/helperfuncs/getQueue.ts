import prisma from "../lib/PrismaClient";

export async function getQueue(spaceId : string) {
    try {
        const queue = prisma.song.findMany({ where: { spaceId } });
        return queue
    } catch (e) {
        return []
    }
}