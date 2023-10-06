import mongoose from "mongoose";
import { type CustomCollectionDocument } from "@/types/mongo";

const { Schema } = mongoose;

const schema = new Schema<CustomCollectionDocument>(
  {
    name: {
      type: String,
      unique: true,
      index: true
    },
    display_name_ar: String,
    display_name_en: String,
    is_public: Boolean,
    is_patient_profile: Boolean,
    is_patient_specific: Boolean,
    description: String,
  },
  { timestamps: true }
);

export default (mongoose.models
  .custom_collections as mongoose.Model<CustomCollectionDocument>) ||
  mongoose.model<CustomCollectionDocument>("custom_collections", schema);
