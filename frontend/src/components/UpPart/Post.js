import React, { useState } from "react";
import PropTypes from "prop-types";
import { Comment, FavoriteBorder } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import { like, unlike } from "../../apiCalls/general/tryData";
import { useSelector } from "react-redux";
import Comments from "./Comments";

export default function Post(props) {
  const lu = useSelector((state) => state.login.currentUser);

  const checkLike = (likes) => {
    let match = likes.indexOf(lu._id) !== -1;
    return match;
  };
  const [values, setValues] = useState({
    like: checkLike(props.post.likes),
    likes: props.post.likes.length,
    comments: props.post.comments,
  });

  const updateComments = (comments) => {
    setValues({ ...values, comments: comments });
  };
  const clickLike = () => {
    let callApi = values.like ? unlike : like;

    callApi(lu._id, props.post.identifier, props.post._id).then((data) => {
      if (data.error) {
      } else {
        setValues({ ...values, like: !values.like, likes: data.likes.length });
      }
    });
  };
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            src={
              "https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
            }
          />
        }
        title={props.post.title}
        subheader={
          props.post
            ? props.post.createdAt
              ? new Date(props.post.createdAt).toISOString().split("T")[0]
              : new Date(props.post.updatedAt).toISOString().split("T")[0]
            : ""
        }
      />
      <CardContent>
        <Typography component="p">{props.post.desc}</Typography>
        <div>
          <img src={props.post.core} alt="" />
        </div>
      </CardContent>
      <CardActions>
        {values.like ? (
          <IconButton aria-label="Like" onClick={clickLike} color="secondary">
            <Favorite />
          </IconButton>
        ) : (
          <IconButton aria-label="Unlike" onClick={clickLike} color="secondary">
            <FavoriteBorder />
          </IconButton>
        )}{" "}
        <span>{values.likes}</span>
        <IconButton aria-label="Comment" color="secondary">
          <Comment />
        </IconButton>
        <span>{}</span>
      </CardActions>
      <Divider />
      <Comments
        postid={props.post._id}
        comments={values.comments}
        updateComments={updateComments}
        propsort={props.post.identifier}
      />
    </Card>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
