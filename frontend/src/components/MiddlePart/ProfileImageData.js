import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export default function TitlebarBelowImageList(props) {
  return (
    <ImageList sx={{ width: 361, height: 240 }} cols={3}>
      {props.posts.map((item) => (
        <ImageListItem key={item._id} style={{ width: "100px" }}>
          {props.identifier === "image" && (
            <img
              src={`${item.core.data.link}`}
              alt={item.title}
              loading="lazy"
            />
          )}
          {props.identifier === "youtube" && (
            <img
              src={`https://i.ytimg.com/an_webp/B70lI2PvRnA/mqdefault_6s.webp?du=3000&sqp=CID2gI8G&rs=AOn4CLABiB90Oxw3dNLig11pQ9GPNDa1FA`}
              alt={item.title}
              loading="lazy"
            />
          )}
          {props.identifier === "howto" && (
            <img
              src={`https://madsourcer.com/wp-content/uploads/stackoverflow.png`}
              alt={item.title}
              loading="lazy"
            />
          )}

          <ImageListItemBar
            title={item.title}
            subtitle={
              <span>
                생성일: {new Date(item.createdAt).toISOString().split("T")[0]}
              </span>
            }
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
