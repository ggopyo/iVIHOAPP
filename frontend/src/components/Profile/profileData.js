import React, { useState } from "react";
import { dataRequest } from "./requestMethod";
const getOneData = async (id) => {
  try {
    var res = await dataRequest.get("/image/find/" + id);

    if (res.data !== null) return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { getOneData };
