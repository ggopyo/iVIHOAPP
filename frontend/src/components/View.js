import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  SwapHoriz,
  SwapVert,
} from "@mui/icons-material";
import { dataRequest, publicRequest } from "../apiCalls/requestMethod";

import { useSelector } from "react-redux";
import { afs, getOneUserByUsername } from "../apiCalls/tryData";
import Profile from "./Profile/Profile";
const View = () => {
 

  return (
    <Container sx={{ display: "flex" }}>
      <Box
        sx={{
          backgroundColor: "gray",
          ml: 1,
          mt: 3,
          width: "490px",
          height: 340,
        }}
      ></Box>
      <Box
        sx={{
          backgroundColor: "white",

          mt: 3,
          width: "386px",
          height: 340,
        }}
      >
        {" "}
        <Profile />
      </Box>
      <Box
        sx={{
          backgroundColor: "silver",
          mt: 3,
          width: "160px",
          height: 340,
        }}
      ></Box>{" "}
      <Box
        sx={{
          backgroundColor: "white",
          mr: 1,
          mt: 3,
          width: "160px",
          height: 340,
        }}
      ></Box>
    </Container>
  );
};

export default View;
