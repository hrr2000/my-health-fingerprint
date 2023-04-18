import { PatientModel } from "@/server/models";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
export const patientRouter = createTRPCRouter({
  findOne: publicProcedure.query(async ({}) => {
    return await PatientModel.findOne({ nationalId: "" });
  }),
  createOne: publicProcedure.mutation(async ({}) => {
    return await PatientModel.create({ nationalId: "" });
  }),
});
