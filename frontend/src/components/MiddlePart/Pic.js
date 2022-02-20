import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dataRequest } from "../../apiCalls/requestMethod";
import { afs } from "../../apiCalls/tryData";
const Pic = () => {
  const cp = useSelector((state) => state.post.currentPost);
  const [howtoLogo, setHowtoLogo] = useState();
  const getYoutubeId = (addr) => {
    let regex;

    if (addr.substring(0, 5) === "https")
      regex = /https\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;
    else if (addr.substring(0, 5) === "http:")
      regex = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

    const id = addr.match(regex)[1];

    return id;
  };
  const getHowtoLogo = async (addr) => {
    try {
      const hostname = new URL(addr).hostname;

      const res = await dataRequest.post("/howtologo/get", {
        domainname: hostname,
      });
      setHowtoLogo(res.data.domainimage);
    } catch (err) {
      console.log(err);
    }
  };

  if (cp.identifier === "howto") getHowtoLogo(cp.core);

  useEffect(() => {}, []);
  if (cp.identifier === "youtube") var youtubeId = getYoutubeId(cp.core);

  return (
    <Paper
      style={{
        marginTop: "5px",
        marginRight: "5px",
        marginLeft: "5px",
        overflow: "hidden",
        height: "413px",
        backgroundColor: "black",
      }}
      elevation={1}
    >
      <div style={{ marginTop: "35px" }}>
        {cp.identifier === "image" ? (
          <img
            src={cp.core.eitherType === "link" ? cp.core.data.link : cp.image}
            style={{
              width: "560px",
              zIndex: "999",
              height: "315px",
            }}
            alt=""
          />
        ) : cp.identifier === "youtube" ? (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        ) : (
          <img
            src={howtoLogo}
            style={{
              width: "560px",
              zIndex: "999",
              height: "315px",
            }}
            alt=""
          />
        )}
      </div>
    </Paper>
  );
};

export default Pic;
