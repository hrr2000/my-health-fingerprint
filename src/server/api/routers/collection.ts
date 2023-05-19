import { UserModel } from "@/server/models";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  createCollectionSchema,
  createCollectionType,
} from "@/validation/custom-collection";
import {
  CustomCollectionModel,
  CollectionTemplateModel,
} from "@/server/models";
import mongoose, { Schema } from "mongoose";
import { CollectionTemplateDocument } from "@/types/mongo";
import { z } from "zod";

export const collectionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCollectionSchema)
    .mutation(async ({ input: { collection, template } }) => {
      try {
        const customCollection = new CustomCollectionModel({
          name: collection.name,
          patient_profile: collection.isPatientProfile,
          is_public: collection.isPublic,
        });

        const { _id, name: collection_name } = await customCollection.save();

        const collectionTemplate = new CollectionTemplateModel({
          collection_id: _id,
          ...template,
          primary: true,
        });
        await collectionTemplate.save();

        mongoose.model(collection_name, new Schema({}, { autoCreate: false }));
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          message: `Collection Isn't Created!`,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

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
