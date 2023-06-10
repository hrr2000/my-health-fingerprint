import {z} from "zod";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {numeric} from "./utils";

const fullNameSchema = z.object({
    firstName: z.string().trim().min(3).max(45),
    middleName: z.string().trim().max(45).optional(),
    lastName: z.string().trim().min(3).max(45),
});
const addressSchema = z
    .array(
        z.object({
            district: z.string(),
            streetName: z.string().trim(),
            city: z.string().trim(),
            postalCode: numeric().max(5).optional(),
        })
    )
    .min(1);
const relativePhoneNumbersSchema = z
    .array(
        z.object({
            phoneNumber: numeric().min(11).max(11),
            relative: z.string().trim(),
        })
    )
    .min(2);

// this is for zod in trpc
export const patientProfileSchema = z.object({
    gender: z.enum(["male", "female"]),
    dateOfBirth: z.coerce.date(),
    fullName: fullNameSchema,
    address: addressSchema,
    imageUrl: z.string().optional(),
    phoneNumber: numeric().min(11).max(11),
    relativePhoneNumbers: relativePhoneNumbersSchema,
});
// this is for formik
export const patientProfileFormSchema =
    toFormikValidationSchema(patientProfileSchema);

// for general purposes -> server validation , usage in services , uses in application itself
export type PatientProfileType = z.infer<typeof patientProfileSchema>;
