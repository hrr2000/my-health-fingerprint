import { patientRouter } from "./patient";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { userRouter } from "./user";
import { organizationRouter } from "./organization";
import { custom_collections } from "@/server/models";
import {collectionRouter} from "@/server/api/routers/collection";
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
  test: publicProcedure.mutation(async () => {
    const cc = new custom_collections({ name: "asdsad" });
    await cc.save();
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
