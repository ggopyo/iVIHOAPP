import React, { useState } from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { afs, comment } from "../../apiCalls/tryData";
import { Avatar, CardHeader, Icon, TextField } from "@mui/material";

export default function Comments(props) {
  const lu = useSelector((state) => state.login.currentUser);
  const [text, setText] = useState("");
  const textChange = (event) => {
    setText(event.target.value);
  };

  const addComment = (event) => {
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();
      comment(props.postid, props.propsort, { text: text }, lu._id).then(
        (data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setText("");
            props.updateComments(data.comments);
          }
        }
      );
    }
  };

  const deleteComment = (comment) => (event) => {
    // uncomment(props.postid, comment).then((data) => {
    //   if (data.error) {
    //     console.log(data.error);
    //   } else {
    //     props.updateComments(data.comments);
    //   }
    // });
  };

  const commentBody = (item) => {
    return (
      <p>
        <Link to={"/user/" + item.commentedBy._id}>
          {item.commentedBy.name}
        </Link>
        <br />
        {item.text}
        <span>
          {new Date(item.created).toDateString()} |
          {lu._id === item.commentedBy._id && (
            <Icon onClick={deleteComment(item)}>delete</Icon>
          )}
        </span>
      </p>
    );
  };

  return (
    <div>
      <CardHeader
        avatar={<Avatar src={"" + lu._id} />}
        title={
          <TextField
            onKeyDown={addComment}
            multiline
            value={text}
            onChange={textChange}
            placeholder="의견을 적어주세요..!"
            margin="normal"
          />
        }
      />
      {props.comments.map((item, i) => {
        return (
          <CardHeader
            avatar={<Avatar src={"" + item.commentedBy._id} />}
            title={commentBody(item)}
            key={i}
          />
        );
      })}
    </div>
  );
}

Comments.propTypes = {
  postid: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  updateComments: PropTypes.func.isRequired,
};
