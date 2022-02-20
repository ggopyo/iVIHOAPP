import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { AppBar, Divider, Paper, Tab, Tabs } from "@mui/material";
import { Avatar, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import MyList from "./MyList";

export default function LeftTab(props) {
  const { onItemClick, handleTabChange, data, tab, userData, whichSide } =
    props;
  const [dataItem, setDataItem] = useState(0);
  const lu = useSelector((state) => state.login.currentUser);

  const [dataInfo, setDataInfo] = useState([]);
  useEffect(() => {
    if (tab === 0) setDataInfo(data.image);
    if (tab === 2) setDataInfo(data.youtube);
    if (tab === 4) setDataInfo(data.howto);
  }, [tab, data]);

  useEffect(() => {}, [dataItem]);

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
        marginTop: "5px",
        marginRight: "5px",
        marginLeft: "5px",
        overflow: "hidden",
        height: "500px",
      }}
      elevation={1}
    >
      {" "}
      <div style={{ height: "60px", overflow: "hidden" }}>
        <img
          src="https://images.theconversation.com/institutions/1260/logos/logo-1424731486.png?ixlib=rb-1.1.0&q=45&auto=format&w=170&h=170"
          style={{ width: "100%" }}
          alt=""
        />
      </div>
      <Box
        sx={{ size: "3px", display: "flex", mt: "5px", marginBottom: "-60px" }}
      >
        <Avatar
          style={{
            marginRight: "5px",
            top: "-63px",
            height: "50px",
            width: "50px",
            marginLeft: "10px",
          }}
          src={userData !== null ? userData.profileimage : lu.profileimage}
        />
      </Box>
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
            label={`Image`}
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
            label={`Video`}
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
            label={`Howto`}
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
      {tab === 0 && (
        <div>
          <TabContainer>
            <div
              style={{
                width: "258px",
                overflow: "hidden",
              }}
            >
              <MyList
                onItemClick={onItemClick}
                dataInfo={dataInfo}
                whichSide={whichSide}
              />
            </div>
          </TabContainer>
        </div>
      )}
      {tab === 2 && (
        <div>
          <TabContainer>
            <div
              style={{
                width: "258px",
                overflow: "hidden",
              }}
            >
              <MyList
                onItemClick={onItemClick}
                dataInfo={dataInfo}
                whichSide={whichSide}
              />{" "}
            </div>
          </TabContainer>
        </div>
      )}
      {tab === 4 && (
        <div>
          <TabContainer>
            {" "}
            <div
              style={{
                width: "258px",
                overflow: "hidden",
              }}
            >
              <MyList
                onItemClick={onItemClick}
                dataInfo={dataInfo}
                whichSide={whichSide}
              />{" "}
            </div>
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
