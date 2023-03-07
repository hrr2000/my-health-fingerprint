import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
const numeric = () => z.string().regex(/^\d+$/);

// this is for zod in trpc
export const createUserSchema = z.object({
  name: z.string().min(3).max(100),
  nationalId: numeric().min(14).max(14),
  password: z.string().min(8).max(50),
  email: z.string().email(),
});
// this is for formik
export const createUserFormSchema = toFormikValidationSchema(createUserSchema);

export type createUserType = z.infer<typeof createUserSchema>;
