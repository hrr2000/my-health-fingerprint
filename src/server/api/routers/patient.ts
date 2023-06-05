import {
  CollectionTemplateModel,
  CustomCollectionModel,
  PatientModel,
} from "@/server/models";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
export const patientRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        nationalId: z.string(),
      })
    )
    .query(async ({ input: { nationalId } }) => {
      const patient = await PatientModel.findOne(
        { "profile.nationalId": nationalId },
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
        nationalId: z.string(),
      })
    )
    .query(async ({ input: { nationalId } }) => {
      const healthRecord = await PatientModel.findOne(
        { "profile.nationalId": nationalId },
        { "health_record.collection_name": true }
      );
      if (!healthRecord) {
        throw new TRPCError({
          message: "No record found",
          code: "NOT_FOUND",
        });
      }
      return healthRecord;
    }),
  registerCollection: publicProcedure
    .input(z.object({ collectionName: z.string(), patientId: z.string() }))
    .mutation(async ({ input: { collectionName, patientId } }) => {
      await PatientModel.updateOne(
        { "profile.nationalId": patientId },
        {
          $push: {
            health_record: { collection_name: collectionName, data: [] },
          },
        }
      );
    }),
  getUnRegisteredCollections: publicProcedure
    .input(z.object({ registeredCollections: z.array(z.string()) }))
    .query(async ({ input: { registeredCollections } }) => {
      const results = await CustomCollectionModel.find(
        {
          name: { $nin: registeredCollections },
        },
        { _id: true, name: true }
      );
      return results;
    }),
  getRegisteredCollectionDetails: publicProcedure
    .input(
      z.object({
        nationalId: z.string(),
        collection_name: z.string(),
      })
    )
    .query(async ({ input: { collection_name, nationalId } }) => {
      const [collectionData, collectionTemplate] = await Promise.all([
        PatientModel.findOne(
          {
            "profile.nationalId": nationalId,
            "health_record.collection_name": collection_name,
          },
          { "health_record.$": true }
        ),
        CollectionTemplateModel.findOne(
          {
            collection_name,
            primary: true,
          },
          { schema: true }
        ),
      ]);
      if (!collectionTemplate || !collectionData) {
        throw new Error("Not Found");
      }
      return {
        collectionData: collectionData.health_record[0]?.data,
        collectionTemplate: collectionTemplate.schema,
      };
    }),
  addEntryToCollection: protectedProcedure
    .input(
      z.object({
        collectionName: z.string(),
        patientId: z.string(),
        data: z.any(),
      })
    )
    .mutation(async ({ input: { collectionName, patientId, data } }) => {
      const isUpdated = await PatientModel.updateOne(
        {
          "profile.nationalId": patientId,
          "health_record.collection_name": collectionName,
        },
        {
          $push: {
            "health_record.$.data": data as object,
          },
        }
      );
      if (!isUpdated.acknowledged) {
        throw new TRPCError({
          message: `Failed to add entry to collection: ${collectionName} for patient: ${patientId}`,
          code: "BAD_REQUEST",
        });
      }
      // MTNSA4 TSL7 DI
    }),
  createOne: publicProcedure.mutation(async ({}) => {
    return await PatientModel.create({ nationalId: "" });
  }),
});
