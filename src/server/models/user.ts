import { User } from "next-auth";
import mongoose from "mongoose";

const { Schema } = mongoose;

interface IUser extends User {
  name: string;
  password: string;
  email: string;
  emailConfirmed: Date;
  image: string;
}
const schema = new Schema<IUser>(
  {
    name: String,
    password: String,
    email: String,
    emailConfirmed: Date,
    image: String,
  },
  { timestamps: true }
);

export default (mongoose.models.Users as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("Users", schema);
