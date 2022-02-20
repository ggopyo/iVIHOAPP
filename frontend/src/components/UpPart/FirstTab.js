import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import FollowGrid from "./FollowGrid";
import PostList from "./PostList";
import { afs } from "../../apiCalls/tryData";
import NewTab from "./NewTab";
import ProfileImageData from "./ProfileImageData";
import SearchTab from "./SearchTab";
import NewPostTab from "./NewPostTab";
import MiddleTab from "./MiddleTab";
import NeedLogin from "./NeedLogin";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { slide as Menu } from "react-burger-menu";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { CardActionArea, CardActions } from "@mui/material";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography,
  mySearchInputProps,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box, width } from "@mui/system";
import {
  Email,
  FindInPage,
  GetApp,
  GitHub,
  Send,
  SwapHoriz,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import SearchResultComponent from "./SearchResultComponent";
import TopDivider from "./TopDivider";
import MyDataGrid from "./MyDataGrid";

export default function ProfileTabs(props) {
  const {
    tab,
    setTab,
    mySearchInputProps,
    triggerTabObject,
    myProfileGroup,
    myDataGroup,
  } = props;

  const { mineUpdated, myPosts, values, addUpdate, myStatistic } = myDataGroup;
  const { profileUser } = values.user;
  const { myResult, myGridResult, lastHistory } = mySearchInputProps;
  const currentUser = useSelector((state) => state.login.currentUser);
  const currentPost = useSelector((state) => state.post.currentPost);

  return (
    <div
      style={{
        marginTop: "10px",
        marginLeft: "0px",
        marginRight: "10px",
        paddingLeft: "0px",
        width: "80px",
        height: "325px",
        display: "flex",
      }}
    >
      <div style={{ marginLeft: "-20px", marginTop: "-26px" }}>
        {tab === 0 && (
          <div>
            <TabContainer>
              {currentUser && currentUser.username !== "guest" ? (
                <NewPostTab addUpdate={addUpdate} />
              ) : (
                <>
                  <TopDivider title="게스트" />
                  <NeedLogin />
                </>
              )}
            </TabContainer>
          </div>
        )}
        {tab === 2 && (
          <TabContainer>
            {currentUser && currentUser.username !== "guest" ? (
              <MiddleTab
                userStatus={profileUser}
                whichSide="left"
                triggerTabObject={triggerTabObject}
                myProfileGroup={myProfileGroup}
                myStatistic={myStatistic}
              />
            ) : (
              <>
                <TopDivider title="게스트" />
                <NeedLogin />
              </>
            )}
          </TabContainer>
        )}
        {tab === 4 && (
          <TabContainer>
            {" "}
            {currentUser && currentUser.username !== "guest" ? (
              <>
                {" "}
                <TopDivider title="비어있음" />
              </>
            ) : (
              <>
                <TopDivider title="게스트" />
                <NeedLogin />
              </>
            )}
          </TabContainer>
        )}
        {tab === 6 && (
          <TabContainer>
            {" "}
            <>
              {currentUser && currentUser.username !== "guest" ? (
                <>
                  <TopDivider
                    title={`내 자료검색 결과(${myResult.length})`}
                    setTab={setTab}
                  />
                  <div
                    style={{
                      marginLeft: "5px",
                      width: "358px",
                      overflow: "hidden",
                    }}
                  >
                    <SearchResultComponent
                      result={myResult}
                      mySearchInputProps={mySearchInputProps}
                      triggerTabObject={triggerTabObject}
                    />
                  </div>
                </>
              ) : (
                <>
                  <TopDivider title="게스트" />
                  <NeedLogin />
                </>
              )}
            </>
          </TabContainer>
        )}
        {tab === 8 && (
          <TabContainer>
            {currentUser && currentUser.username !== "guest" ? (
              lastHistory === "mySearchResult" ? (
                <>
                  <TopDivider
                    title={`내 자료검색 결과(${myResult.length})`}
                    setTab={setTab}
                  />
                  <div
                    style={{
                      marginLeft: "5px",
                      width: "358px",
                      overflow: "hidden",
                    }}
                  >
                    <SearchResultComponent
                      result={myResult}
                      searchIdentifier="mySearchResult"
                      mySearchInputProps={mySearchInputProps}
                      triggerTabObject={triggerTabObject}
                    />
                  </div>
                </>
              ) : (
                <SearchTab
                  profileUser={profileUser}
                  posts={myPosts}
                  addUpdate={addUpdate}
                />
              )
            ) : (
              <>
                <TopDivider title="게스트" />
                <NeedLogin />
              </>
            )}
          </TabContainer>
        )}
        {tab === 10 && (
          <TabContainer>
            {" "}
            {currentUser && currentUser.username !== "guest" ? (
              <>
                {" "}
                <TopDivider title="비어있음" />
              </>
            ) : (
              <>
                <TopDivider title="게스트" />
                <NeedLogin />
              </>
            )}
          </TabContainer>
        )}
      </div>
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
