import mongoose, { type ObjectId } from "mongoose";

const { Schema, Types } = mongoose;

interface ReportDocument {
  author: string;
  notes: string;
}

interface PatientDocument {
  name: string;
  nationalId: string;
  reports: ReportDocument[];
  history?: object;
}

const reportSchema = new Schema<ReportDocument>(
  { author: String, notes: String },
  { timestamps: true }
);

const schema = new Schema<PatientDocument>(
  {
    name: String,
    nationalId: String,
    reports: [reportSchema],
    history: Object,
  },
  { timestamps: true }
);

export default (mongoose.models.patients as mongoose.Model<PatientDocument>) ||
  mongoose.model<PatientDocument>("patients", schema);
