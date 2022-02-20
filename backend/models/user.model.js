import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    mobilephone: { type: String, required: true },
    birthday: { type: String, required: true },
    profileimage: { type: String, required: true },
    message: { type: String },
    howto: [String],
    youtube: [String],
    image: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);

export default mongoose.model("Users", UserSchema);
