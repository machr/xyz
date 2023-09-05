import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";
import { z } from "zod";


export const userRouter = createTRPCRouter({
    claimDisplayName: privateProcedure
        .input(z.string().min(1).max(25))
        .mutation(async ({ctx, input}) => {
            // has to be unique!
            const user: User = await clerkClient.users.updateUserMetadata(ctx.userId, {
                unsafeMetadata: {
                    displayName: input
                }
            })

           
            return user.unsafeMetadata.displayName
        })
})