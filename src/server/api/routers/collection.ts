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
        page: z.number().min(1),
        limit: z.number(),
      })
    )
    .query(async ({ input: { page, limit } }) => {
      const [collections, collectionsCount] = await Promise.all([
        CustomCollectionModel.find({}, { name: 1 })
          .skip((page - 1) * limit)
          .limit(limit),
        CustomCollectionModel.count(),
      ]);
      return {
        totalCount: collectionsCount,
        collections,
        pageSize: limit,
        isNextPage: collections.length === limit,
      };
    }),
});
