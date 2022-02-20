import mongoose from "mongoose";
import Inc from "mongoose-sequence";
const AutoIncrement = Inc(mongoose);
const YoutubeSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    title: { type: String, required: true },
    identifier: { type: String, required: true },
    core: { type: String, required: true },
    logo: { type: mongoose.Schema.ObjectId, ref: "HowtoLogos" },
    desc: { type: String, required: true },

    category: { type: String, required: true },

    likes: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
    comments: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
        commentedBy: { type: mongoose.Schema.ObjectId, ref: "Users" },
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
    postidx: Number,
  },
  { timestamps: true }
);
YoutubeSchema.plugin(AutoIncrement, { inc_field: "youtube_idx" });
YoutubeSchema.index({ title: "text", desc: "text" });
export default mongoose.model("Youtube", YoutubeSchema);
