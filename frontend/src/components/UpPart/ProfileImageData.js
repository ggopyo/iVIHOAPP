import { useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { afs } from "../../apiCalls/tryData";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { select, selectFailure } from "../../redux/postRedux";
import { useState } from "react";

export default function TitlebarBelowImageList(props) {
  const { posts, identifier, setTab } = props;

  const dispatch = useDispatch();
  const [howtoLogo, setHowtoLogo] = useState([]);
  let currentPost = null;
  const selectPost = (post) => {
    dispatch(select(post));
    if (!currentPost) {
      dispatch(selectFailure);
      console.log("에러 발생");
    }
  };
  currentPost = useSelector((state) => state.post.currentPost);
  const getYoutubeThumbnail = (addr) => {
    let regex;

    if (addr.substring(0, 5) === "https")
      regex = /https\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;
    else if (addr.substring(0, 5) === "http:")
      regex = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

    const id = addr.match(regex)[1];

    return `https://img.youtube.com/vi/${id}/default.jpg`;
  };
  // useEffect(() => {
  //   if (identifier === "howto") {
  //     for (var i = 0; i < posts.length; i++) {
  //       const getHowtoLogo = async (addr) => {
  //         try {
  //           const hostname = new URL(addr).hostname;
  //           const res = await dataRequest.post("/howtologo/get", {
  //             domainname: hostname,
  //           });
  //           console.log(addr, res.data.domainimage);
  //           setHowtoLogo((pre) => [...pre, res.data.domainimage]);
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       };
  //       getHowtoLogo(posts[i].core);
  //     }

  //   }
  // }, []);
  // useEffect(() => {
  //   if (identifier == "howto" && howtoLogo.length == posts.length)

  // }, [howtoLogo]);
  return (
    // https://img.youtube.com/vi/Ykbl9j6z6ko/default.jpg
    // http://youtube.com/get_video_info?video_id=XXXXXXXX
    <ImageList sx={{ width: 361, height: 280 }} cols={3}>
      {posts.map((item, index) => {
        if (item.identifier === "youtube") {
          var youtubeThumbnail = getYoutubeThumbnail(item.core);
        }

        return (
          <Button key={index}>
            <ImageListItem
              key={index}
              style={{ width: "100px" }}
              onClick={() => {
                selectPost(item);
                setTab(8);
              }}
            >
              {identifier === "image" && (
                <img
                  src={item.image}
                  style={{ height: "100px" }}
                  alt={item.title}
                  loading="lazy"
                />
              )}
              {identifier === "youtube" && (
                <img src={youtubeThumbnail} loading="lazy" alt="" />
              )}
              {identifier === "howto" && (
                <img src={item.logo.domainimage} loading="lazy" alt="" />
              )}
              <ImageListItemBar
                style={{ color: "black" }}
                title={<span style={{ color: "black" }}>{item.title}</span>}
                subtitle={
                  <span style={{ color: "black" }}>
                    생성일:{" "}
                    {new Date(item.createdAt).toISOString().split("T")[0]}
                  </span>
                }
                position="below"
              />
            </ImageListItem>
          </Button>
        );
      })}
    </ImageList>
  );
}
