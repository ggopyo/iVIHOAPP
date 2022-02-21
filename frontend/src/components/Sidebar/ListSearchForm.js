import React, { useEffect, useState } from "react";
import MyList from "./MyList";
import YourList from "./YourList";

import SwapVertIcon from "@mui/icons-material/SwapVert";
import { publicRequest } from "../../apiCalls/requestMethod";
import { useCallback } from "react";
import UseMyCard from "./UseMyCard";
import UseYourCard from "./UseYourCard";
import { useSelector } from "react-redux";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  Modal,
} from "@mui/material";
import LoginForm from "../Navbar/LoginForm";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { Link } from "react-router-dom";
import { log } from "../../apiCalls/tryData";
const loginStyle = {
  position: "absolute",
  top: "-5%",
  left: "224%",
  transform: "translate(50%, 50%)",
  width: 338,
  height: 180,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};
const ListSearchForm = () => {
  const currentUser = useSelector((state) => state.login.currentUser);

  const onMyItemClick = useCallback((event, j) => {
    console.log("내 아이템 선택 : ", event.currentTarget, j);
    setMyDataItem(j);
  }, []);
  const [myDataItem, setMyDataItem] = useState();
  const [myDataIdentifier, setMyDataIdentifier] = useState("image");
  const [myUserData, setMyUserData] = useState(
    currentUser !== null ? currentUser : ""
  );
  const [myDataInfo, setMyDataInfo] = useState([]);

  const onYourItemClick = useCallback((event, j) => {
    console.log("상대방 아이템 선택 : ", event.currentTarget, j);
    setYourDataItem(j);
  }, []);
  const [yourDataItem, setYourDataItem] = useState();
  const [yourDataIdentifier, setYourDataIdentifier] = useState("image");
  const [yourUserData, setYourUserData] = useState({});
  const [yourDataInfo, setYourDataInfo] = useState([]);

  const [loginOpen, setLoginOpen] = React.useState(false);
  const loginHandleOpen = () => setLoginOpen(true);
  const loginHandleClose = () => setLoginOpen(false);

  const [yourusername, setYourusername] = useState("liggerabaft"); // 내 계정 없으면 말구

  useEffect(() => {
    const dataAsync = async (myUserData) => {
      try {
        let dataArray;

        if (myDataIdentifier === "image") dataArray = myUserData.image;
        else if (myDataIdentifier === "howto") dataArray = myUserData.howto;
        else if (myDataIdentifier === "youtube") dataArray = myUserData.youtube;

        let dataRes;
        dataRes = await publicRequest.post(
          "/" + myDataIdentifier + "/findmany/core/",
          dataArray
        );

        setMyDataInfo(dataRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    dataAsync(myUserData);
  }, [myUserData, myDataItem, myDataIdentifier]);
  useEffect(() => {
    const dataAsync = async (username) => {
      try {
        let res;
        res = await publicRequest.get("/user/username/" + username);

        if (res.data !== null) {
          setYourUserData(res.data);

          let dataArray;

          if (yourDataIdentifier === "image") dataArray = res.data.image;
          else if (yourDataIdentifier === "howto") dataArray = res.data.howto;
          else if (yourDataIdentifier === "youtube")
            dataArray = res.data.youtube;

          let dataRes;
          dataRes = await publicRequest.post(
            "/" + yourDataIdentifier + "/findmany/core/",
            dataArray
          );

          setYourDataInfo(dataRes.data);
        } else console.log("값이 null");
      } catch (err) {
        console.log(err);
      }
    };
    dataAsync(yourusername);
  }, [yourusername, yourDataItem, yourDataIdentifier]);

  const getRandomUser = async () => {
    try {
      let res;
      res = await publicRequest.get("/user/");
      if (res.data !== null) {
        let users = res.data;
        let randomUser;
        while (true) {
          let randomNumber = Math.floor(Math.random() * users.length);
          randomUser = users[randomNumber].username;
          let randomArrayLength = users[randomNumber].howto.length;
          if (randomArrayLength > 0) break;
        }
        setYourusername(randomUser);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container
      style={{ paddingLeft: "0px", paddingRight: "0px", borderRadius: "10px" }}
    >
      <div
        style={{
          backgroundColor: "#FFFBF2",
          marginTop: "50px",
          marginBottom: "30px",
          width: "100%",
          height: "50px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <Box
          sx={{
            pt: "5px",
            pl: "5px",
            pr: "5px",
            display: "flex",
            fontSize: "20px",
            color: "black",
            top: "10px",
            left: "15px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              size: "3px",
              display: "flex",
              mt: "5px",
            }}
          >
            <Avatar
              sx={{ mr: "5px", top: -5 }}
              alt={
                myUserData !== null
                  ? myUserData.username + "(" + myUserData.name + ")"
                  : ""
              }
              src={myUserData !== null ? myUserData.profileimage : ""}
            />

            <>
              <Link to={`/profile/${myUserData.username}`}>
                <Button style={{ color: "black", top: -5 }}>
                  {myUserData !== null
                    ? myUserData.username + "(" + myUserData.name + ")"
                    : ""}
                </Button>
              </Link>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={loginOpen}
                onClose={loginHandleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                style={{ width: "338px" }}
              >
                <Fade in={loginOpen}>
                  <Box sx={loginStyle}>
                    <LoginForm />
                  </Box>
                </Fade>
              </Modal>
            </>
          </Box>
          <Box sx={{ size: "3px", display: "flex", mt: "5px" }}>
            <Button
              onClick={(e) => getRandomUser()}
              style={{ size: "3px", color: "black", top: -5 }}
            >
              랜덤
              <ShuffleIcon sx={{ width: 35, height: 35 }} />
            </Button>

            <Avatar
              sx={{ mr: "5px", top: -5 }}
              alt={yourUserData.username}
              src={yourUserData.profileimage}
            />
            <Button style={{ color: "black", top: -5 }}>
              {yourUserData !== null
                ? yourUserData.username + "(" + yourUserData.name + ")"
                : ""}
            </Button>
          </Box>
        </Box>
      </div>

      <div style={{ display: "flex" }}>
        <Box
          sx={{
            backgroundColor: "white",
            ml: 1,
            borderRadius: "5px",
            width: "290px",
            height: 450,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ marginTop: "-12px" }}>
            <Button size="small" onClick={(e) => setMyDataIdentifier("image")}>
              Image
            </Button>
            <Button size="small" onClick={(e) => setMyDataIdentifier("howto")}>
              Howto
            </Button>
            <Button
              size="small"
              onClick={(e) => setMyDataIdentifier("youtube")}
            >
              Youtube
            </Button>
            <MyList onMyItemClick={onMyItemClick} myDataInfo={myDataInfo} />
          </div>
        </Box>
        <Box
          sx={{
            backgroundColor: "#FFFBF2",
            borderRadius: "5px",
            width: "570px",
            height: 450,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ margin: "auto", marginTop: "12px" }}>
            <Box
              sx={{
                margin: 0,
                width: "150px",
                height: "170px",
                overflow: "hidden",
                border: "solid",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {myDataItem >= 0 ? (
                <UseMyCard
                  myUserData={myUserData}
                  myDataOne={myDataInfo[myDataItem]}
                />
              ) : (
                <></>
              )}
            </Box>
            <Button sx={{ marginLeft: "28%" }}>
              <SwapVertIcon sx={{ width: "50px", height: "50px" }} />
            </Button>
            <Box
              sx={{
                margin: 0,
                width: "150px",
                height: "170px",
                overflow: "hidden",
                border: "solid",
              }}
            >
              {" "}
              {yourDataItem >= 0 ? (
                <UseYourCard
                  yourUserData={yourUserData}
                  yourDataOne={yourDataInfo[yourDataItem]}
                />
              ) : (
                <></>
              )}
            </Box>
          </div>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            width: "290px",
            height: 450,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <div style={{ marginTop: "-12px" }}>
            <Button
              size="small"
              onClick={(e) => setYourDataIdentifier("image")}
            >
              Image
            </Button>
            <Button
              size="small"
              onClick={(e) => setYourDataIdentifier("howto")}
            >
              Howto
            </Button>
            <Button
              size="small"
              onClick={(e) => setYourDataIdentifier("youtube")}
            >
              Youtube
            </Button>
            <YourList
              onYourItemClick={onYourItemClick}
              yourDataInfo={yourDataInfo}
            />
          </div>
        </Box>
      </div>
      <Box sx={{ display: "flex", width: "100%" }}></Box>
    </Container>
  );
};
export default ListSearchForm;
//https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
//   https://www.regextester.com/99041
