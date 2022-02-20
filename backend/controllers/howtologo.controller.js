import Howtologo from "../models/howtologo.model.js";
const create = async (req, res) => {
  let newHowtologo = new Howtologo(req.body);
  let returnedData;
  try {
    returnedData = await newHowtologo.save();
    res.status(200).json("success");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const find = async (req, res) => {
  let returnedData;
  try {
    returnedData = await Howtologo.findOne(req.body);

    if (returnedData !== null) {
      res.status(200).json({ code: "success", ...returnedData._doc });
    } else res.status(200).json({ code: "failed" });
  } catch (err) {
    res.status(500).json(err);
  }
};
const get = async (req, res) => {
  let returnedData;
  try {
    returnedData = await Howtologo.findOne(req.body);

    res.status(200).json(returnedData);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default {
  create,
  find,
  get,
};
