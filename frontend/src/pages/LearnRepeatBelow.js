import React, { useEffect, useState } from "react";

import { publicRequest } from "../apiCalls/general/requestMethod";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getOneUserByUsername } from "../apiCalls/general/tryData";

import LeftTab from "../components/BelowPart/LeftTab";
import PicDouble from "../components/BelowPart/PicDouble";

const LearnRepeatBelow = () => {
  const onMyItemClick = useCallback((event, j) => {
    console.log("내 아이템 선택 : ", event.currentTarget, j);
    setMyDataItem(j);
  }, []);
  const [myDataItem, setMyDataItem] = useState();

  const onYourItemClick = useCallback((event, j) => {
    console.log("상대방 아이템 선택 : ", event.currentTarget, j);
    setYourDataItem(j);
  }, []);
  const [yourDataItem, setYourDataItem] = useState();
  const [yourPosts, setYourPosts] = useState({
    howto: [],
    image: [],
    youtube: [],
  });
  const [myPosts, setMyPosts] = useState({
    howto: [],
    image: [],
    youtube: [],
  });
  const lu = useSelector((state) => state.login.currentUser);
  const location = useLocation();
  const cl = location.pathname.split("/")[1];
  const selectedUser = useSelector((state) => state.selectUser.selectedUser);
  const [userData, setUserData] = useState({});
  const [yourTab, setYourTab] = useState(0);

  const yourHandleTabChange = useCallback((event, value) => {
    setYourTab(value);
  });
  const [myTab, setMyTab] = useState(0);
  const myHandleTabChange = useCallback((event, value) => {
    setMyTab(value);
  });

  useEffect(() => {}, [myDataItem, yourDataItem, yourPosts]);
  useEffect(() => {
    const getcl = async (username) => {
      try {
        const res = await getOneUserByUsername(username);

        const returnedHowto = await publicRequest.get(
          "/data/howto/by/" + res._id
        );
        const returnedImage = await publicRequest.get(
          "/data/image/by/" + res._id
        );
        const returnedYoutube = await publicRequest.get(
          "/data/youtube/by/" + res._id
        );

        setMyPosts({
          image: [...returnedImage.data],
          youtube: [...returnedYoutube.data],
          howto: [...returnedHowto.data],
        });
      } catch (err) {
        console.log(err);
      }
    };

    getcl(lu.username);
  }, [lu, myTab]);

  useEffect(() => {
    const getcl = async (username) => {
      try {
        const res = await getOneUserByUsername(username);

        setUserData(res);
        const returnedHowto = await publicRequest.get(
          "/data/howto/by/" + res._id
        );
        const returnedImage = await publicRequest.get(
          "/data/image/by/" + res._id
        );

        const returnedYoutube = await publicRequest.get(
          "/data/youtube/by/" + res._id
        );

        setYourPosts({
          image: [...returnedImage.data],
          youtube: [...returnedYoutube.data],
          howto: [...returnedHowto.data],
        });
      } catch (err) {
        console.log(err);
      }
    };
    getcl(selectedUser.username);
  }, [selectedUser]);

  return (
    <Container sx={{ display: "flex", width: "1191px" }}>
      <Box
        sx={{
          backgroundColor: "#FFFBF2",

          borderRadius: "5px",
          mt: 2,
          width: "290px",
          height: "100%",
          pb: 1,
        }}
      >
        <LeftTab
          onItemClick={onMyItemClick}
          userData={null}
          handleTabChange={myHandleTabChange}
          data={myPosts}
          tab={myTab}
          whichSide="left"
        />
      </Box>
      <div>
        <Box
          sx={{
            backgroundColor: "#FFFBF2",
            ml: -0.2,
            mr: 0.5,
            borderRadius: "5px",
            mt: 2,
            width: "565px",
            height: "48%",
            pt: 0.1,
            pb: 0.1,
          }}
        >
          <PicDouble dataItem={myDataItem} whichSide="left" />
        </Box>
        <Box
          sx={{
            backgroundColor: "#FFFBF2",
            ml: 0.5,
            mr: -0.2,
            borderRadius: "5px",
            mt: 0.5,
            width: "565px",
            height: "48%",
            pt: 0.1,
            pb: 0.1,
          }}
        >
          <PicDouble dataItem={yourDataItem} whichSide="right" />
        </Box>
      </div>
      <Box
        sx={{
          backgroundColor: "#FFFBF2",

          borderRadius: "5px",
          mt: 2,
          width: "290px",
          height: "100%",
          pb: 1,

          overflow: "hidden",
        }}
      >
        {" "}
        <LeftTab
          onItemClick={onYourItemClick}
          handleTabChange={yourHandleTabChange}
          data={yourPosts}
          tab={yourTab}
          userData={userData ? userData : null}
          whichSide="right"
        />
      </Box>
    </Container>
  );
};

export default LearnRepeatBelow;
