import express from "express";
const router = express.Router();
import howtologoCtrl from "../controllers/howtologo.controller.js";

router.route("/find").post(howtologoCtrl.find);
router.route("/get").post(howtologoCtrl.get);
router.route("/create").post(howtologoCtrl.create);

export default router;
