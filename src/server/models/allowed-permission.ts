import mongoose, { type ObjectId, type Document } from "mongoose";

const { Schema, Types } = mongoose;

interface AllowedPermissionDocument extends Document {
  _id: ObjectId;
  entity_name: string;
  permissions: ObjectId[];
}
const schema = new Schema<AllowedPermissionDocument>(
  {
    _id: Types.ObjectId,
    entity_name: String,
    permissions: [Types.ObjectId],
  },
  { timestamps: true }
);

export default (mongoose.models
  .allowed_permissions as mongoose.Model<AllowedPermissionDocument>) ||
  mongoose.model<AllowedPermissionDocument>("allowed_permissions", schema);
