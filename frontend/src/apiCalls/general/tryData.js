import React, { useState } from "react";

import { dataRequest, publicRequest } from "./requestMethod";

const getOneData = async (id) => {
  try {
    var res = await dataRequest.get("/data/image/" + id);

    if (res.data !== null) return res.data;
  } catch (err) {
    console.log(err);
  }
};

const findAll = async (identifier) => {
  try {
    var res = await dataRequest.get("/data/" + identifier);
    if (res.data !== null) return res.data;
  } catch (err) {
    console.log(err);
  }
};

const createData = async () => {
  try {
    const identifier = "howto";
    var res = await dataRequest.post("/data/" + identifier, {
      title: "aaa",
      identifier: "howto",
      core: "www.hog.aaa",
      desc: "그런짤입니다",
      message: "여기 좋아요",
      category: "음악/여행",
      poststatus: "thisone",
      history: "thishistory",
    });
    if (res.data !== null) return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getOneUserById = async (id) => {
  try {
    var res = await dataRequest.get("/user/userid/" + id);

    if (res.data !== null) return res.data;
  } catch (err) {
    console.log(err);
  }
};
const getOneUserByUsername = async (username) => {
  try {
    var res = await dataRequest.get("/user/username/" + username);

    if (res.data !== null) return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getOneDataByCore = async (core) => {
  try {
    var res = await dataRequest.post("/image/find/core", { core });

    if (res.data !== null) return res.data;
  } catch (err) {
    console.log(err);
  }
};

// const getAllData = async () => {
//   try {
//     var res = await dataRequest.get("/image/find/");
//     console.log(1, res);
//     if (res.data !== null) return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// }; // getAllData

const updateOneData = async (identifier, dataid, userid) => {
  try {
    var res = await dataRequest.put("/data/" + identifier + "/" + dataid, {
      userid,
    });

    if (res.data !== null) return res.data;
  } catch (err) {
    console.log(err);
  }
};

const updateOneUser = async (userid, dataid) => {
  try {
    var res = await dataRequest.put("/user/userid/" + userid, { dataid });

    if (res.data !== null) return res.data;
  } catch (err) {
    console.log(err);
  }
};
// const getAllUser = async () => {
//   try {
//     var res = await dataRequest.get("/user/find/");
//     if (res.data !== null) return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// }; // get

const emptyAllUserArray = async () => {
  try {
    let userData = await getAllUser();
    if (userData !== null) {
      for (let i = 0; i < userData.length; i++) {
        userData[i].image = [];
        userData[i].image = [];
        userData[i].image = [];
        updateOneUser(userData[i]._id, userData[i]);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
const updateUserWithData = async () => {
  try {
    var res = await dataRequest.get("/image/find/");
    if (res.data !== null) {
      let data = res.data;
      let userData = await getAllUser();

      for (let i = 0; i < data.length; i++) {
        var username = data[i].owner.username;
        var core = data[i].core;
        var userDetail = await getOneUserByUsername(username);

        var userid = userDetail._id;
        var userProfile = userDetail.profileimage;
        if (!userDetail.image.includes(core))
          userDetail.image = [...userDetail.image, core];
        await updateOneUser(userid, userDetail);
        data[i].owner.profileimage = userProfile;

        var dataId = data[i]._id;
        var { _id, ...others } = data[i];
        let result = await updateOneData(dataId, { ...others });
        console.log(result);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const getAllData = async () => {
  try {
    var res = await dataRequest.get("/image/find/");
    if (res.data !== null) {
      let imageData = res.data;
      const userData = await getAllUser();
      for (let i = 0; i < userData.length; i++) {
        let last_imageCore = userData[i].image[userData[i].image.length - 1];
        let profile_image = userData[i].profileimage;

        let ArrayDataByCore = await getOneDataByCore(last_imageCore);
        for (let k = 0; k < ArrayDataByCore.length; k++) {
          ArrayDataByCore[k].owner = {};

          console.log(ArrayDataByCore[k]);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteOneData = async (id) => {
  try {
    var res = await dataRequest.delete("/image/find/" + id);
    console.log(1, res);
  } catch (err) {
    console.log(err);
  }
};

const getAllUser = async () => {
  try {
    var res = await dataRequest.get("/user/");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getAll = async (identifier) => {
  try {
    const res = await dataRequest.get("/" + identifier + "/find/");
    if (res.data !== null) return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getRandom = async (identifier, number) => {
  try {
    const res = await dataRequest.get("/" + identifier + "/find/");
    let array = [];
    for (var i = 0; i < number; i++) {
      var randomIndex = Math.floor(Math.random() * res.data.length);
      array.push(res.data[randomIndex]);
    }
    if (res.data !== null) return array;
  } catch (err) {
    console.log(err);
  }
};

const updateOne = async (identifier, username, category, content) => {
  try {
    var res = await dataRequest.get("/" + identifier + "/" + username);
    var { code, ...others } = res.data;

    var path = category;
    var getObj = path.split(".").reduce((o, i) => o[i], others);
    //getObj.splice(0, getObj.length);
    getObj.push(content);

    const resCat = await dataRequest.put("/" + identifier + "/find/", others);

    if (res.data !== null) return resCat;
  } catch (err) {
    console.log(err);
  }
};

const createPost = async (identifier, postData) => {
  try {
    const returnedData = await dataRequest.post(
      "/data/" + identifier,
      postData
    );
    for (var pair of postData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // if (req.params.identifier == "howto") console.log(req.body);
    if (returnedData.data !== null) return returnedData.data;
  } catch (err) {
    console.log(err);
  }
};
const like = async (userid, identifier, postid) => {
  try {
    const returnedData = await dataRequest.put(
      "/data/" + identifier + "/like/" + postid,
      { userid }
    );

    if (returnedData.data !== null) return returnedData.data;
  } catch (err) {
    console.log(err);
  }
};

const unlike = async (userid, identifier, postid) => {
  try {
    const returnedData = await dataRequest.put(
      "/data/" + identifier + "/unlike/" + postid,
      { userid }
    );
    if (returnedData.data !== null) return returnedData.data;
  } catch (err) {
    console.log(err);
  }
};
const comment = async (postid, identifier, comment, userid) => {
  try {
    const returnedData = await dataRequest.put(
      "/data/" + identifier + "/comment/" + postid,
      { comment, userid }
    );

    if (returnedData.data !== null) return returnedData.data;
  } catch (err) {
    console.log(err);
  }
};

const modifyNewest = async (identifier, dataid) => {
  try {
    var res = await dataRequest.post(
      "/forpurpose/modify/" + identifier + "/61fb70dcb761a3f9ce3395a3",
      { dataid }
    );

    if (res.data !== null) return res.data;
  } catch (err) {
    console.log(err);
  }
};
const getNewest = async () => {
  try {
    var res = await dataRequest.get("/forpurpose/get");

    if (res.data !== null) return res.data[0];
  } catch (err) {
    console.log(err);
  }
};

const uncomment = async (identifier, postid, commentid) => {
  try {
    let returnedData = await dataRequest.put(
      "/data/" + identifier + "/uncomment/" + postid,
      { commentid }
    );

    if (returnedData.data !== null) return returnedData.data;
  } catch (err) {
    console.log(err);
  }
};

const afs = (log, color = "blue", append = "", fontColor = "red") => {
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  let newColor = "#";
  const randomHexArray = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  if (color === "r") {
    for (var i = 0; i < 6; i++) {
      var randomNumber = parseInt(Math.random() * 16);
      newColor += randomHexArray[randomNumber];
    }
  } else newColor = color;
  console.log(
    "%c" +
      "↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓" +
      h +
      ":" +
      m +
      ":" +
      s +
      "↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓",
    "background:" + newColor + "; color: " + fontColor
  );
  console.log(append, log);

  console.log(
    "%c" +
      "↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑" +
      h +
      ":" +
      m +
      ":" +
      s +
      "↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑",
    "background:" + newColor + "; color: " + fontColor
  );
};
export {
  updateOne,
  getOneData,
  getOneDataByCore,
  getAll,
  modifyNewest,
  getRandom,
  updateUserWithData,
  getAllData,
  updateOneData,
  deleteOneData,
  getOneUserByUsername,
  getOneUserById,
  getAllUser,
  updateOneUser,
  emptyAllUserArray,
  getNewest,
  afs,
  findAll,
  createPost,
  createData,
  like,
  unlike,
  comment,
  uncomment,
};
