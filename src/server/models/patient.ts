import mongoose from "mongoose";
import { type PatientDocument } from "@/types/mongo";

const { Schema } = mongoose;

const schema = new Schema<PatientDocument>(
  {
    profile: {
      date_of_birth: Schema.Types.Date,
      gender: String,
      nationaId: String,
      name: String,
      address: String,
      imageUrl: String,
      phone_number: String,
      alternative_phone_number: [String],
    },
    health_record: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export default (mongoose.models.patients as mongoose.Model<PatientDocument>) ||
  mongoose.model<PatientDocument>("patients", schema);
