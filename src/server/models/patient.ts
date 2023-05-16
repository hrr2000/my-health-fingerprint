import mongoose from "mongoose";
import {PatientDocument, ReportDocument} from "@/types/mongo";

const { Schema, Types } = mongoose;


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
