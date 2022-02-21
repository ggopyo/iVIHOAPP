import {
  Cancel,
  Email,
  Face,
  FindInPage,
  GitHub,
  Message,
  PersonAddAlt,
  Send,
  Wallpaper,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { afs } from "../../apiCalls/general/tryData";
import FollowProfileButton from "./FollowProfileButton";

const UserProfile = (props) => {
  const { whichSide, clickFollowButton, userStatus, takeOutSelectedUser } =
    props;
  const selectedUser = useSelector((state) => state.selectUser.selectedUser);
  const currentUser = useSelector((state) => state.login.currentUser);
  const showUser = whichSide === "left" ? currentUser : selectedUser;

  return (
    <div>
      <ButtonBase
        onClick={takeOutSelectedUser}
        style={{
          color: "black",
          marginLeft: "300px",
          position: "absolute",
          borderRadius: "5px",
        }}
      >
        <Cancel style={{ width: "30px", height: "30px" }} />
      </ButtonBase>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: 460, height: 215 }}>
          <CardMedia
            component="img"
            height="100"
            image={
              whichSide === "left"
                ? "https://cdn.pixabay.com/photo/2015/06/25/11/16/sky-821153_1280.jpg"
                : "https://oceanfdn.org/wp-content/uploads/2010/08/SargassoSea-1.jpg"
            }
          />
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Avatar
              style={{
                width: "65px",
                height: "65px",
                marginTop: "-40px",
                borderRadius: "10px",
              }}
              src={
                whichSide === "left"
                  ? currentUser && currentUser.profileimage
                  : selectedUser.profileimage
              }
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
                {showUser ? showUser.username : ""}
              </Typography>

              <Typography
                align="center"
                variant="body2"
                color="text.secondary"
                style={{ marginTop: "5px" }}
              >
                {whichSide === "left"
                  ? currentUser && currentUser.message
                  : selectedUser.message}
              </Typography>
              {whichSide === "right" &&
                currentUser &&
                currentUser.username !== "guest" && (
                  <FollowProfileButton
                    onButtonClick={clickFollowButton}
                    userStatus={userStatus}
                  >
                    <div style={{ marginRight: "2px" }}>FOLLOW</div>
                    <PersonAddAlt />
                  </FollowProfileButton>
                )}
            </CardContent>
          </div>
        </Card>{" "}
        {whichSide === "left" ? (
          <div style={{ width: "50%", marginLeft: "5px" }}>
            <ButtonBase
              style={{
                height: "33.4%",
                width: "100%",
              }}
            >
              <Paper
                elevation={3}
                style={{
                  height: "98%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Wallpaper
                  color="primary"
                  style={{ width: "50px", height: "50px" }}
                />
                <div style={{ marginTop: "2.5px" }}>배경사진 변경</div>
              </Paper>
            </ButtonBase>
            <ButtonBase
              style={{
                height: "33.4%",
                width: "100%",
              }}
            >
              <Paper
                elevation={3}
                style={{
                  height: "98%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Face
                  color="primary"
                  style={{ width: "50px", height: "50px" }}
                />
                <div style={{ marginTop: "2.5px" }}>프로필사진 변경</div>
              </Paper>
            </ButtonBase>{" "}
            <ButtonBase
              style={{
                height: "33.4%",
                width: "100%",
              }}
            >
              <Paper
                elevation={3}
                style={{
                  height: "98%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Message
                  color="primary"
                  style={{ width: "50px", height: "50px" }}
                />
                <div style={{ marginTop: "2.5px" }}>상태메세지 변경</div>
              </Paper>
            </ButtonBase>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Card sx={{ maxWidth: 345, height: 57, marginTop: "10px" }}>
        <CardContent
          style={{
            marginTop: "-10px",
            display: "flex",
            flexDirection: "row",
            marginRight: "-13px",
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
                / {showUser ? showUser.username : ""}
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
                : {showUser ? showUser.email : ""}
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
                borderRadius: "5px",
                backgroundColor: "skyblue",
                padding: "3px",
                marginLeft: "-6px",
                paddingRight: "10px",
                paddingLeft: "10px",
                marginTop: "1px",
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "skyblue",
                },
              }}
              onClick={() =>
                window.open(
                  `http://www.github.com/${showUser.username}`,
                  "_blank"
                )
              }
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
                borderRadius: "5px",
                marginLeft: "-6px",

                backgroundColor: "skyblue",
                padding: "3px",
                paddingRight: "2px",
                paddingLeft: "10px",
                marginTop: "1px",
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "skyblue",
                },
              }}
              color="primary"
            >
              <div style={{ marginRight: "2px" }}>Email</div>
              <Send
                onClick={() => window.open(`http://www.gmail.com/`, "_blank")}
              />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
