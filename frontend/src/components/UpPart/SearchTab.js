import React, { useState } from "react";
import PropTypes from "prop-types";
import FollowGrid from "./FollowGrid";
import PostList from "./PostList";
import { afs } from "../../apiCalls/tryData";
import NewPost from "./NewPost";
import ProfileImageData from "./ProfileImageData";
import { AppBar, Divider, Paper, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

export default function ProfileTabs(props) {
  const { posts, addUpdate, profileUser, setTab } = props;
  const [dataTab, setDataTab] = useState(0);

  const handleTabChange = (event, value) => {
    setDataTab(value);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "23px",
      backgroundColor: "black",
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
    <Paper
      style={{
        marginTop: "10px",
        width: "365px",
        marginRight: "5px",
        marginLeft: "5px",
        overflow: "hidden",
        height: "325px",
      }}
      elevation={1}
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
          value={dataTab}
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
            label={
              <Paper style={{ width: "100%", height: "30px" }}>Image</Paper>
            }
            style={{
              minWidth: "30%",
              maxWidth: "30%",
              paddingTop: "5px",
              paddingLeft: "0px",
              paddingRight: "0px",
              marginRight: "5px",
              paddingBottom: "5px",
            }}
          />{" "}
          <Divider
            orientation="vertical"
            style={{ marginTop: "2px", border: "solid 1.4px white" }}
            flexItem
          />
          <Tab
            className={classes.root}
            label={
              <Paper style={{ width: "100%", height: "30px" }}>Video</Paper>
            }
            style={{
              minWidth: "30%",
              maxWidth: "30%",
              paddingTop: "5px",
              paddingLeft: "0px",
              paddingRight: "0px",
              marginLeft: "5px",
              marginRight: "5px",
              paddingBottom: "5px",
            }}
          />
          <Divider
            orientation="vertical"
            style={{ marginTop: "2px", border: "solid 1.4px white" }}
            flexItem
          />
          <Tab
            className={classes.root}
            label={
              <Paper style={{ width: "100%", height: "30px" }}>Howto</Paper>
            }
            style={{
              minWidth: "30%",
              maxWidth: "30%",
              paddingTop: "5px",
              paddingLeft: "0px",
              paddingRight: "0px",
              marginLeft: "5px",
              paddingBottom: "5px",
            }}
          />
        </Tabs>
      </AppBar>
      {dataTab === 0 && (
        <div>
          <TabContainer>
            {posts.image.length !== 0 ? (
              <ProfileImageData
                setTab={setTab}
                posts={posts.image}
                profileUser={profileUser}
                identifier="image"
              />
            ) : (
              ""
            )}
            {/* <PostList posts={posts.image} /> */}
          </TabContainer>
        </div>
      )}
      {dataTab === 2 && (
        <div>
          <TabContainer>
            {posts.youtube.length !== 0 ? (
              <ProfileImageData
                setTab={setTab}
                posts={posts.youtube}
                profileUser={profileUser}
                identifier="youtube"
              />
            ) : (
              ""
            )}

            {/* <PostList posts={posts.youtube} /> */}
          </TabContainer>
        </div>
      )}
      {dataTab === 4 && (
        <div>
          <TabContainer>
            {posts.howto.length !== 0 ? (
              <ProfileImageData
                setTab={setTab}
                posts={posts.howto}
                profileUser={profileUser}
                identifier="howto"
              />
            ) : (
              ""
            )}

            {/* <PostList posts={posts.howto} /> */}
          </TabContainer>
        </div>
      )}
    </Paper>
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
