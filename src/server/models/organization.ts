import mongoose, { type ObjectId } from "mongoose";

const { Schema, Types } = mongoose;

type UserRole = {
  _id: ObjectId;
  slug: string;
  permissions: ObjectId[];
};

interface OrganizationDocument {
  _id: ObjectId;
  name: string;
  roles: UserRole[];
}
const schema = new Schema<OrganizationDocument>(
  {
    _id: Types.ObjectId,
    name: String,
    roles: [
      {
        _id: Types.ObjectId,
        permissions: [Types.ObjectId],
      },
    ],
  },
  { timestamps: true }
);

export default (mongoose.models
  .organizations as mongoose.Model<OrganizationDocument>) ||
  mongoose.model<OrganizationDocument>("organizations", schema);
