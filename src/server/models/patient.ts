import mongoose, { type ObjectId } from "mongoose";

const { Schema, Types } = mongoose;

interface ReportDocument {
  id: ObjectId;
  author: string;
  notes: string;
}

interface PatientDocument {
  _id: ObjectId;
  name: string;
  nationalId: string;
  reports: Report[];
  history?: object;
}

const reportSchema = new Schema<ReportDocument>(
  { author: String, notes: String, id: Types.ObjectId },
  { timestamps: true }
);

const schema = new Schema<PatientDocument>(
  {
    _id: Types.ObjectId,
    name: String,
    nationalId: String,
    reports: [reportSchema],
    history: Object,
  },
  { timestamps: true }
);

export default (mongoose.models.patients as mongoose.Model<PatientDocument>) ||
  mongoose.model<PatientDocument>("patients", schema);
