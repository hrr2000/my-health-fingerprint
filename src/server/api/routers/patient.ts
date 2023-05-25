import { PatientModel } from "@/server/models";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
export const patientRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        id: z.string(),
      })
    )
    .query(async ({ input: { id } }) => {
      const patient = await PatientModel.findOne(
        { _id: id },
        { profile: true }
      );
      if (!patient) {
        throw new TRPCError({ message: "No patient found", code: "NOT_FOUND" });
      }
      return patient;
    }),
  getRegisteredCollections: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input: { id } }) => {
      const healthRecord = await PatientModel.findOne(
        { _id: id },
        { "health_record.collection_name": true }
      );
      if (!healthRecord) {
        throw new TRPCError({
          message: "No record found",
          code: "NOT_FOUND",
        });
      }

      // get keys
      // custom_collections
      // {collectionName : ith key , patient_specific : true | false}
      return healthRecord;
    }),
  createOne: publicProcedure.mutation(async ({}) => {
    return await PatientModel.create({ nationalId: "" });
  }),
});
