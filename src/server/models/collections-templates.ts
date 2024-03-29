import mongoose from "mongoose";
import { type CollectionTemplateDocument } from "@/types/mongo";

const { Schema, Types } = mongoose;

const schema = new Schema<CollectionTemplateDocument>(
  {
    name: {
      type: String,
      index: true
    },
    schema: String,
    collection_name: String,
    is_printable: Boolean,
    primary: Boolean,
  },
  { timestamps: true }
);

export default (mongoose.models
  .collections_templates as mongoose.Model<CollectionTemplateDocument>) ||
  mongoose.model<CollectionTemplateDocument>("collections_templates", schema);
