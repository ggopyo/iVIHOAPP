import React, { useState } from "react";
import { AppBar, Button, Divider, Tab, Tabs } from "@mui/material";
import SidebarSearchInputComponent from "./SidebarSearchInputComponent";
const FixedSideBar = (props) => {
  const {
    tab,
    handleTabChange,
    sidebarHandle,
    mySearchInputProps,
    setMySearchUpdated,
    firstRef,
  } = props;
  const { mySearchInputHandleSubmit, searchActivate } = mySearchInputProps;
  const [mySearchText, setMySearchText] = useState("");
  const executeScroll = () => firstRef.current.scrollIntoView();
  return (
    <div
      style={{
        backgroundColor: "black",
        padding: "10px 8px 10px 0px",
        marginTop: "0px",
        width: "95px",
        position: "fixed",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
      }}
    >
      <div
        style={{
          padding: "5px 3px 3px 0px",

          backgroundColor: "#FFFBF2",
        }}
      >
        {" "}
        <form
          onSubmit={(event) => {
            mySearchInputHandleSubmit(event, mySearchText);
            searchActivate();
            setMySearchText("");
          }}
        >
          <SidebarSearchInputComponent
            setMySearchText={setMySearchText}
            mySearchText={mySearchText}
            setMySearchUpdated={setMySearchUpdated}
          />
          <Button
            type="submit"
            style={{
              display: "none",
            }}
          />
        </form>
        <AppBar elevation={0} position="static" color="default">
          <Tabs
            orientation="vertical"
            value={tab}
            onChange={handleTabChange}
            textColor="primary"
            variant="standard"
            style={{ marginLeft: "-5px" }}
          >
            <Tab label={"자료 올리기"} />
            <Divider flexItem style={{ marginLeft: "5px" }} />
            <Tab label={"나의 프로필"} onClick={sidebarHandle} />
            <Divider flexItem style={{ marginLeft: "5px" }} />
            <Tab
              label={" 자료 탐색"}
              style={{ display: "none" }}
              onClick={() => executeScroll()}
            />
            <Divider flexItem style={{ marginLeft: "5px", display: "none" }} />
            <Tab label={"검색 모드 "} />
            <Divider flexItem style={{ marginLeft: "5px" }} />
            <Tab label={"조회 모드 "} style={{}} />
            <Divider flexItem style={{ marginLeft: "5px" }} />
            <Tab label={"SWAP "} style={{}} />
            <Divider flexItem style={{ marginLeft: "5px", display: "none" }} />
          </Tabs>
        </AppBar>
      </div>
    </div>
  );
};

export default FixedSideBar;
