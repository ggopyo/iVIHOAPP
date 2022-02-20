import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import howtoRoute from "./routes/howtodata.js";
import howtologoRoute from "./routes/howtologo.js";
import forpurposeRoute from "./routes/forpurpose.js";
import dataRoute from "./routes/data.js";
import youtubeRoute from "./routes/youtubedata copy.js";
import imageRoute from "./routes/imagedata.js";
import scrollRoute from "./routes/scrolldata.js";
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log("DB연결 .. 성공"))
  .catch((err) => {
    console.log(err);
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/howto", howtoRoute);
app.use("/api/howtologo", howtologoRoute);
app.use("/api/forpurpose", forpurposeRoute);
app.use("/api/youtube", youtubeRoute);
app.use("/api/data", dataRoute);
app.use("/api/image", imageRoute);
app.use("/api/scroll", scrollRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("백엔드 연결.. 성공");
});
