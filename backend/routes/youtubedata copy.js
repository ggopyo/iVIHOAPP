import express from "express";
const router = express.Router();
import Youtube from "../models/youtubes.model.js";
router.post("/", async (req, res) => {
  const newYoutube = new Youtube(req.body);
  let savedYoutube;

  try {
    savedYoutube = await newYoutube.save();
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/find/:id", async (req, res) => {
  // get one youtube
  try {
    const youtube = await Youtube.findById(req.params.id);
    res.status(200).json(youtube);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/find/core", async (req, res) => {
  // get one youtube
  try {
    const youtube = await Youtube.find({ core: { $in: [req.body.core] } });
    res.status(200).json(youtube);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/findmany/id", async (req, res) => {
  // get many youtube by id

  const youtube_array = req.body;
  try {
    const youtube = await Youtube.find({ _id: { $in: youtube_array } });
    res.status(200).json(youtube);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/findmany/core", async (req, res) => {
  // get many youtube by core

  const youtube_array = req.body;
  try {
    const youtube = await Youtube.find({ core: { $in: youtube_array } });
    res.status(200).json(youtube);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all
router.get("/find", async (req, res) => {
  const query = req.query.new;
  try {
    const youtube = await Youtube.find();
    res.status(200).json(youtube);
  } catch (err) {
    res.status(500).json(err);
  }
}); // get all

router.put("/find/:id", async (req, res) => {
  try {
    const updatedYoutube = await Youtube.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          owner: {
            profileimage: req.body.owner.profileimage,
            username: req.body.owner.username,
          },
        },
      },
      { new: true }
    );

    res.status(200).json(updatedYoutube);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/find/:id", async (req, res) => {
  try {
    const deletedYoutube = await Youtube.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedyoutube);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
