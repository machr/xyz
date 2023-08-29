import { createTRPCRouter, privateProcedure, publicProcedure } from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";
import { z } from "zod";


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
    }),

    create: privateProcedure
        .input(
            z.object({
                title: z.string(),
                url: z.string(),
                category: z.string()
            }))
        .mutation(async ({ ctx, input }) => {
            const link = await ctx.prisma.link.create({
                data: {
                    userId: ctx.currentUser,
                    title: input.title,
                    url: input.url,
                    category: input.category,
                }
            });

            return link
        })
})