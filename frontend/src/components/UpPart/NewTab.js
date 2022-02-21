import React, { useState } from "react";
import PropTypes from "prop-types";
import NewPost from "./NewPost";
import { AppBar, Tab, Tabs, Typography } from "@mui/material";

export default function ProfileTabs(props) {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  return (
    <div style={{ width: "350px" }}>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          // variant="fullwidth"
        >
          <Tab label="Image" />
          <Tab label="Youtube" />
          <Tab label="Howto" />
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <div style={{}}>
          <TabContainer>
            <NewPost addUpdate={props.addUpdate} postSort="image" />
          </TabContainer>
        </div>
      )}
      {tab === 1 && (
        <div style={{ width: "80%" }}>
          <TabContainer>
            <NewPost addUpdate={props.addUpdate} postSort="youtube" />
          </TabContainer>{" "}
        </div>
      )}
      {tab === 2 && (
        <div style={{ width: "80%" }}>
          <TabContainer>
            <NewPost addUpdate={props.addUpdate} postSort="howto" />
          </TabContainer>
        </div>
      )}
    </div>
  );
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
