import mongoose from "mongoose";
import { type PermissionDocument } from "@/types/mongo";

const { Schema } = mongoose;

const schema = new Schema<PermissionDocument>(
  {
    name: String,
  },
  { timestamps: true }
);

export default (mongoose.models
  .permissions as mongoose.Model<PermissionDocument>) ||
  mongoose.model<PermissionDocument>("permissions", schema);
