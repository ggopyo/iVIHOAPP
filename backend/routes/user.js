import express from "express";
const router = express.Router();
import userCtrl from "../controllers/user.controller.js";
router
  .route("/")
  .get(userCtrl.list)
  .post(userCtrl.create)
  .delete(userCtrl.remove);
router.route("/userid/:userid").get(userCtrl.userById).put(userCtrl.modifyById);

router
  .route("/username/:username")
  .get(userCtrl.userByUsername)
  .put(userCtrl.setFollow);
router.route("/email/:email").get(userCtrl.userByEmail);
router.route("/follow").put(userCtrl.addFollowing, userCtrl.addFollower);
router
  .route("/unfollow")
  .put(userCtrl.removeFollowing, userCtrl.removeFollower);

router.put("/f1", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userid,
      { $push: { following: req.body.followid } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/f2", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.body.userid, {
      $pull: { following: req.body.followid },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
