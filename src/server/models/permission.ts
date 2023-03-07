import mongoose, { type ObjectId } from "mongoose";

const { Schema, Types } = mongoose;

interface PermissionDocument {
  _id: ObjectId;
  name: string;
}
const schema = new Schema<PermissionDocument>(
  {
    _id: Types.ObjectId,
    name: String,
  },
  { timestamps: true }
);

export default (mongoose.models
  .permissions as mongoose.Model<PermissionDocument>) ||
  mongoose.model<PermissionDocument>("permissions", schema);
