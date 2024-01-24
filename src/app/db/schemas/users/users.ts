import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
      },
  { versionKey: false, timestamps: false }
);

export default mongoose.models["user"]
  ? mongoose.model<IUser>("user")
  : mongoose.model<IUser>("user", userSchema);
