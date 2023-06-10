import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { numeric } from "./utils";
// this is for zod in trpc
export const createUserSchema = z.object({
  firstName: z.string().trim().min(3).max(100),
  lastName: z.string().trim().min(3).max(100),
  nationalId: numeric().min(14).max(14),
  password: z.string().trim().min(8).max(50),
  email: z.string().trim().email(),
  orgId: z.string().trim(),
  orgName: z.string().trim(),
  roles: z.array(z.string()),
  jobTitle: z.string().trim(),
});
// this is for clientside validation
export const createUserFormSchema = toFormikValidationSchema(createUserSchema);

// for general puposes -> server validation , usage in services , uses in application itself
export type createUserType = z.infer<typeof createUserSchema>;
