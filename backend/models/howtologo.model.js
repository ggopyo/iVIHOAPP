import mongoose from "mongoose";

const HowtoLogoSchema = new mongoose.Schema(
  {
    domainname: { type: String, required: true, unique: true },
    domainimage: {
      type: String,
      required: true,
    },
    contributedby: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

export default mongoose.model("HowtoLogos", HowtoLogoSchema);
