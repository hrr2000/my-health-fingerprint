import { UserModel } from "@/server/models";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
export const patientRouter = createTRPCRouter({
  findOne: protectedProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getDestro: publicProcedure.query(async ({}) => {
    return await UserModel.findOne({ name: "destro45" });
  }),
});
