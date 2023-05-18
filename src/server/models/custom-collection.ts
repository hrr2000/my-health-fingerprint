import mongoose from "mongoose";
import { type CustomCollectionDocument } from "@/types/mongo";

const {
  Schema: { Types },
  Schema,
} = mongoose;

const schema = new Schema<CustomCollectionDocument>(
  {
    name: Types.String,
    is_public: Types.Boolean,
    patient_profile: Types.Boolean,
  },
  { timestamps: true }
);

export default (mongoose.models
  .customCollections as mongoose.Model<CustomCollectionDocument>) ||
  mongoose.model<CustomCollectionDocument>("CustomCollectionDocument", schema);
