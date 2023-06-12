import {
  CollectionTemplateModel,
  CustomCollectionModel,
  PatientModel,
} from "@/server/models";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  patientProfileSchema,
  type PatientProfileType,
} from "@/validation/patient";

import { numeric } from "@/validation/utils";
import {
  type PatientAddress,
  type PatientDocument,
  type PatientRelativePhoneNumbers,
} from "@/types/mongo";

export const patientRouter = createTRPCRouter({
  getProfile: protectedProcedure
    .input(
      z.object({
        nationalId: numeric().min(14).max(14),
      })
    )
    .query(async ({ input: { nationalId } }) => {
      const patient = await PatientModel.findOne(
        { "profile.nationalId": nationalId },
        { profile: true }
      );
      if (!patient) {
        throw new TRPCError({
          message: "No patients found",
          code: "NOT_FOUND",
        });
      }
      const { profile } = patient;
      const formattedAddresses = profile.address.map(
        ({
          _id,
          city,
          district,
          street_name,
        }): PatientProfileType["address"][number] & { id: string } => ({
          id: _id.toString(),
          city,
          district,
          streetName: street_name,
        })
      );

      const formattedPhoneNumbers = profile.relative_phone_numbers.map(
        ({
          _id,
          phone_number,
          relative,
        }): PatientProfileType["relativePhoneNumbers"][number] & {
          id: string;
        } => ({
          id: _id.toString(),
          relative,
          phoneNumber: phone_number,
        })
      );

      return {
        fullName: {
          firstName: profile.full_name.first_name,
          middleName: profile.full_name.middle_name,
          lastName: profile.full_name.last_name,
        },
        address: formattedAddresses,
        dateOfBirth: profile.date_of_birth,
        gender: profile.gender as PatientProfileType["gender"],
        phoneNumber: profile.phone_number,
        imageUrl: profile.imageUrl,
        relativePhoneNumbers: formattedPhoneNumbers,
      };
    }),
  updateProfile: protectedProcedure
    .input(
      z.object({
        nationalId: numeric().min(14).max(14),
        profileData: patientProfileSchema,
      })
    )
    .mutation(async ({ input: { nationalId, profileData } }) => {
      const formattedAddresses = profileData.address.map(
        ({
          city,
          district,

          streetName,
        }): Omit<PatientAddress, "_id"> => ({
          city,
          district,
          street_name: streetName,
        })
      );

      const formattedPhoneNumbers = profileData.relativePhoneNumbers.map(
        ({
          phoneNumber,
          relative,
        }): Omit<PatientRelativePhoneNumbers, "_id"> => ({
          relative,
          phone_number: phoneNumber,
        })
      );

      const isUpdated = await PatientModel.updateOne(
        { "profile.nationalId": nationalId },
        {
          $set: {
            profile: {
              relative_phone_numbers: formattedPhoneNumbers,
              date_of_birth: profileData.dateOfBirth,
              phone_number: profileData.phoneNumber,
              address: formattedAddresses,
              gender: profileData.gender,
              imageUrl: profileData.imageUrl || "",
              full_name: {
                first_name: profileData.fullName.firstName,
                middle_name: profileData.fullName.middleName || "",
                last_name: profileData.fullName.lastName,
              },
              nationalId,
            } as PatientDocument["profile"],
          },
        }
      );
      if (!isUpdated.acknowledged) {
        throw new TRPCError({
          message: `Failed to update user with nationalId ${nationalId}`,
          code: "BAD_REQUEST",
        });
      }
    }),
  createProfile: protectedProcedure
    .input(
      z.object({
        nationalId: numeric().min(14).max(14),
      })
    )
    .mutation(async ({ input: { nationalId } }) => {
      const doc = await PatientModel.create({
        profile: {
          nationalId,
          gender: "",
          date_of_birth: new Date(),
          full_name: {
            first_name: "",
            last_name: "",
            middle_name: "",
          },
          imageUrl: "",
          phone_number: "",
          address: [],
          relative_phone_numbers: [],
        },
        health_record: [],
      } as PatientDocument);
      if (!doc) {
        throw new TRPCError({
          message: `Failed to create user with nationalId ${nationalId}`,
          code: "BAD_REQUEST",
        });
      }
    }),
  getRegisteredCollections: protectedProcedure
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
  registerCollection: protectedProcedure
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
  getUnRegisteredCollections: protectedProcedure
    .input(z.object({ registeredCollections: z.array(z.string()) }))
    .query(async ({ input: { registeredCollections } }) => {
      const results = await CustomCollectionModel.find(
        {
          name: { $nin: registeredCollections },
        },
        { _id: true, name: true, label: true }
      );
      return results;
    }),
  getRegisteredCollectionDetails: protectedProcedure
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
            name: "patient",
          },
          { schema: true }
        ),
      ]);
      if (!collectionTemplate || !collectionData) {
        throw new Error("Not Found");
      }
      return {
        collectionData: collectionData.health_record[0]?.data,
        collectionTemplate,
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

  updateEntryOfCollection: protectedProcedure
    .input(
      z.object({
        collectionName: z.string(),
        patientId: z.string(),
        data: z.any(),
      })
    )
    .mutation(async ({ input: { collectionName, patientId } }) => {
      const currentDate = new Date();
      const isUpdated = await PatientModel.updateOne(
        {
          "profile.nationalId": patientId,
          "health_record.collection_name": collectionName,
        },
        {
          $set: {
            "health_record.$[].data.$[].end_date": currentDate,
          },
        }
      );
      if (!isUpdated.acknowledged) {
        throw new TRPCError({
          message: `Failed to update entry to collection: ${collectionName} for patient: ${patientId}`,
          code: "BAD_REQUEST",
        });
      }
      // MTNSA4 TSL7 DI
    }),

  createOne: protectedProcedure.mutation(async ({}) => {
    return await PatientModel.create({ nationalId: "" });
  }),

  getRecommendations: protectedProcedure
    .input(
      z.object({
        patientId: z.string(),
      })
    )
    .query(async ({ input: { patientId } }) => {
      await fetch(
        "https://mhfp-recommendation-production.up.railway.app/train",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: patientId,
            key: "35c750bd9e9b7618684c0dc32470ac6da5371ddd1b2aff0ed209ce78385548eb",
          }),
        }
      ).then(() => console.log("Trained Successfully!"));
      return fetch(
        "https://mhfp-recommendation-production.up.railway.app/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: patientId,
            key: "35c750bd9e9b7618684c0dc32470ac6da5371ddd1b2aff0ed209ce78385548eb",
          }),
        }
      ).then((res) => res.json());
    }),
});
