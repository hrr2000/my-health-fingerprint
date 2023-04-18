import { PatientModel } from "@/server/models";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
export const patientRouter = createTRPCRouter({
  findOne: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        id: z.string(),
      })
    )
    .query(async ({ input: { id } }) => {
      return await PatientModel.findOne({ _id: id });
    }),
  createOne: publicProcedure.mutation(async ({}) => {
    return await PatientModel.create({ nationalId: "" });
  }),
});
