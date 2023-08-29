import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const linksRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.link.findMany()
    })
})