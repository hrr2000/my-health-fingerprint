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
    is_public: Boolean,
    patient_profile: Boolean,
  },
  { timestamps: true }
);

export default (mongoose.models
  .custom_collections as mongoose.Model<CustomCollectionDocument>) ||
  mongoose.model<CustomCollectionDocument>("custom_collections", schema);
