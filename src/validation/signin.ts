import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

// this is for zod in trpc
export const signinSchema = z.object({
  nationalId: z.string(),
});
// this is for formik
export const signinFormSchema = toFormikValidationSchema(signinSchema);

export type SigninType = z.infer<typeof signinSchema>;
