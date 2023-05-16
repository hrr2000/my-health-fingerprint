import { patientRouter } from "./patient";
import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./user";
import { organizationRouter } from "./organization";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  patient: patientRouter,
  user: userRouter,
  organization: organizationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
