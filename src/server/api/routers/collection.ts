import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  createCollectionSchema,
  updateCollectionSchema,
} from "@/validation/custom-collection";
import {
  CustomCollectionModel,
  CollectionTemplateModel,
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
      try {
        // Create the custom collection and save it in the database.
        const customCollection = new CustomCollectionModel({
          name: collection.name,
          is_patient_profile: collection.isPatientProfile,
          is_patient_specific: collection.isPatientSpecific,
          is_public: collection.isPublic,
          description: collection.description,
        });
        const { _id, name: collection_name } = await customCollection.save();

        // Create the primary template for this collection using the collection id returned after save.
        const collectionTemplate = new CollectionTemplateModel({
          collection_id: _id,
          schema: template.schema,
          name: template.name,
          is_printable: template.isPrintable,
          primary: true,
        });
        await collectionTemplate.save();

        // Create the physical Collection in the database.
        mongoose.model(collection_name, new Schema({}, { autoCreate: false }));
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          message: `Collection Isn't Created!`,
          code: "INTERNAL_SERVER_ERROR",
        });
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
          { collection_id: slug, primary: true },
          {
            $set: {
              schema: template.schema,
              is_printable: template.isPrintable,
              primary: true,
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

        const template = await CollectionTemplateModel.findOne({
          collection_id: slug,
          primary: true,
        });

        if (!template || !collection) {
          throw new Error("Not Found");
        }
        console.log({ server: template });

        return {
          collection,
          template: {
            name: template.name,
            primary: template.primary,
            is_printable: template.is_printable,
            schema: template.schema,
          },
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
});
