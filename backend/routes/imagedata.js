import express from "express";
const router = express.Router();
import Image from "../models/images.model.js";
router.post("/", async (req, res) => {
  const newImage = new Image(req.body);
  let savedImage;

  try {
    savedImage = await newImage.save();
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  // get one image
  try {
    const image = await Image.findById(req.params.id);
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/find/core", async (req, res) => {
  // get one image
  try {
    const image = await Image.find({ core: { $in: [req.body.core] } });
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/findmany/id", async (req, res) => {
  // get many image by id

  const image_array = req.body;
  try {
    const image = await Image.find({ _id: { $in: image_array } });
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/findmany/core", async (req, res) => {
  // get many image by core

  const image_array = req.body;
  try {
    const image = await Image.find({ core: { $in: image_array } });
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all
router.get("/find", async (req, res) => {
  const query = req.query.new;
  try {
    const image = await Image.find();
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json(err);
  }
}); // get all

router.put("/find/:id", async (req, res) => {
  try {
    const updatedImage = await Image.findByIdAndUpdate(
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

    res.status(200).json(updatedImage);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/find/:id", async (req, res) => {
  try {
    const updatedImage = await Image.findByIdAndDelete(req.params.id);
    res.status(200).json(updatedImage);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
