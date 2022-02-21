import React, { useEffect, useRef, useState } from "react";
import MuiNavbar from "../components/Navbar/MuiNavbar";
import ProfileView from "../components/UpPart/ProfileView";
import ModifyPage from "../components/UpPart/ModifyPage";
import FixedSideBar from "../components/UpPart/FixedSideBar";
import { useSelector } from "react-redux";
import { dataRequest, publicRequest } from "../apiCalls/general/requestMethod";
import { Container } from "@mui/material";
import { searchRegex } from "../regex/regex";
import { getCurrentUser, searchAllContents, searchContents } from "../homeApis";

const Home = () => {
  const [tab, setTab] = useState(0);

  const currentUser = useSelector((state) => state.login.currentUser);

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const searchActivate = () => {
    setTab(6);
    setMySearchUpdated(!mySearchUpdated);
  };
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuIsOpen = () => {
    setMenuOpen(!isMenuOpen);
  };
  const [searchInputInside, setSearchInputInside] = useState(true);

  const [result, setResult] = useState([]);
  const [lastHistory, setLastHistory] = useState();
  const [myResult, setMyResult] = useState([]);
  const [myGridResult, setMyGridResult] = useState({});
  const [searchUpdated, setSearchUpdated] = useState(false);
  const [mySearchUpdated, setMySearchUpdated] = useState(false);
  const [refs, setRefs] = useState([]);
  const firstRef = useRef(null);

  const [mineUpdated, setMineUpdated] = useState(false);
  const [myPosts, setMyPosts] = useState({ howto: [], image: [], youtube: [] });
  const [myStatistic, setMyStatistic] = useState({
    dataCount: null,
    commentsCount: null,
    likesCount: null,
    swapCount: null,
  });
  const [updated, setUpdated] = useState(false);
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });

  const selectedUser = useSelector((state) => state.selectUser.selectedUser);
  const clickFollowButton = (callAPI) => {
    callAPI(currentUser._id, selectedUser._id).then((data) => {
      if (data)
        setValues({
          ...values,
          user: { following: data.following, followers: data.followers },
          following: !values.following,
        });
    });
  };

  const checkFollow = (others) => {
    const match = others.followers.some(
      (follower) => follower._id === currentUser._id
    );
    return match;
  };

  const addUpdate = (post, identifier) => {
    let updatedArray;
    switch (identifier) {
      case "image":
        updatedArray = [...myPosts.image];
        updatedArray.unshift(post);
        let { image, ...otherImage } = myPosts;
        setMyPosts({ ...otherImage, image: updatedArray });
        break;
      case "youtube":
        updatedArray = [...myPosts.youtube];
        updatedArray.unshift(post);
        let { youtube, ...otherYoutube } = myPosts;
        setMyPosts({ ...otherYoutube, youtube: updatedArray });
        break;
      case "howto":
        updatedArray = [...myPosts.howto];
        updatedArray.unshift(post);
        let { howto, ...otherHowto } = myPosts;
        setMyPosts({ ...otherHowto, howto: updatedArray });
        break;
      default:
        break;
    }
    setMineUpdated(!mineUpdated);
  };
  const removePost = (post) => {
    const updatedMyPosts = myPosts;
    const index = updatedMyPosts.indexOf(post);
    updatedMyPosts.splice(index, 1);
    setMyPosts(updatedMyPosts);
  };

  useEffect(() => {
    getCurrentUser(currentUser)
      .then(([myPosts, tempStatistic, newArray, tempArray]) => {
        setMyPosts(myPosts);
        setMyStatistic(tempStatistic);
        setMyGridResult({ newArray, tempArray });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [mineUpdated, currentUser]);

  const mySearchInputHandleSubmit = (event, mySearchText) => {
    event.preventDefault();
    event.target.reset();
    setMySearchUpdated(true);

    if (mySearchText.match(searchRegex))
      searchContents(mySearchText, currentUser)
        .then(([newArray, tempArray]) => {
          setMyGridResult({ newArray, tempArray });
          setMyResult(tempArray);
          setMySearchUpdated(true);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const searchInputHandleSubmit = (event, searchText) => {
    event.preventDefault();
    event.target.reset();
    setSearchUpdated(true);
    if (searchText.match(searchRegex))
      searchAllContents(searchText)
        .then((tempArray) => {
          setResult(tempArray);
          setSearchInputInside(false);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const myProfileGroup = { addUpdate, clickFollowButton, values };
  const myDataGroup = { mineUpdated, myPosts, values, addUpdate, myStatistic };
  const searchInputProps = {
    searchInputHandleSubmit,
    result,
    searchUpdated,
    setSearchUpdated,
    setTab,
  };
  const mySearchInputProps = {
    setLastHistory,
    lastHistory,
    mySearchInputHandleSubmit,
    myResult,
    mySearchUpdated,
    setMySearchUpdated,
    searchActivate,
    myGridResult,
    setTab,
  };

  return (
    <div style={{ width: "1260px", overflow: "hidden" }}>
      <MuiNavbar
        style={{ width: "100%" }}
        searchInputInside={searchInputInside}
        searchInputProps={searchInputProps}
      />

      <div style={{ paddingTop: "64px" }}>
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
          <FixedSideBar
            handleTabChange={handleTabChange}
            tab={tab}
            firstRef={firstRef}
            sidebarHandle={menuIsOpen}
            mySearchInputProps={mySearchInputProps}
          />
        </div>
        <ProfileView
          myProfileGroup={myProfileGroup}
          myDataGroup={myDataGroup}
          tab={tab}
          setTab={setTab}
          setSearchInputInside={setSearchInputInside}
          searchInputProps={searchInputProps}
          mySearchInputProps={mySearchInputProps}
        />
        <div ref={firstRef} style={{ marginBottom: "0px" }} />
        <ModifyPage
          tab={tab}
          setTab={setTab}
          setRefs={setRefs}
          myGridResult={myGridResult}
          mySearchInputProps={mySearchInputProps}
        />
      </div>
      <Container
        style={{ marginLeft: "80px", marginRight: "0px", width: "1200px" }}
      >
        <div
          style={{
            width: "99%",
            height: "30px",
            marginTop: "0px",
            marginLeft: "10px",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            marginBottom: "435px",
            backgroundColor: "#0E5711",
          }}
          alt=""
        />{" "}
      </Container>
    </div>
  );
};

export default Home;
