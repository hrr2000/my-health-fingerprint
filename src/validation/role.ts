import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const roleSchema = z.object({
  org_name: z.string().optional(),
  name: z.string().min(5).max(25),
  permissions: z.array(z.string()),
});

// this is for formik
export const roleFormSchema = toFormikValidationSchema(roleSchema);

// for general purposes -> server validation , usage in services , uses in application itself
export type RoleType = z.infer<typeof roleSchema>;
