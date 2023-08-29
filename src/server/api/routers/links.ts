import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";


const filterUserforClient = (user: User) => {
    return {
        id: user.id,
        username: user.username,
        imageUrl: user.imageUrl,
    }

}
export const linksRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const links = await ctx.prisma.link.findMany({
            take: 100
        });

        const users = (
            await clerkClient.users.getUserList({
                userId: links.map((link) => link.userId),
                limit: 100,
            })
        ).map(filterUserforClient)

        return links.map((link) => ({
            link,
            user: users.find((user) => user.id === link.userId),
        }))
    })
})