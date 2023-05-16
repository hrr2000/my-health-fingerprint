import mongoose from "mongoose";
import {AllowedPermissionDocument} from "@/types/mongo";

const { Schema, Types } = mongoose;

const schema = new Schema<AllowedPermissionDocument>(
  {
    entity_name: String,
    permissions: [Types.ObjectId],
  },
  { timestamps: true }
);

export default (mongoose.models
  .allowed_permissions as mongoose.Model<AllowedPermissionDocument>) ||
  mongoose.model<AllowedPermissionDocument>("allowed_permissions", schema);
