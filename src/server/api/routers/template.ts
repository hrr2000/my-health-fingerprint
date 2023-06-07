import { CollectionTemplateModel } from "@/server/models";
import { z } from "zod";
import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";

import { TRPCError } from "@trpc/server";

export const templateRouter = createTRPCRouter({
  findOne: protectedProcedure
    .input(z.object({ collectionName: z.string(), templateName: z.string() }))
    .query(async ({ input: { collectionName, templateName } }) => {
      const document = await CollectionTemplateModel.findOne(
        {
          collection_name: collectionName,
          name: templateName,
        });

      if (!document) {
        throw new TRPCError({
          message: "no template found for the corresponding collection",
          code: "NOT_FOUND",
        });
      }

      return {
        template: document
      };
    }),

  getSchema: protectedProcedure
    .input(z.object({ collectionName: z.string(), templateName: z.string() }))
    .query(async ({ input: { collectionName, templateName } }) => {
      const document = await CollectionTemplateModel.findOne(
        {
          collection_name: collectionName,
          name: templateName,
        },
        { schema: true, is_patient_specific: true }
      );

      if (!document) {
        throw new TRPCError({
          message: "no template found for the corresponding collection",
          code: "NOT_FOUND",
        });
      }

      return {
        schema: document.schema,
        isPatientSpecific: document.is_patient_specific,
      };
    }),
});
