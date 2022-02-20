import React, { useState } from "react";
import PropTypes from "prop-types";
import FollowGrid from "./FollowGrid";
import PostList from "./PostList";
import { afs } from "../../apiCalls/tryData";
import NewPost from "./NewPost";
import { AppBar, Tab, Tabs, Typography } from "@mui/material";

export default function ProfileTabs(props) {
  return <div></div>;
}

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
