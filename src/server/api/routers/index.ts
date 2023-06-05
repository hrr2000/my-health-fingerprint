import { patientRouter } from "./patient";
import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./user";
import { organizationRouter } from "./organization";
import { collectionRouter } from "@/server/api/routers/collection";
import { templateRouter } from "./template";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  patient: patientRouter,
  user: userRouter,
  organization: organizationRouter,
  collection: collectionRouter,
  template: templateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
