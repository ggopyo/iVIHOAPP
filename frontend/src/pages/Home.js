import React, { useEffect, useRef, useState } from "react";
import MuiNavbar from "../components/Navbar/MuiNavbar";
import ProfileView from "../components/UpPart/ProfileView";
import ModifyPage from "../components/UpPart/ModifyPage";
import FixedSideBar from "../components/UpPart/FixedSideBar";
import { useDispatch, useSelector } from "react-redux";
import { dataRequest, publicRequest } from "../apiCalls/requestMethod";
import { Container } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
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
    const getCurrentUser = async (currentUser) => {
      try {
        const returnedHowto = await publicRequest.get(
          "/data/howto/by/" + currentUser._id
        );
        const returnedImage = await publicRequest.get(
          "/data/image/by/" + currentUser._id
        );
        const returnedYoutube = await publicRequest.get(
          "/data/youtube/by/" + currentUser._id
        );

        setMyPosts({
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
          return null;
        });
        setMyStatistic({
          dataCount,
          commentsCount,
          likesCount,
          swapsCount,
        });
        let newArray = [];

        for (var i = 0; i < tempArray.length; i++) {
          newArray.push({
            id: i + 1,
            title: tempArray[i].title,
            identifier: tempArray[i].identifier,
            desc: tempArray[i].desc,
            like: tempArray[i].likes.length,
            core:
              tempArray[i].identifier === "image"
                ? tempArray[i].core.eitherType === "link"
                  ? tempArray[i].core.data.link.substring(0, 40)
                  : "파일"
                : tempArray[i].core.substring(0, 40),
            comments: tempArray[i].comments.length,
            createdAt: new Date(tempArray[i].createdAt)
              .toISOString()
              .split("T")[0],
            updatedAt: tempArray[i].updatedAt
              ? new Date(tempArray[i].updatedAt).toISOString().split("T")[0]
              : "-",
          });
        }

        setMyGridResult({ newArray, tempArray });
      } catch (err) {
        console.log(err);
      }
    };

    getCurrentUser(currentUser);
  }, [mineUpdated, currentUser]);

  const myProfileGroup = { addUpdate, clickFollowButton, values };

  const myDataGroup = { mineUpdated, myPosts, values, addUpdate, myStatistic };

  const mySearchInputHandleSubmit = (event, mySearchText) => {
    event.preventDefault();

    event.target.reset();
    setMySearchUpdated(true);

    const searchContents = async (mySearchText) => {
      try {
        const res = await dataRequest.post("/data/search/" + mySearchText, {
          userid: currentUser._id,
        });

        const { returnedYoutubeData, returnedHowtoData, returnedImageData } =
          res.data;

        const tempArray = [
          ...returnedYoutubeData,
          ...returnedHowtoData,
          ...returnedImageData,
        ];
        let newArray = [];

        for (var i = 0; i < tempArray.length; i++) {
          newArray.push({
            id: i + 1,
            title: tempArray[i].title,
            identifier: tempArray[i].identifier,
            desc: tempArray[i].desc,
            like: tempArray[i].likes.length,
            core:
              tempArray[i].identifier === "image"
                ? tempArray[i].core.eitherType === "link"
                  ? tempArray[i].core.data.link.substring(0, 40)
                  : "파일"
                : tempArray[i].core.substring(0, 40),
            comments: tempArray[i].comments.length,
            createdAt: new Date(tempArray[i].createdAt)
              .toISOString()
              .split("T")[0],
            updatedAt: tempArray[i].updatedAt
              ? new Date(tempArray[i].updatedAt).toISOString().split("T")[0]
              : "-",
          });
        }

        setMyGridResult({ newArray, tempArray });

        setMyResult([
          ...returnedYoutubeData,
          ...returnedHowtoData,
          ...returnedImageData,
        ]);
        // setSearchText(null);
        // setSearchInputInside(false);
        setMySearchUpdated(true);
      } catch (err) {
        alert("오류");
        console.log(err);
      }
    };
    const regex = /.{2,}/; // 모든 문자열 : 알파벳+숫자만/[0-9a-zA-Z]{2,}/
    // console.log(searchText.match(regex));
    if (mySearchText.match(regex)) searchContents(mySearchText);
    // setSearchText("");
  };
  const searchInputHandleSubmit = (event, searchText) => {
    event.preventDefault();

    event.target.reset();
    setSearchUpdated(true);

    const searchContents = async (searchText) => {
      try {
        const res = await dataRequest.get("/data/search/" + searchText);
        const { returnedYoutubeData, returnedHowtoData, returnedImageData } =
          res.data;

        setResult([
          ...returnedYoutubeData,
          ...returnedHowtoData,
          ...returnedImageData,
        ]);
        // setSearchText(null);
        setSearchInputInside(false);
      } catch (err) {
        alert("오류");
        console.log(err);
      }
    };
    const regex = /.{2,}/; // 모든 문자열 : 알파벳+숫자만/[0-9a-zA-Z]{2,}/
    // console.log(searchText.match(regex));
    if (searchText.match(regex)) searchContents(searchText);
    // setSearchText("");
  };

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
          // src="https://images.theconversation.com/institutions/1260/logos/logo-1424731486.png?ixlib=rb-1.1.0&q=45&auto=format&w=170&h=170"
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