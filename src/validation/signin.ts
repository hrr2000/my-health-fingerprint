import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const signinSchema = z.object({
  name: z.string(),
  password: z.string(),
});
export const signinFormSchema = toFormikValidationSchema(signinSchema);

export type SigninType = z.infer<typeof signinSchema>;
