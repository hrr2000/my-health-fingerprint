import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  createCollectionSchema,
  updateCollectionSchema,
} from "@/validation/custom-collection";
import {
  CustomCollectionModel,
  CollectionTemplateModel, PatientModel,
} from "@/server/models";
import mongoose, { Schema } from "mongoose";
import { z } from "zod";

export const collectionRouter = createTRPCRouter({
  /**
   *
   * This procedure creates a new custom collection with its primary template.
   * It creates a collection in the database too using the name of the custom collection.
   */
  create: protectedProcedure
    .input(createCollectionSchema)
    .mutation(async ({ input: { collection, template } }) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // Create the custom collection and save it in the database.
        const customCollection = new CustomCollectionModel({
          name: collection.name,
          is_patient_profile: collection.isPatientProfile,
          is_patient_specific: collection.isPatientSpecific,
          is_public: collection.isPublic,
          description: collection.description,
        });
        const { name: collection_name } = await customCollection.save();

        const mainTemplate = new CollectionTemplateModel({
          collection_name,
          schema: "[]",
          name: "main",
          is_printable: template.isPrintable,
          primary: true,
        });
        const isMainTemplateSaved = await mainTemplate.save();

        const patientTemplate = new CollectionTemplateModel({
          collection_name,
          schema: "[]",
          name: "patient",
          is_printable: template.isPrintable,
          primary: false,
        });
        const isPatientTemplateSaved = await patientTemplate.save();

        // Create the physical Collection in the database.
        if(!collection.isPatientSpecific) {
          mongoose.model(collection_name, new Schema({}, { strict: false }));
        }
      } catch (e) {
        await session.abortTransaction();
        throw new TRPCError({
          message: `Failed to create a collection!`,
          code: "INTERNAL_SERVER_ERROR",
        });
      } finally {
        await session.endSession();
      }
    }),

  update: protectedProcedure
    .input(updateCollectionSchema)
    .mutation(async ({ input: { collection, template, slug } }) => {
      // update schema shape in customCollectionModel using the slug
      try {
        // Create the custom collection and save it in the database.
        const updateCollectionCall = CustomCollectionModel.updateOne(
          { _id: slug },
          {
            $set: {
              is_patient_profile: collection.isPatientProfile,
              is_patient_specific: collection.isPatientSpecific,
              is_public: collection.isPublic,
              description: collection.description,
            },
          }
        );

        const updateCollectionTemplateCall = CollectionTemplateModel.updateOne(
          { collection_name: collection.name, name: template.name },
          {
            $set: {
              schema: template.schema,
              is_printable: template.isPrintable,
            },
          }
        );

        await Promise.all([updateCollectionCall, updateCollectionTemplateCall]);
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          message: `Collection Isn't Created!`,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  /**
   *
   *
   */
  findOne: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input: { slug } }) => {
      try {
        const collection = await CustomCollectionModel.findOne({
          _id: slug,
        });

        const mainTemplate = await CollectionTemplateModel.findOne({
          collection_name: collection?.name,
          name: "main",
        });

        const patientTemplate = await CollectionTemplateModel.findOne({
          collection_name: collection?.name,
          name: "patient",
        });

        if (!mainTemplate && !patientTemplate && !collection) {
          throw new Error("Not Found");
        }

        const template = (!collection?.is_patient_specific ? mainTemplate : patientTemplate);

        return {
          collection,
          template: {
            name: template?.name,
            collection_name: collection?.name,
            primary: template?.primary,
            isPrintable: template?.is_printable,
            schema: template?.schema,
          },
          patient_template: patientTemplate,
        };
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          message: "Collection Not Found",
          code: "NOT_FOUND",
        });
      }
    }),

  /**
   *
   * This Procedure lists all the custom collections with Pagination.
   */
  list: protectedProcedure
    .input(
      z.object({
        page: z.number().int(),
        perPage: z.number().int().optional(),
      })
    )
    .query(async ({ input: { page, perPage } }) => {
      const p = page || 1;
      const pp = perPage || 10;
      const [collections, collectionsCount] = await Promise.all([
        CustomCollectionModel.find({}, { name: 1 })
          .skip((p - 1) * pp)
          .limit(pp),
        CustomCollectionModel.count(),
      ]);
      const totalPages = Math.ceil(collectionsCount / pp);
      const currentPage = p;
      return {
        collections,
        currentPage,
        pageSize: pp,
        totalPages,
        isNextPage: currentPage < totalPages,
      };
    }),

  addEntry: protectedProcedure
    .input(
      z.object({
        collectionName: z.string(),
        data: z.any(),
      })
    )
    .mutation(async ({ input: { collectionName, data } }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const {acknowledged} = await mongoose.connection.collection(collectionName).insertOne(data);
      if (!acknowledged) {
        throw new TRPCError({
          message: `Failed to add entry to collection: ${collectionName}`,
          code: "BAD_REQUEST",
        });
      }
    }),
});
