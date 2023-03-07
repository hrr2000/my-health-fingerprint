import { type User } from "next-auth";
import mongoose, { type ObjectId } from "mongoose";

const { Schema, Types } = mongoose;

export interface UserDocument extends User {
  nationalId: string;
  name: string;
  password: string;
  email: string;
  emailConfirmed: Date;
  image: string;
  organizations: {
    _id: ObjectId;
    roles: ObjectId[];
  }[];
}
const schema = new Schema<UserDocument>(
  {
    name: String,
    password: String,
    email: String,
    emailConfirmed: { type: Date, default: null },
    image: String,
    organizations: [
      {
        _id: Types.ObjectId,
        roles: [Types.ObjectId],
      },
    ],
  },
  { timestamps: true }
);

export default (mongoose.models.users as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>("users", schema);
