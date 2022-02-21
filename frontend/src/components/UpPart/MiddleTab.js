import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostStatistics from "./PostStatistics";
import NeedSelectUser from "./NeedSelectUser";
import {
  AppBar,
  Button,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import Following from "./Following";
import Follower from "./Follower";
import UserProfile from "./UserProfile";

import { selectOff } from "../../redux/selectedUserRedux";
export default function ProfileTabs(props) {
  const {
    posts,
    whichSide,
    triggerTabObject,
    myProfileGroup,
    myStatistic,
    yourStatistic,
  } = props;
  const selectedUser = useSelector((state) => state.selectUser.selectedUser);
  const { addUpdate, clickFollowButton, values: userStatus } = myProfileGroup;
  const { triggerRightProfile, triggerRightProfileFlag } = triggerTabObject;
  const [tab, setTab] = useState(0);
  const currentUser = useSelector((state) => state.login.currentUser);
  const handleTabChange = (event, value) => {
    setTab(value);
  };
  const dispatch = useDispatch();
  const takeOutSelectedUser = () => {
    dispatch(selectOff());
  };
  useEffect(() => {
    if (whichSide === "right") {
      setTab(0);
      setTab(triggerRightProfile);
    }
  }, [triggerRightProfileFlag]);

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "23px",
      backgroundColor: "black",
      minHeight: "0px",
      color: "silver",
    },
    indicator: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#ffe8b3",
      font: "bold",
      maxWidth: 75,
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
      {" "}
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
            label={
              <Paper style={{ width: "100%", height: "30px" }}>
                프로필 보기
              </Paper>
            }
            style={{
              minWidth: "23%",
              maxWidth: "23%",
              paddingTop: "5px",
              paddingLeft: "0px",
              paddingRight: "7px",
              marginLeft: "5px",
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
              <Paper style={{ width: "100%", height: "30px" }}>통계 정보</Paper>
            }
            style={{
              minWidth: "23%",
              maxWidth: "23%",
              paddingTop: "5px",
              paddingLeft: "0px",
              paddingRight: "7px",
              marginLeft: "5px",
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
              <Paper style={{ width: "100%", height: "30px" }}>
                팔로워보기
              </Paper>
            }
            style={{
              minWidth: "23%",
              maxWidth: "23%",
              paddingTop: "5px",
              paddingLeft: "0px",
              paddingRight: "7px",
              marginLeft: "5px",
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
              <Paper style={{ width: "100%", height: "30px" }}>
                팔로잉보기
              </Paper>
            }
            style={{
              minWidth: "23%",
              maxWidth: "23%",
              paddingTop: "5px",
              paddingLeft: "0px",
              paddingRight: "7px",
              marginLeft: "5px",
              paddingBottom: "5px",
            }}
          />
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <TabContainer>
          {" "}
          {whichSide === "left" || selectedUser ? (
            <UserProfile
              whichSide={whichSide}
              userStatus={userStatus}
              clickFollowButton={clickFollowButton}
              takeOutSelectedUser={takeOutSelectedUser}
            />
          ) : (
            <NeedSelectUser />
          )}
        </TabContainer>
      )}
      {tab === 2 && (
        <TabContainer>
          {" "}
          {whichSide === "left" ? (
            <PostStatistics userData={currentUser} statistic={myStatistic} />
          ) : selectedUser ? (
            <PostStatistics userData={selectedUser} statistic={yourStatistic} />
          ) : (
            <NeedSelectUser />
          )}
        </TabContainer>
      )}
      {tab === 4 && (
        <TabContainer
          style={{ width: "104%", height: "100%", overflow: "auto" }}
        >
          {" "}
          {selectedUser ? (
            <Follower userStatus={userStatus} whichSide={whichSide} />
          ) : (
            <NeedSelectUser />
          )}
        </TabContainer>
      )}
      {tab === 6 && (
        <TabContainer
          style={{ width: "104%", height: "100%", overflow: "auto" }}
        >
          {selectedUser ? (
            <Following userStatus={userStatus} whichSide={whichSide} />
          ) : (
            <NeedSelectUser />
          )}
        </TabContainer>
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
