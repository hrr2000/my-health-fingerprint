import { patientRouter } from "./patient";
import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  patient: patientRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
