import mongoose from "mongoose";
import { type CollectionTemplateDocument } from "@/types/mongo";

const {
  Schema: { Types },
  Schema,
} = mongoose;

const schema = new Schema<CollectionTemplateDocument>(
  {
    schema: Types.String,
    org_id: Types.ObjectId,
    collection: Types.String,
    primary: Types.Boolean,
  },
  { timestamps: true }
);

export default (mongoose.models
  .templates as mongoose.Model<CollectionTemplateDocument>) ||
  mongoose.model<CollectionTemplateDocument>(
    "CollectionTemplateDocument",
    schema
  );
