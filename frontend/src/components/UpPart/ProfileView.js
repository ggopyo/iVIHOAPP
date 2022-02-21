import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";

import { useSelector } from "react-redux";
import { getOneUserByUsername } from "../../apiCalls/general/tryData";
import First from "./First";
import Search from "./Search";
import Middle from "./Middle";
import {
  dataRequest,
  publicRequest,
} from "../../apiCalls/general/requestMethod";
import { useLocation } from "react-router-dom";
const View = (props) => {
  const {
    executeScroll,
    executeScroll2,
    myRef,
    secondRef,
    searchRef,
    tab,
    setTab,
    setSearchInputInside,
    searchInputProps,
    mySearchInputProps,
    myDataGroup,
    myProfileGroup,
  } = props;

  const { mineUpdated, myPosts, addUpdate } = myDataGroup;
  const location = useLocation();

  const [a, seta] = useState({});

  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });

  const [yourStatistic, setYourStatistic] = useState({
    dataCount: null,
    commentsCount: null,
    likesCount: null,
    swapCount: null,
  });
  // const [myPosts, setMyPosts] = useState({ howto: [], image: [], youtube: [] });
  const [yourPosts, setYourPosts] = useState({
    howto: [],
    image: [],
    youtube: [],
  });
  // const [mineUpdated, setMineUpdated] = useState(false);
  const currentUser = useSelector((state) => state.login.currentUser);
  const selectedUser = useSelector((state) => state.selectUser.selectedUser);
  const [yourUsername, setYourUsername] = useState(
    selectedUser ? selectedUser.username : "guest"
  );
  const [triggerRightProfile, setTriggerRightProfile] = useState(0);
  const [triggerRightProfileFlag, setTriggerRightProfileFlag] = useState(false);

  const clickFollowButton = (callAPI) => {
    callAPI(currentUser._id, a._id).then((data) => {
      if (data)
        setValues({ ...values, user: data, following: !values.following });
    });
  };

  const checkFollow = (others) => {
    const match = others.followers.some(
      (follower) => follower._id === currentUser._id
    );
    return match;
  };

  const lp = (id) => {
    const gethowto = async (id) => {
      try {
        const res = await dataRequest.get("/howto/find/" + id);
      } catch (err) {}
    };
    gethowto(id);
  };

  useEffect(() => {
    const getYourUsername = async (yourUsername) => {
      try {
        const res = await getOneUserByUsername(yourUsername);
        const { code, ...others } = res;
        if (others && code !== "success") {
          setValues({ ...values, redirectToSignin: true });
        } else {
          let following = checkFollow(others);
          setValues({ ...values, user: others, following: following });
          seta(others);
          lp(others._id);
          const returnedHowto = await publicRequest.get(
            "/data/howto/by/" + others._id
          );
          const returnedImage = await publicRequest.get(
            "/data/image/by/" + others._id
          );
          const returnedYoutube = await publicRequest.get(
            "/data/youtube/by/" + others._id
          );
          setYourPosts({
            youtube: [...returnedYoutube.data],
            image: [...returnedImage.data],
            howto: [...returnedHowto.data],
          });

          const tempArray = [
            ...returnedYoutube.data,
            ...returnedHowto.data,
            ...returnedImage.data,
          ];

          let dataCount = tempArray.length;
          let commentsCount = 0;
          let likesCount = 0;
          let swapsCount = 0;

          tempArray.map((item, index) => {
            commentsCount += item.comments.length;
            likesCount += item.likes.length;
          });

          setYourStatistic({
            dataCount,
            commentsCount,
            likesCount,
            swapsCount,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getYourUsername(yourUsername);
  }, [yourUsername]);

  const triggerTabObject = {
    triggerRightProfile,
    setTriggerRightProfile,
    triggerRightProfileFlag,
    setTriggerRightProfileFlag,
  };
  return (
    <Container
      style={{ marginLeft: "80px", marginRight: "0px", width: "1200px" }}
    >
      <div style={{ display: "flex" }}>
        <div
          // src="https://images.theconversation.com/institutions/1260/logos/logo-1424731486.png?ixlib=rb-1.1.0&q=45&auto=format&w=170&h=170"
          style={{
            width: "99%",
            height: "30px",
            marginTop: "0px",
            marginLeft: "10px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            marginBottom: "-16px",
            backgroundColor: "#0E5711", //#0E5711
          }}
          alt=""
        />
      </div>
      <div style={{ display: "flex" }}>
        <Box
          sx={{
            backgroundColor: "#FFFBF2",
            ml: 1,
            borderRadius: "5px",
            mt: 2,
            width: "490px",
            height: "100%",
            pb: 1,
          }}
        >
          <div style={{}}>
            <First
              myDataGroup={myDataGroup}
              executeScroll={executeScroll}
              executeScroll2={executeScroll2}
              myRef={myRef}
              secondRef={secondRef}
              searchRef={searchRef}
              tab={tab}
              setTab={setTab}
              mySearchInputProps={mySearchInputProps}
              triggerTabObject={triggerTabObject}
              myProfileGroup={myProfileGroup}
            />
          </div>
        </Box>
        <Box
          sx={{
            backgroundColor: "#FFFBF2",
            ml: 1,
            borderRadius: "5px",
            mt: 2,
            width: "490px",
            height: "100%",
            pb: 1,
          }}
        >
          <Search
            // addUpdate={addUpdate} 이거 잘 지켜봐야함
            posts={yourPosts}
            profileUser={values.user}
            mySearchInputProps={mySearchInputProps}
            setSearchInputInside={setSearchInputInside}
            searchInputProps={searchInputProps}
            triggerTabObject={triggerTabObject}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "#FFFBF2",
            ml: 1,
            borderRadius: "5px",
            mt: 2,
            width: "490px",
            height: "100%",
            pb: 1,
          }}
        >
          <Middle
            triggerTabObject={triggerTabObject}
            myProfileGroup={myProfileGroup}
            yourStatistic={yourStatistic}
          />
        </Box>{" "}
      </div>
    </Container>
  );
};

export default View;
