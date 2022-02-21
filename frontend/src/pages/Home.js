import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import ProfileViewPage from "../components/UpPart/ProfileViewPage";
import ModifyPage from "../components/UpPart/ModifyPage";
import FixedSideBar from "../components/UpPart/FixedSideBar";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import { searchRegex } from "../regex/regex";
import styled from "styled-components";
import BottomMargin from "./BottomMargin";
import {
  getCurrentUser,
  searchAllContents,
  searchContents,
  updateArray,
} from "../homeApis";
import { afs } from "../apiCalls/general/tryData";

const Home = () => {
  const currentUser = useSelector((state) => state.login.currentUser);
  const selectedUser = useSelector((state) => state.selectUser.selectedUser);
  const [tab, setTab] = useState(0);
  const firstRef = useRef(null);

  const [mineUpdated, setMineUpdated] = useState(false);
  const [myStatistic, setMyStatistic] = useState({
    dataCount: null,
    commentsCount: null,
    likesCount: null,
    swapCount: null,
  });
  const [lastHistory, setLastHistory] = useState();
  const [myResult, setMyResult] = useState([]);
  const [myGridResult, setMyGridResult] = useState({});
  const [mySearchUpdated, setMySearchUpdated] = useState(false);
  const [searchUpdated, setSearchUpdated] = useState(false);
  const [result, setResult] = useState([]);
  const [searchInputInside, setSearchInputInside] = useState(true);
  const [refs, setRefs] = useState([]);
  const [myPosts, setMyPosts] = useState({ howto: [], image: [], youtube: [] });
  const [updated, setUpdated] = useState(false);
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });
  const searchActivate = () => {
    setTab(6);
    setMySearchUpdated(!mySearchUpdated);
  };
  const handleTabChange = (event, value) => {
    setTab(value);
  };
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
    afs(post);
    setMyPosts(updateArray(myPosts, post, identifier));
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

    if (searchText.match(searchRegex))
      searchAllContents(searchText)
        .then((tempArray) => {
          setResult(tempArray);
          setSearchInputInside(false);
          setSearchUpdated(true);
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

  const HomeContainer = styled.div`
    width: 1260px;
    overflow: "hidden";
  `;
  return (
    <HomeContainer>
      <Navbar
        searchInputInside={searchInputInside}
        searchInputProps={searchInputProps}
      />
      <FixedSideBar
        tab={tab}
        firstRef={firstRef}
        handleTabChange={handleTabChange}
        mySearchInputProps={mySearchInputProps}
      />
      <ProfileViewPage
        tab={tab}
        setTab={setTab}
        myProfileGroup={myProfileGroup}
        myDataGroup={myDataGroup}
        mySearchInputProps={mySearchInputProps}
        setSearchInputInside={setSearchInputInside}
        searchInputProps={searchInputProps}
      />
      <ModifyPage
        firstRef={firstRef}
        tab={tab}
        setTab={setTab}
        setRefs={setRefs}
        myGridResult={myGridResult}
        mySearchInputProps={mySearchInputProps}
      />
      <BottomMargin />
    </HomeContainer>
  );
};

export default Home;
