import express from "express";
const router = express.Router();
import User from "../models/user.model.js";
import axios from "axios";

router.post("/kakaoLogin", async (req, res) => {
  const access_token = req.body.data.access_token;

  let userResponse;
  try {
    userResponse = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const _id = userResponse.data.id;
    const { nickname, thumbnail_image_url, profile_image_url } =
      userResponse.data.kakao_account.profile;
    const { email, birthday } = userResponse.data.kakao_account;
    const kakaoResponse = {
      username: _id,
      name: nickname,
      email,
      birthday,
      thumbnailimage: thumbnail_image_url,
      profileimage: profile_image_url,
      address: "null",
      mobilephone: "null",
      howto: [String],
      youtube: [String],
      image: [String],
    };

    res.status(200).json({ code: "success", ...kakaoResponse });
  } catch (err) {
    res.status(500).json(err);
  }
  console.info("==== userResponse.data ====");
  //console.log(userResponse);

  // const authData = {
  //   ...tokenResponse.data,
  //   ...userResponse.data
  // };
});

router.post("/register", async (req, res) => {
  let newUser = new User(req.body);
  let savedUser;
  if (newUser.password === null) newUser.password = "notRequired123$";
  console.log("newUser", newUser);
  try {
    savedUser = await newUser.save();
    console.log("saved", savedUser._id);
    // console.log(res.data);
    res.status(200).json({ code: "success", ...savedUser._doc });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
      .populate("following")
      .populate("followers")
      .exec();

    !user && res.status(401).json("잘못된 아이디입니다.");
    console.log(user);
    // const hashedPassword = CryptoJS.AES.decrypt(
    //   user.password,
    //   process.env.PASS_SEC
    // );
    // const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const OriginalPassword = user.password;

    OriginalPassword !== req.body.password &&
      res.status(401).json("잘못된 비밀번호입니다.");
    console.log(res);
    // const accessToken = jwt.sign(
    //   {
    //     id: user._id,
    //     isAdmin: user.isAdmin,
    //   },
    //   process.env.JWT_SEC,
    //   { expiresIn: "3d" }
    // );
    const { password, ...others } = user._doc;
    console.log(res.data);
    res.status(200).json({ code: "success", ...others });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
