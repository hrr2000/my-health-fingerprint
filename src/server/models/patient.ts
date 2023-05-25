import mongoose from "mongoose";
import { type PatientDocument } from "@/types/mongo";

const { Schema } = mongoose;

const subSchema = new Schema({
  collection_name: { type: String, required: true, unique: true },
  data: [],
});

const schema = new Schema<PatientDocument>(
  {
    profile: {
      date_of_birth: Schema.Types.Date,
      gender: String,
      nationalId: String,
      name: String,
      address: String,
      imageUrl: String,
      phone_number: String,
      alternative_phone_number: [String],
    },
    health_record: [subSchema],
  },
  { timestamps: true }
);

export default (mongoose.models.patients as mongoose.Model<PatientDocument>) ||
  mongoose.model<PatientDocument>("patients", schema);
