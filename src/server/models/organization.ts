import mongoose from "mongoose";
import { type OrganizationDocument } from "@/types/mongo";

const { Schema, Types } = mongoose;

const schema = new Schema<OrganizationDocument>(
  {
    name: String,
    roles: [
      {
        permissions: [Types.ObjectId],
      },
    ],
  },
  { timestamps: true }
);

export default (mongoose.models
  .organizations as mongoose.Model<OrganizationDocument>) ||
  mongoose.model<OrganizationDocument>("organizations", schema);
