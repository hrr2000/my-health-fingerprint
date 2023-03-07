import { UserModel } from "@/server/models";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { createUserSchema } from "@/validation/user";
export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      await UserModel.create(input);
    }),
  getDestro: publicProcedure.query(async ({}) => {
    return await UserModel.findOne({ name: "destro45" });
  }),
});
