import mongoose from "mongoose";

const ForPurposeSchema = new mongoose.Schema(
  {
    newesthowto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Howto",
    },
    newestyoutube: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Youtube",
    },
    newestimage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ForPurposes", ForPurposeSchema);
