import { type User } from "next-auth";
import mongoose, { type ObjectId } from "mongoose";

const { Schema, Types } = mongoose;

export interface UserDocument extends User {
  nationalId: string;
  first_name: string;
  last_name: string;
  organizations: {
    org_id: ObjectId;
    org_name: string;
    picture: string;
    password: string;
    email: string;
    emailConfirmed: Date;
    jobTitle: string;
    roles: ObjectId[];
  }[];
}
const schema = new Schema<UserDocument>(
  {
    nationalId: {
      type: String,
      unique: true,
      index: true,
    },
    first_name: String,
    last_name: String,
    organizations: [
      {
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
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

export default (mongoose.models.users as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>("users", schema);
