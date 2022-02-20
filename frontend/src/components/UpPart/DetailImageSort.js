import { Typography } from "@mui/material";
import React from "react";
import NewPost from "./NewPost";
import PropTypes from "prop-types";

const DetailImageSort = (props) => {
  let { postSort, addUpdate } = props;
  return (
    <div>
      <TabContainer>
        <NewPost postSort={postSort} addUpdate={addUpdate} />
      </TabContainer>
    </div>
  );
};
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

export default DetailImageSort;
