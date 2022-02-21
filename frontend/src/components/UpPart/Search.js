import { Divider, Paper } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import TypeAndSearch from "./TypeAndSearch";
import LoginForm from "../Navbar/LoginForm";

export default function Profile(props) {
  const {
    profileUser,
    posts,
    addUpdate,
    setSearchInputInside,
    mySearchInputProps,
    searchInputProps,
    setTab,
    triggerTabObject,
  } = props;
  const currentUser = useSelector((state) => state.login.currentUser);
  const currentPost = useSelector((state) => state.post.currentPost);
  return (
    <div style={{ width: "100%" }}>
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
        <Divider style={{ backgroundColor: "#C0C0C0", borderWidth: "0.5px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0.5px 0px 0.5px 0px",
            fontSize: "14px",
            color: "white", //#1976D2
            backgroundColor: "black",
          }}
        >
          {currentUser && currentPost ? "전체 데이터 검색" : "로그인"}
        </div>
        <Divider
          style={{
            backgroundColor: "#C0C0C0",
            borderWidth: "0.5px",
          }}
        />
        {currentUser ? (
          <TypeAndSearch
            triggerTabObject={triggerTabObject}
            setSearchInputInside={setSearchInputInside}
            searchInputProps={searchInputProps}
            mySearchInputProps={mySearchInputProps}
          />
        ) : (
          <div
            style={{
              width: "450px",
              height: "350px",
              display: "flex",
              marginLeft: "50px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoginForm />
          </div>
        )}
        {/* <BottomBar
        profileUser={profileUser.user}
        posts={posts}
        setTab={setTab}
        addUpdate={addUpdate}
        style={{ width: "300px" }}
      /> */}
      </Paper>
    </div>
  );
}
