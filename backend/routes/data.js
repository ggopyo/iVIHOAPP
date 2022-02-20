import express from "express";
const router = express.Router();
import dataCtrl from "../controllers/data.controller.js";
import forpurposeCtrl from "../controllers/forpurpose.controller.js";

router.route("/:identifier").get(dataCtrl.findAll).post(dataCtrl.create);
router.route("/search/:searchstring").get(dataCtrl.searchContents);
router.route("/search/:searchstring").post(dataCtrl.searchContentsByMe);
router
  .route("/:identifier/:id")
  .get(dataCtrl.dataById)
  .put(dataCtrl.modify)
  .delete(dataCtrl.remove);

router.route("/:identifier/idx/:idx").get(dataCtrl.dataByIdx);
router.route("/:identifier/by/:userid").get(dataCtrl.dataByUser);
router.route("/:identifier/core").post(dataCtrl.dataByCore);
router.route("/:identifier/findmany/id").post(dataCtrl.dataByManyId);
router.route("/:identifier/findmany/core").post(dataCtrl.dataByManyCore);
router.route("/:identifier/like/:postid").put(dataCtrl.like);
router.route("/:identifier/unlike/:postid").put(dataCtrl.unlike);
router.route("/:identifier/comment/:postid").put(dataCtrl.comment);
router.route("/:identifier/uncomment/:postid").put(dataCtrl.removeComment);

router.route("/:identifier/photo/:id").get(dataCtrl.photo);
export default router;
