import mongoose from "mongoose";
import {PermissionDocument} from "@/types/mongo";

const { Schema, Types } = mongoose;


const schema = new Schema<PermissionDocument>(
  {
    name: String,
  },
  { timestamps: true }
);

export default (mongoose.models
  .permissions as mongoose.Model<PermissionDocument>) ||
  mongoose.model<PermissionDocument>("permissions", schema);
