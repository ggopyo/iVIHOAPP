import React from "react";
import PropTypes from "prop-types";
import Post from "./RightPost";
import { afs } from "../../apiCalls/tryData";

export default function Front(props) {
  return (
    <div>
      {props.posts.map((item, i) => {
        return i === 0 ? <Post post={item} key={i} /> : "";
      })}
    </div>
  );
}
Front.propTypes = {
  posts: PropTypes.array.isRequired,
};
