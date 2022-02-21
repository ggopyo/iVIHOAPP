import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchTab from "./SearchTab";
import { dataRequest, publicRequest } from "../../apiCalls/requestMethod";
import { getOneUserByUsername } from "../../apiCalls/tryData";

export default function Back() {
  const location = useLocation();
  const cl = location.pathname.split("/")[1];

  const [a, seta] = useState({});

  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });
  const [posts, setPosts] = useState({ howto: [], image: [], youtube: [] });
  const [updated, setUpdated] = useState(false);
  const lu = useSelector((state) => state.login.currentUser);
  const [cu, setCu] = useState(lu ? lu : "");

  const clickFollowButton = (callAPI) => {
    callAPI(cu._id, a._id).then((data) => {
      if (data)
        setValues({ ...values, user: data, following: !values.following });
    });
  };

  const checkFollow = (others) => {
    const match = others.followers.some((follower) => follower._id === cu._id);
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

  const addPost = (post, identifier) => {
    let updatedPosts;
    let updatedArray;
    switch (identifier) {
      case "image":
        updatedArray = [...posts.image];
        updatedArray.unshift(post);
        let { image, ...otherImage } = posts;
        setPosts({ ...otherImage, image: updatedPosts });
        break;
      case "youtube":
        updatedArray = [...posts.youtube];
        updatedArray.unshift(post);
        let { youtube, ...otherYoutube } = posts;
        setPosts({ ...otherYoutube, youtube: updatedPosts });
        break;
      case "howto":
        updatedArray = [...posts.howto];
        updatedArray.unshift(post);
        let { howto, ...otherHowto } = posts;
        setPosts({ ...otherHowto, howto: updatedPosts });
        break;
      default:
        break;
    }
    setUpdated(!updated);
  };
  const removePost = (post) => {
    const updatedPosts = posts;
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };
  useEffect(() => {
    const getcl = async (cl) => {
      try {
        const res = await getOneUserByUsername(cl);
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
          setPosts({
            youtube: [...returnedYoutube.data],
            image: [...returnedImage.data],
            howto: [...returnedHowto.data],
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getcl(cl);
  }, [updated, cl]);
  useEffect(() => {}, []);
  return (
    <Paper elevation={1}>
      <SearchTab
        profileUser={values.user}
        posts={posts}
        // userid={cu ? cu._id : ""}
        // addUpdate={addPost}
        // removePostUpdate={removePost}
      />
    </Paper>
  );
}
