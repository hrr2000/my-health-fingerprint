import { isValidObjectId } from "mongoose";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

// this is for zod in trpc

export const createCollectionSchema = z.object({
  collection: z.object({
    name: z.string().trim().min(3).max(45),
    isPublic: z.boolean(),
    isPatientProfile: z.boolean(),
    description: z.string(),
  }),
  template: z.object({
    schema: z.any(),
    name: z.string(),
    isPrintable: z.boolean(),
  }),
});
export const updateCollectionSchema = z.object({
  collection: z.object({
    name: z.string().trim().min(3).max(45),
    isPublic: z.boolean(),
    isPatientProfile: z.boolean(),
    description: z.string(),
  }),
  template: z.object({
    schema: z.any(),
    name: z.string(),
    isPrintable: z.boolean(),
  }),
  slug: z
    .string()
    .trim()
    .refine((val) => isValidObjectId(val), `Input must be an ObjectId`),
});
// this is for client-side validation
export const createCollectionFormSchema = toFormikValidationSchema(
  createCollectionSchema
);
export const updateCollectionFormSchema = toFormikValidationSchema(
  createCollectionSchema
);

// for general purposes -> server validation , usage in services , uses in application itself
export type createCollectionType = z.infer<typeof createCollectionSchema>;
export type updateCollectionType = z.infer<typeof updateCollectionSchema>;
