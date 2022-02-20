import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  SettingsSystemDaydreamTwoTone,
  SwapHoriz,
  SwapVert,
} from "@mui/icons-material";

import Back from "../components/MiddlePart/Back";
import LeftPost from "../components/MiddlePart/LeftPost";
import Pic from "../components/MiddlePart/Pic";
import { Edit } from "@mui/icons-material";

import {
  Avatar,
  Container,
  Box,
  Divider,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  Icon,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { dataRequest, publicRequest } from "../apiCalls/requestMethod";
import { getOneUserById, clg, cdg, afs, getOneData } from "../apiCalls/tryData";
import RightPost from "../components/MiddlePart/RightPost";

const LearnRepeat = () => {
  const location = useLocation();
  const cl = location.pathname.split("/")[1];
  const [a, seta] = useState({});
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });
  const [post, setPost] = useState([]);
  const currentUser = useSelector((state) => state.login.currentUser);

  const currentPost = useSelector((state) => state.post.currentPost);

  const clickFollowButton = (callAPI) => {
    callAPI(currentUser._id, a._id).then((data) => {
      if (data)
        setValues({ ...values, user: data, following: !values.following });
    });
  };

  const checkFollow = (data) => {
    const match = data.followers.some(
      (follower) => follower._id === currentUser._id
    );
    return match;
  };
  useEffect(() => {
    // setCurrentPost(cp);
  }, []);

  return (
    <Container sx={{ display: "flex", width: "110%" }}>
      <Box
        sx={{
          backgroundColor: "#FFFBF2",
          ml: 1,
          borderRadius: "5px",
          mt: 2,
          width: "310px",
          height: "100%",
          pb: 1,
        }}
      >
        <LeftPost post={currentPost} />
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFBF2",
          ml: 0.5,
          mr: 0.5,
          borderRadius: "5px",
          mt: 2,
          width: "600px",
          height: "100%",
          pb: 1,
        }}
      >
        <Pic />
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFBF2",

          borderRadius: "5px",
          mt: 2,
          width: "310px",
          height: "100%",
          pb: 1,

          overflow: "hidden",
        }}
      >
        <RightPost post={currentPost} />
      </Box>
    </Container>
  );
};

export default LearnRepeat;
