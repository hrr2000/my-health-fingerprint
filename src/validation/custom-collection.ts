import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

// this is for zod in trpc

export const createCollectionSchema = z.object({
  name: z.string().trim().min(3).max(45),
  isPublic: z.boolean(),
  patientProfile: z.boolean(),
});
// this is for client-side validation
export const createCollectionFormSchema = toFormikValidationSchema(
  createCollectionSchema
);

// for general purposes -> server validation , usage in services , uses in application itself
export type createCollectionType = z.infer<typeof createCollectionSchema>;
