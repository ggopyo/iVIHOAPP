import React, { useState } from "react";
import PropTypes from "prop-types";
import FollowGrid from "./FollowGrid";
import PostList from "./PostList";
import { afs } from "../../apiCalls/tryData";
import NewPost from "./NewPost";
import ProfileImageData from "./ProfileImageData";
import { AppBar, Divider, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

export default function ProfileTabs(props) {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "23px",
      backgroundColor: "white",
      minHeight: "0px",
      color: "silver",
    },
    indicator: {
      backgroundColor: "#ffe8b3",
      font: "bold",
    },
  }));
  const classes = useStyles();
  return (
    <div
      style={{
        marginTop: "10px",
        width: "280px",
        marginRight: "5px",
        marginLeft: "5px",
        height: "325px",
      }}
    >
      <AppBar
        elevation={0}
        position="static"
        color="default"
        className={classes.root}
        style={{
          paddingBottom: "2px",
          borderBottom: "solid",
          borderTop: "solid",
          borderWidth: "0.1px",
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          classes={{
            indicator: classes.indicator,
          }}
          textColor="primary"
          variant="standard"
          className={classes.root}
          style={{ marginLeft: "10px" }}
        >
          <Tab
            className={classes.root}
            label={`Image+(${props.posts.image.length})`}
            style={{
              minWidth: "20%",
              maxWidth: "20%",
              paddingTop: "5px",
              paddingLeft: "0px",
              paddingRight: "0px",
              marginRight: "5px",
              paddingBottom: "5px",
            }}
          />{" "}
          <Divider
            orientation="vertical"
            style={{ marginTop: "2px" }}
            flexItem
          />
          <Tab
            className={classes.root}
            label={`Video+(${props.posts.youtube.length})`}
            style={{
              minWidth: "20%",
              maxWidth: "20%",
              paddingTop: "5px",
              paddingLeft: "0px",
              paddingRight: "0px",
              marginLeft: "5px",
              marginRight: "5px",
              paddingBottom: "5px",
            }}
          />{" "}
          <Divider
            orientation="vertical"
            style={{ marginTop: "2px" }}
            flexItem
          />
          <Tab
            className={classes.root}
            label={`Howto+(${props.posts.howto.length})`}
            style={{
              minWidth: "20%",
              maxWidth: "20%",
              paddingTop: "5px",
              paddingLeft: "0px",
              paddingRight: "0px",
              marginLeft: "5px",
              paddingBottom: "5px",
            }}
          />
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <div>
          <TabContainer>
            {/* {" "} */}
            {/* <ProfileImageData posts={props.posts.image} identifier="image" /> */}
            <PostList posts={props.posts.image} />
          </TabContainer>
        </div>
      )}
      {tab === 2 && (
        <div>
          <TabContainer>
            {/* <ProfileImageData */}
            {/* posts={props.posts.youtube} */}
            {/* identifier="youtube" */}
            {/* /> */}
            <PostList posts={props.posts.youtube} />
          </TabContainer>
        </div>
      )}
      {tab === 4 && (
        <div>
          <TabContainer>
            {/* <ProfileImageData posts={props.posts.howto} identifier="howto" /> */}
            <PostList posts={props.posts.howto} />
          </TabContainer>
        </div>
      )}
    </div>
  );
}


const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: "4px" }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
