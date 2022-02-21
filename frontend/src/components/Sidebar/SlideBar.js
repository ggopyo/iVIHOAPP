import React, { useEffect, useState } from "react";
import "./SlideBar.css";
import NestedList from "./NestedList";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Avatar, Button, Container, Typography } from "@mui/material";
import { Email, FindInPage, GitHub, Send } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const SlideBar = (props) => {
  return (
    <div>
      <Container
        style={{
          backgroundColor: "rgb(237, 241, 235)",
          width: "345px",
          height: "540px",
          borderRadius: "10px",
        }}
      >
        <div style={{ backgroundColor: "rgb(237, 241, 235)" }}>
          <Card sx={{ maxWidth: 345, height: 215 }}>
            <CardMedia
              component="img"
              height="100"
              image="https://cdn.pixabay.com/photo/2015/06/25/11/16/sky-821153_1280.jpg"
            />
            <div style={{ justifyContent: "center", display: "flex" }}>
              <Avatar
                style={{
                  width: "65px",
                  height: "65px",
                  marginTop: "-40px",
                }}
              />
            </div>{" "}
            <div>
              <CardContent
                style={{
                  marginTop: "-10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  align="center"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {/* {currentUser.username} */}
                </Typography>

                <Typography
                  align="center"
                  variant="body2"
                  color="text.secondary"
                  style={{ marginTop: "5px" }}
                >
                  안녕하세요 개발을 사랑하고 리액트로 취업을 원합니다
                </Typography>

                <Button
                  sx={{
                    border: "solid 0px",
                    display: "flex",
                    color: "white",
                    borderRadius: "15px",
                    padding: "3px",
                    backgroundColor: "#E95F6E",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                    marginTop: "5px",
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "skyblue",
                    },
                  }}
                  color="primary"
                >
                  <div style={{ marginRight: "2px" }}>FOLLOW</div>
                  <PersonAddAltIcon />
                </Button>
              </CardContent>
            </div>
          </Card>
          <Card sx={{ maxWidth: 345, height: 57, marginTop: "10px" }}>
            <CardContent
              style={{
                marginTop: "-10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "-5px",
                    marginTop: "5px",
                    width: "150px",
                  }}
                >
                  <GitHub />
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{ marginLeft: "5px", marginTop: "-1px" }}
                  >
                    {/* /{currentUser.username} */}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "-5px",
                    width: "190px",
                  }}
                >
                  <Email />
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{ marginLeft: "5px", marginTop: "-1px" }}
                  >
                    {/* {currentUser.email} */}
                  </Typography>
                </div>
              </div>
              <div>
                <Button
                  sx={{
                    border: "solid 1px",
                    display: "flex",
                    height: "23px",
                    color: "white",
                    width: "85px",
                    borderRadius: "15px",
                    backgroundColor: "skyblue",
                    padding: "3px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                    marginTop: "1px",
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "skyblue",
                    },
                  }}
                  color="primary"
                >
                  <div style={{ marginRight: "2px" }}>Github</div>
                  <FindInPage />
                </Button>{" "}
                <Button
                  sx={{
                    border: "solid 1px",
                    display: "flex",
                    height: "23px",
                    width: "85px",
                    color: "white",
                    borderRadius: "15px",
                    backgroundColor: "skyblue",
                    padding: "3px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                    marginTop: "1px",
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "skyblue",
                    },
                  }}
                  color="primary"
                >
                  <div style={{ marginRight: "2px" }}>Email</div>
                  <Send />
                </Button>
              </div>
            </CardContent>
          </Card>
          <NestedList />
        </div>
      </Container>
    </div>
  );
};

export default SlideBar;
