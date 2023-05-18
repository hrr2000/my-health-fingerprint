import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { isValidObjectId } from "mongoose";
// this is for zod in trpc
export const templateSchema = z.object({
  schema: z.string().trim(),
  orgId: z
    .string()
    .trim()
    .refine((val) => isValidObjectId(val), `Input must be an ObjectId`),
  collectionId: z.string().trim(),
  primary: z.boolean(),
});
// this is for formik
export const templateFormSchema = toFormikValidationSchema(templateSchema);

// for general purposes -> server validation , usage in services , uses in application itself
export type templateType = z.infer<typeof templateSchema>;
