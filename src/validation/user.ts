import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
const numeric = () => z.string().regex(/^\d+$/);

// this is for zod in trpc
export const createUserSchema = z.object({
  first_name: z.string().min(3).max(100).trim(),
  last_name: z.string().min(3).max(100).trim(),
  nationalId: numeric().min(14).max(14).trim(),
  password: z.string().min(8).max(50),
  email: z.string().email().trim(),
  orgId: z.string(),
  orgName: z.string().trim(),
  roles: z.string().array(),
  jobTitle: z.string().trim(),
});
// this is for formik
export const createUserFormSchema = toFormikValidationSchema(createUserSchema);

export type createUserType = z.infer<typeof createUserSchema>;
