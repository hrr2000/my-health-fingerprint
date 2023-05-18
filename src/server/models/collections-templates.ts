import mongoose from "mongoose";
import { type CollectionTemplateDocument } from "@/types/mongo";

const { Schema, Types } = mongoose;

const schema = new Schema<CollectionTemplateDocument>(
  {
    schema: String,
    org_id: Types.ObjectId,
    collection_id: String,
    primary: Boolean,
  },
  { timestamps: true }
);

export default (mongoose.models
  .collections_templates as mongoose.Model<CollectionTemplateDocument>) ||
  mongoose.model<CollectionTemplateDocument>("collections_templates", schema);
