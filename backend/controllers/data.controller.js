import mongodb from "mongodb";
import formidable from "formidable";
import fs from "fs";
import multer from "multer";
import Howto from "../models/howtos.model.js";
import Youtube from "../models/youtubes.model.js";
import Image from "../models/images.model.js";
const figureoutData = (identifier, ifnew = false, content = null) => {
  switch (identifier) {
    case "image":
      return ifnew ? new Image(content) : Image;
    case "howto":
      return ifnew ? new Howto(content) : Howto;
    case "youtube":
      return ifnew ? new Youtube(content) : Youtube;
    default:
      break;
  }
};

const photo = async (req, res, next) => {
  const dataSchema = figureoutData(req.params.identifier);
  try {
    const returnedData = await dataSchema.findById(req.params.id);
    let buf = returnedData.core.data.file;
    let base =
      "data:" +
      returnedData.core.contentType +
      ";base64," +
      buf.toString("base64");

    res.status(200).json(base);
  } catch (err) {
    res.status(500).json(err);
  }
};
const create = async (req, res) => {
  const imageUploadPath =
    "C:/coding/nodeEx/reactonce/backend/public/uploaded/image";
  if (req.params.identifier == "howto") {
    const logoid = mongodb.ObjectId(req.body.logo);
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imageUploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`);
    },
  });

  const imageUpload = multer({ storage: storage });

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
    }
    let dataSchema = figureoutData(req.params.identifier, true, fields);

    if (files.photo) {
      dataSchema.core.contentType = files.photo.mimetype;
      dataSchema.core.data.file = fs.readFileSync(files.photo.filepath);
    }
    try {
      const returnedData = await dataSchema.save();

      res.status(200).json(returnedData);
    } catch (err) {
      console.log(1 + err);
    }
  });
};
const dataById = async (req, res) => {
  //차차 해결하자

  const dataSchema = figureoutData(req.params.identifier);
  try {
    const returnedData = await dataSchema.findById(req.params.id);

    res.status(200).json(returnedData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const dataByIdx = async (req, res) => {
  const dataSchema = figureoutData(req.params.identifier);
  let query;
  const idx =
    req.query.idx && /^\d+$/.test(req.query.idx) ? Number(req.query.idx) : 0;
  if (req.params.identifier == "image") query = { image_idx: idx };
  else if (req.params.identifier == "howto") query = { howto_idx: idx };
  else if (req.params.identifier == "youtube") query = { youtube_idx: idx };

  try {
    const returnedData = await dataSchema
      .find({ category: { $ne: "starter" } }, undefined, { idx, limit: 5 })
      .populate("owner")
      .populate("logo")
      .populate("comments.commentedBy")
      .sort("-createdAt")
      .exec();

    res.status(200).json(returnedData);
  } catch (err) {
    res.status(500).json(err);
  }
};
const dataByCore = async (req, res) => {
  const dataSchema = figureoutData(req.params.identifier);

  try {
    const returnedData = await dataSchema.find({
      core: { $in: [req.body.core] },
    });
    res.status(200).json(returnedData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const dataByManyId = async (req, res) => {
  const dataSchema = figureoutData(req.params.identifier);

  const search_array = req.body; //array

  try {
    const returnedData = await dataSchema.find({ _id: { $in: search_array } });

    res.status(200).json(returnedData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const like = async (req, res) => {
  const dataSchema = figureoutData(req.params.identifier);

  const userid = mongodb.ObjectId(req.body.userid);
  //   const userid = mongoose.Types.ObjectId(req.body.userid);
  // console.log(userid);
  try {
    let returnedData = await dataSchema.findByIdAndUpdate(
      req.params.postid,
      { $push: { likes: userid } },
      { new: true }
    );
    res.status(200).json(returnedData);
  } catch (err) {
    console.log(err);
  }
};

const unlike = async (req, res) => {
  const dataSchema = figureoutData(req.params.identifier);
  const userid = mongodb.ObjectId(req.body.userid);
  //   const userid = mongoose.Types.ObjectId(req.body.userid);
  try {
    let returnedData = await dataSchema.findByIdAndUpdate(
      req.params.postid,
      { $pull: { likes: userid } },
      { new: true }
    );
    res.status(200).json(returnedData);
  } catch (err) {
    console.log(err);
  }
};

const comment = async (req, res) => {
  const dataSchema = figureoutData(req.params.identifier);
  let comment = req.body.comment;
  comment.commentedBy = req.body.userid;
  try {
    let returnedData = await dataSchema
      .findByIdAndUpdate(
        req.params.postid,
        { $push: { comments: comment } },
        { new: true }
      )
      .populate("comments.commentedBy")
      .exec();

    res.status(200).json(returnedData);
  } catch (err) {
    console.log(err);
  }
};
const removeComment = async (req, res) => {
  const dataSchema = figureoutData(req.params.identifier);
  let commentid = req.body.commentid;
  console.log(commentid);
  try {
    let returnedData = await dataSchema
      .findByIdAndUpdate(
        req.params.postid,
        {
          $pull: { comments: { _id: commentid } },
        },
        { new: true }
      )
      .populate("comments.commentedBy")
      .exec();
    console.log(returnedData);
    res.status(200).json(returnedData);
  } catch (err) {
    console.log(err);
  }
};
const dataByManyCore = async (req, res) => {
  // get many youtube by core
  const dataSchema = figureoutData(req.params.identifier);

  const search_array = req.body;
  try {
    const returnedData = await dataSchema.find({ core: { $in: search_array } });
    res.status(200).json(returnedData);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all
const findAll = async (req, res) => {
  const dataSchema = figureoutData(req.params.identifier);

  try {
    const returnedData = await dataSchema
      .find()
      .populate("owner")
      .populate("logo")
      .exec();

    res.status(200).json(returnedData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const modify = async (req, res) => {
  const dataSchema = figureoutData(req.params.identifier);

  try {
    const returnedData = await dataSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          owner: req.body.userid,
        },
      },
      { new: true }
    );

    res.status(200).json(returnedData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const remove = async (req, res) => {
  const dataSchema = figureoutData(req.params.identifier);

  try {
    const returnedData = await dataSchema.findByIdAndDelete(req.params.id);
    res.status(200).json(returnedData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const dataByUser = async (req, res) => {
  const dataSchema = figureoutData(req.params.identifier);
  const userid = mongodb.ObjectId(req.params.userid);

  try {
    let returnedData = await dataSchema
      .find({ owner: req.params.userid })
      .populate("owner")
      .populate("logo")
      .populate("comments.commentedBy")
      .sort("-createdAt")
      .exec();

    let newArray = [];
    if (req.params.identifier == "image") {
      returnedData.map((i) => {
        if (i.core.eitherType == "file") {
          let buf = i.core.data.file;
          let base =
            "data:" + i.core.contentType + ";base64," + buf.toString("base64");
          const temp = i._doc;
          newArray.push({ ...temp, image: base });
        } else if (i.core.eitherType == "link") {
          const temp = i._doc;
          i.core.data.link == "undefined"
            ? newArray.push({
                ...temp,
                image:
                  "https://v1.padlet.pics/1/image.webp?t=c_thumb%2Cdpr_2%2Cg_auto%2Ch_96%2Cw_96&url=https%3A%2F%2Fpadletuploads.blob.core.windows.net%2Fprod%2F338313757%2Fxv9cNVhJOnCldshv-zjMjA%2Ff41906143bc5eb004cac88418b2a97a7.jpeg",
              })
            : newArray.push({ ...temp, image: i.core.data.link });
        }
      });

      res.status(200).json(newArray);
    } else if (req.params.identifier == "howto") {
      // returnedData.map((i) => {
      //   let howtoCore = i.core;
      //   let hostname = new URL(howtoCore).hostname;

      //   let logoReturnedData = HowtoLogo.findOne({
      //     domainname: hostname,
      //   });

      //   let temp = i._doc;

      //   newArray.push({ ...temp, image: logoReturnedData.domainimage });
      // });

      res.status(200).json(returnedData);
    } else if (req.params.identifier == "youtube") {
      res.status(200).json(returnedData);
    }
  } catch (err) {
    console.log(err);
  }
};

const searchContents = async (req, res) => {
  console.log(req.params.searchstring);
  let returnedObject = {};
  try {
    const returnedYoutubeData = await Youtube.find({
      title: {
        $regex: new RegExp(`${req.params.searchstring}`),
        $options: "i",
      },
    })
      .populate("owner")
      .populate("comments.commentedBy")
      .exec();
    // {num: {$regex: /1234|5678/, $options: 'i'}}
    returnedObject = { ...returnedObject, returnedYoutubeData };
    const returnedHowtoData = await Howto.find({
      title: {
        $regex: new RegExp(`${req.params.searchstring}`),
        $options: "i",
      },
    })
      .populate("owner")
      .populate("comments.commentedBy")
      .populate("logo")
      .exec();
    returnedObject = { ...returnedObject, returnedHowtoData };

    const returnedImageData = await Image.find({
      title: {
        $regex: new RegExp(`${req.params.searchstring}`),
        $options: "i",
      },
    })
      .populate("owner")
      .populate("comments.commentedBy")
      .exec();
    returnedObject = { ...returnedObject, returnedImageData };

    res.status(200).json(returnedObject);
  } catch (err) {
    console.log(err);
  }
};

const searchContentsByMe = async (req, res) => {
  console.log(req.params.searchstring);
  const userid = req.body.userid;
  console.log(userid);
  let returnedObject = {};
  try {
    const returnedYoutubeData = await Youtube.find({
      title: {
        $regex: new RegExp(`${req.params.searchstring}`),
        $options: "i",
      },
      owner: mongodb.ObjectId(userid),
    })
      .populate("owner")
      .populate("comments.commentedBy")
      .exec();
    // {num: {$regex: /1234|5678/, $options: 'i'}}
    returnedObject = { ...returnedObject, returnedYoutubeData };
    const returnedHowtoData = await Howto.find({
      title: {
        $regex: new RegExp(`${req.params.searchstring}`),
        $options: "i",
      },
      owner: mongodb.ObjectId(userid),
    })
      .populate("owner")
      .populate("comments.commentedBy")
      .populate("logo")
      .exec();
    returnedObject = { ...returnedObject, returnedHowtoData };

    const returnedImageData = await Image.find({
      title: {
        $regex: new RegExp(`${req.params.searchstring}`),
        $options: "i",
      },
      owner: mongodb.ObjectId(userid),
    })
      .populate("owner")
      .populate("comments.commentedBy")
      .exec();
    returnedObject = { ...returnedObject, returnedImageData };

    res.status(200).json(returnedObject);
  } catch (err) {
    console.log(err);
  }
};
export default {
  searchContents,
  searchContentsByMe,
  create,
  dataById,
  dataByCore,
  dataByManyId,
  dataByManyCore,
  dataByIdx,
  dataByUser,
  findAll,
  modify,
  remove,
  like,
  unlike,
  photo,
  comment,
  removeComment,
};
