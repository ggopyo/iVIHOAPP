import express from "express";
const router = express.Router();
import Scroll from "../models/howtos.model.js";
router.post("/", async (req, res) => {
  const newScroll = new Scroll(req.body);
  let savedScroll;

  try {
    savedScroll = await newScroll.save();
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  // get one scroll
  try {
    const scroll = await Scroll.findById(req.params.id);
    res.status(200).json(scroll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/find/core", async (req, res) => {
  // get one scroll
  try {
    const scroll = await Scroll.find({ core: { $in: [req.body.core] } });
    res.status(200).json(scroll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/findmany/id", async (req, res) => {
  // get many scroll by id

  const scroll_array = req.body;
  try {
    const scroll = await Scroll.find({ _id: { $in: scroll_array } });
    res.status(200).json(scroll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/findmany/core", async (req, res) => {
  // get many scroll by core

  const scroll_array = req.body;
  try {
    const scroll = await Scroll.find({ core: { $in: scroll_array } });
    res.status(200).json(scroll);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all
router.get("/find", async (req, res) => {
  const query = req.query.new;
  try {
    const scroll = await Scroll.find();
    res.status(200).json(scroll);
  } catch (err) {
    res.status(500).json(err);
  }
}); // get all

router.put("/find/:id", async (req, res) => {
  try {
    const updatedScroll = await Scroll.findByIdAndUpdate(
      req.params.id,
      {
        $set: {},
      },
      { new: true }
    );

    res.status(200).json(updatedScroll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/find/:id", async (req, res) => {
  try {
    const updatedScroll = await Scroll.findByIdAndDelete(req.params.id);
    res.status(200).json(updatedScroll);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
