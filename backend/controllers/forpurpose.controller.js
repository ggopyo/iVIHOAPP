import ForPurpose from "../models/forpurpose.model.js";
import mongodb from "mongodb";

const figureoutQuery = (identifier, dataid) => {
  console.log(identifier, dataid);
  switch (identifier) {
    case "image":
      return { newestimage: dataid };
    case "howto":
      return { newesthowto: dataid };
    case "youtube":
      return { newestyoutube: dataid };
    default:
      break;
  }
};

const get = async (req, res) => {
  let returnedData;
  try {
    returnedData = await ForPurpose.find()
      .populate("newesthowto")
      .populate("newestyoutube")
      .populate("newestimage")
      .exec();

    res.status(200).json(returnedData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const modify = async (req, res) => {
  const dataid = mongodb.ObjectId(req.body.dataid);

  const dataQuery = figureoutQuery(req.params.identifier, dataid);
  console.log(req.params.id);
  try {
    const returnedData = await ForPurpose.findByIdAndUpdate(
      req.params.id,
      {
        $set: dataQuery,
      },
      { new: true }
    );

    res.status(200).json(returnedData);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default {
  get,
  modify,
};
