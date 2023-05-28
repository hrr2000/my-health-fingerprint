import mongoose from "mongoose";
import { type PatientDocument, type PatientAddress } from "@/types/mongo";

const { Schema } = mongoose;

const dataSchema = new Schema({
  collection_name: { type: String, required: true, unique: true },
  data: [],
});

const addressSchema = new Schema<PatientAddress>({
  city: String,
  district: String,
  postal_code: String,
  street_name: String,
});

const schema = new Schema<PatientDocument>(
  {
    profile: {
      date_of_birth: Schema.Types.Date,
      gender: String,
      nationalId: String,
      name: String,
      address: [addressSchema],
      imageUrl: String,
      phone_number: String,
      alternative_phone_number: [String],
    },
    health_record: [dataSchema],
  },
  { timestamps: true }
);

export default (mongoose.models.patients as mongoose.Model<PatientDocument>) ||
  mongoose.model<PatientDocument>("patients", schema);
