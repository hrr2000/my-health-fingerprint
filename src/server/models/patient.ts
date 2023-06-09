import mongoose from "mongoose";
import {
  type PatientDocument,
  type PatientAddress,
  type PatientFullName,
  type PatientRelativePhoneNumbers,
} from "@/types/mongo";

const { Schema } = mongoose;

const dataSchema = new Schema({}, { strict: false });

const collectionSchema = new Schema({
  collection_name: { type: String, unique: true },
  data: [dataSchema],
});
const relativePhoneNumbersSchema = new Schema<PatientRelativePhoneNumbers>({
  phone_number: { type: String, default: "" },
  relative: { type: String, default: "" },
});

const addressSchema = new Schema<PatientAddress>({
  city: { type: String, default: "" },
  district: { type: String, default: "" },
  postal_code: { type: String, default: "" },
  street_name: { type: String, default: "" },
});
// .index(
//   { city: 1, district: 1, postal_code: 1, street_name: 1 },
//   { unique: true }
// );
const fullNameSchema = new Schema<PatientFullName>({
  first_name: { type: String, default: "" },
  middle_name: { type: String, default: "" },
  last_name: { type: String, default: "" },
});
// .index({ first_name: 1, middle_name: 1, last_name: 1 }, { unique: true });

const schema = new Schema<PatientDocument>(
  {
    profile: {
      date_of_birth: { type: Schema.Types.Date, default: new Date() },
      gender: { type: String, default: "" },
      nationalId: String,
      full_name: fullNameSchema,
      address: [addressSchema],
      imageUrl: { type: String, default: "" },
      phone_number: { type: String, default: "" },
      relative_phone_numbers: [relativePhoneNumbersSchema],
    },
    health_record: [collectionSchema],
  },
  { timestamps: true, strict: false }
);

export default (mongoose.models.patients as mongoose.Model<PatientDocument>) ||
  mongoose.model<PatientDocument>("patients", schema);
