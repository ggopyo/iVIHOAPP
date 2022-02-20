import { Edit } from "@mui/icons-material";
import {
  Avatar,
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
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import MiddleTab from "./MiddleTab";
import { dataRequest, publicRequest } from "../../apiCalls/requestMethod";

export default function Profile(props) {
  const { triggerTabObject, myProfileGroup, yourStatistic } = props;

  const [posts, setPosts] = useState({ howto: [], image: [], youtube: [] });

  return (
    <div style={{ width: "100%" }}>
      <MiddleTab
        posts={posts}
        // userid={currentUser ? currentUser._id : ""}
        whichSide="right"
        myProfileGroup={myProfileGroup}
        triggerTabObject={triggerTabObject}
        yourStatistic={yourStatistic}
        // removePostUpdate={removePost}
      />{" "}
    </div>
  );
}
