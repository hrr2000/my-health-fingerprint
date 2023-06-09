import mongoose from "mongoose";
import { type UserRole, type OrganizationDocument } from "@/types/mongo";

const { Schema } = mongoose;

const roleSchema = new Schema<UserRole>(
  {
    name: { type: String, unique: true },
    permissions: [String],
  },
  { timestamps: true }
);

const schema = new Schema<OrganizationDocument>(
  {
    name: { type: String, unique: true },
    roles: [roleSchema],
  },
  { timestamps: true }
);

export default (mongoose.models
  .organizations as mongoose.Model<OrganizationDocument>) ||
  mongoose.model<OrganizationDocument>("organizations", schema);
