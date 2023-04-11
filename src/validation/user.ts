import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
const numeric = () => z.string().regex(/^\d+$/);

// this is for zod in trpc
export const createUserSchema = z.object({
  firstName: z.string().min(3).max(100).trim(),
  lastName: z.string().min(3).max(100).trim(),
  nationalId: numeric().min(14).max(14).trim(),
  password: z.string().min(8).max(50),
  email: z.string().email().trim(),
  orgId: z.string(),
  orgName: z.string().trim(),
  roles: z.string().array(),
  jobTitle: z.string().trim(),
});
// this is for clientside validation
export const createUserFormSchema = toFormikValidationSchema(createUserSchema);

// for general puposes -> server validation , usage in services , uses in application itself
export type createUserType = z.infer<typeof createUserSchema>;
