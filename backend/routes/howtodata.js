import express from "express";
const router = express.Router();
import Howto from "../models/howtos.model.js";
router.post("/", async (req, res) => {
  const newHowto = new Howto(req.body);
  let savedHowto;

  try {
    savedHowto = await newHowto.save();
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  // get one howto
  try {
    const howto = await Howto.findById(req.params.id);
    res.status(200).json(howto);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/find/core", async (req, res) => {
  // get one howto
  try {
    const howto = await Howto.find({ core: { $in: [req.body.core] } });
    res.status(200).json(howto);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/findmany/id", async (req, res) => {
  // get many howto by id
  console.log(2342342342342342342 + "잡았하우투다");
  const howto_array = req.body;
  try {
    const howto = await Howto.find({ _id: { $in: howto_array } });
    res.status(200).json(howto);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/findmany/core", async (req, res) => {
  // get many howto by core

  const howto_array = req.body;
  try {
    const howto = await Howto.find({ core: { $in: howto_array } });
    res.status(200).json(howto);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all
router.get("/find", async (req, res) => {
  const query = req.query.new;
  try {
    const howto = await Howto.find();
    res.status(200).json(howto);
  } catch (err) {
    res.status(500).json(err);
  }
}); // get all

router.put("/find/:id", async (req, res) => {
  try {
    const updatedHowto = await Howto.findByIdAndUpdate(
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

    res.status(200).json(updatedHowto);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/find/:id", async (req, res) => {
  try {
    const updatedHowto = await Howto.findByIdAndDelete(req.params.id);
    res.status(200).json(updatedHowto);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
