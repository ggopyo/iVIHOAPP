import React from "react";
import Post from "./RightPost";

export default function Front(props) {
  return (
    <div>
      {props.posts.map((item, i) => {
        return i === 0 ? <Post post={item} key={i} /> : "";
      })}
    </div>
  );
}
