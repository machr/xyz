import { linksRouter } from "@/server/api/routers/links";
import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  links: linksRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
