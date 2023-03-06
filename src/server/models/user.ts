import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: String,
    password: String,
    email: String,
    emailConfirmed: Date,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.Users || mongoose.model("Users", schema);
