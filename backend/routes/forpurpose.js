import express from "express";
import forpurposeCtrl from "../controllers/forpurpose.controller.js";
const router = express.Router();
router.route("/get").get(forpurposeCtrl.get);
router.route("/modify/:identifier/:id").post(forpurposeCtrl.modify);
export default router;
