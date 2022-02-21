import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

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
