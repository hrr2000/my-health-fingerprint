import mongoose from "mongoose";
import {type UserDocument, UserOrganizationSchema} from "@/types/mongo";

const { Schema, Types } = mongoose;

const userOrganizationSchema = new Schema<UserOrganizationSchema>({
  org_id: {
    type: Types.ObjectId,
    unique: true,
    index: true,
  },
  org_name: { type: String, unique: true },
  password: String,
  email: String,
  emailConfirmed: { type: Date, default: null },
  picture: String,
  jobTitle: String,
  roles: [Types.ObjectId],
});

const schema = new Schema<UserDocument>(
  {
    nationalId: {
      type: String,
      unique: true,
      index: true,
    },
    first_name: String,
    last_name: String,
    organizations: [userOrganizationSchema]
  },
  { timestamps: true }
);

export default (mongoose.models.users as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>("users", schema);
