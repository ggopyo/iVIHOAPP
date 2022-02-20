import User from "../models/user.model.js";
const create = async (req, res) => {
  let newUser = new User(req.body);
  let returnedData;
  if (newUser.password == null) newUser.password = "notRequired123$";

  try {
    returnedData = await newUser.save();

    res.status(200).json("success");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const userById = async (req, res) => {
  // get one User

  let returnedData;
  try {
    returnedData = await User.findById(req.params.userid)
      .populate("following")
      .populate("followers")
      .exec();
    console.log(returnedData);
    if (returnedData !== null) {
      const { password, ...others } = returnedData._doc;
      res.status(200).json({ code: "success", ...others });
    } else res.status(200).json({ code: "failed" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const userByUsername = async (req, res) => {
  let returnedData;
  try {
    returnedData = await User.findOne({ username: req.params.username })
      .populate("following")
      .populate("followers")
      .exec();

    if (returnedData !== null) {
      const { password, ...others } = returnedData._doc;

      res.status(200).json({ code: "success", ...others });
    } else res.status(200).json({ code: "failed" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const userByEmail = async (req, res) => {
  // get one User
  let returnedData;
  try {
    returnedData = await User.findOne({ email: req.params.email });

    if (returnedData !== null) {
      const { password, ...others } = returnedData._doc;

      res.status(200).json({ code: "success", ...others });
    } else res.status(200).json({ code: "failed" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const remove = async (req, res) => {
  try {
    const returnedData = await User.findByIdAndDelete(req.params.id);
    const { password, ...others } = returnedData._doc;
    res.status(200).json({ code: "success", ...others });
  } catch (err) {
    res.status(500).json(err);
  }
};
const setFollow = async (req, res) => {
  try {
    const returnedData = await User.findOneAndUpdate(
      { username: req.body.username },
      {
        $set: {
          following: [],
          followers: [],
        },
      },
      { new: true }
    );
    const { password, ...others } = returnedData._doc;
    res.status(200).json({ code: "success", ...others });
  } catch (err) {
    res.status(500).json(err);
  }
};

const modifyById = async (req, res) => {
  try {
    const returnedData = await User.findByIdAndUpdate(
      req.params.userid,
      {
        $set: {
          owner: req.body.dataid,
        },
      },
      { new: true }
    );
    const { password, ...others } = returnedData._doc;
    res.status(200).json({ code: "success", ...others });
  } catch (err) {
    res.status(500).json(err);
  }
};
const list = async (req, res) => {
  try {
    let returnedData = await User.find().select(
      "_id username name username email address mobilephone birthday profileimage howto youtube image followers following message updatedAt createdAt"
    );
    res.status(200).json(returnedData);
  } catch (err) {
    return res.status(400).json("error");
  }
};

const addFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userid, {
      $addToSet: { following: req.body.followid },
    });
    next();
  } catch (err) {
    return res.status(400).json("error");
  }
};
const addFollower = async (req, res) => {
  try {
    let returnedData = await User.findByIdAndUpdate(
      req.body.followid,
      {
        $addToSet: { followers: req.body.userid },
      },
      { new: true }
    )
      .populate(
        "following",
        "_id username name username email address mobilephone birthday profileimage howto youtube image followers following message updatedAt createdAt"
      )
      .populate(
        "followers",
        "_id username name username email address mobilephone birthday profileimage howto youtube image followers following message updatedAt createdAt"
      )
      .exec();
    const { password, ...others } = returnedData._doc;
    res.status(200).json({ code: "success", ...others });
  } catch (err) {
    return res.status(400).json(err);
  }
};
const removeFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userid, {
      $pull: { following: req.body.unfollowid },
    });

    next();
  } catch (err) {
    return res.status(400).json("error");
  }
};
const removeFollower = async (req, res) => {
  try {
    let returnedData = await User.findByIdAndUpdate(
      req.body.unfollowid,
      {
        $pull: { followers: req.body.userid },
      },
      { new: true }
    )
      .populate(
        "following",
        "_id username name username email address mobilephone birthday profileimage howto youtube image followers following message updatedAt createdAt"
      )
      .populate(
        "followers",
        "_id username name username email address mobilephone birthday profileimage howto youtube image followers following message updatedAt createdAt"
      )

      .exec();
    const { password, ...others } = returnedData._doc;
    res.status(200).json({ code: "success", ...others });
  } catch (err) {
    return res.status(400).json(err);
  }
};
export default {
  create,
  userByUsername,
  userById,
  userByEmail,
  setFollow,
  list,
  remove,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  modifyById,
  // findPeople,
  // update,
  // photo,
  // defaultPhoto,
};
