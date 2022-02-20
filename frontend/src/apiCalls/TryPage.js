import { Button } from "@mui/material";
import React from "react";
import {
  afs,
  createData,
  findAll,
  getAll,
  getAllUser,
  updateOne,
  updateOneData,
  updateOneUser,
} from "./tryData";

const TryPage = () => {
  const writeRandomFollowing = () => {
    const a = async () => {
      const res = await getAll("user");
      var length = res.length;
      for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * length);

        var resUpdate = await updateOne(
          "user/username",
          res[i].username,
          "following",
          res[randomIndex].username
        );
      }
    };
    a();
  };

  const findAllData = () => {
    const invoke = async () => {
      const result = await findAll("howto");
    };
    invoke();
  };

  const create = () => {
    const result = createData();
  };

  const getUserAndModify = () => {
    const invoke = async () => {
      const result1 = await findAll("image");

      const result2 = await getAllUser();

      for (var i = 0; i < result1.length; i++) {
        var random = Math.floor(Math.random() * result2.length);

        var result3 = await updateOneData(
          "image",
          result1[i]._id,
          result2[random]._id
        );
      }
    };
    invoke();
  };

  const modifyAllOwner = () => {
    const invoke1 = async () => {
      const result1 = await findAll("howto");

      for (var i = 0; i < result1.length; i++) {
        const result2 = await updateOneData("howto", result1[i]._id);
      }
    };
    invoke1();
  };
  return (
    <div>
      <Button onClick={writeRandomFollowing}>writeRandomFollowing</Button>{" "}
      <Button onClick={findAllData}>findAllData</Button>{" "}
      <Button onClick={create}>createData</Button>{" "}
      <Button onClick={getUserAndModify}>getUserAndModify</Button>{" "}
      <Button onClick={modifyAllOwner}>modifyAllOwner</Button>
    </div>
  );
};

export default TryPage;
