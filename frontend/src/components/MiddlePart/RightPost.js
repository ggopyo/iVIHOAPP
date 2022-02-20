import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  AccountCircle,
  Comment,
  Delete,
  FavoriteBorder,
  Person,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import {
  afs,
  comment,
  getOneData1,
  like,
  unlike,
} from "../../apiCalls/tryData";
import { useSelector } from "react-redux";
import Comments from "./Comments";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
export default function RightPost(props) {
  const { post } = props;

  const currentUser = useSelector((state) => state.login.currentUser);
  const currentPost = useSelector((state) => state.post.currentPost);
  const checkLike = (likes) => {
    let match = likes.indexOf(currentUser._id) !== -1;
    return match;
  };
  const [values, setValues] = useState({
    like: checkLike(post.likes),
    likes: post.likes.length,
    comments: post.comments,
  });

  const updateComments = (comments) => {
    setValues({ ...values, comments: comments });
  };

  const clickLike = () => {
    let callApi = values.like ? unlike : like;

    callApi(currentUser._id, post.identifier, post._id).then((data) => {
      if (data.error) {
      } else {
        setValues({
          ...values,
          like: !values.like,
          likes: data.likes.length,
        });
      }
    });
  };

  const addComment = (event) => {
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();
      comment(post._id, post.identifier, { text: text }, currentUser._id).then(
        (data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setText("");
            updateComments(data.comments);
          }
        }
      );
    }
  };
  useEffect(() => {
    setValues({
      like: checkLike(post.likes),
      likes: post.likes.length,
      comments: post.comments,
    });
  }, [currentPost]);
  const deleteComment = (comment) => (event) => {
    // uncomment(postid, comment).then((data) => {
    //   if (data.error) {
    //     console.log(data.error);
    //   } else {
    //     updateComments(data.comments);
    //   }
    // });
  };
  const [text, setText] = useState("");
  const textChange = (event) => {
    setText(event.target.value);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      "& label.Mui-focused": {
        borderBottomColor: "#ffe8b3",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#ffe8b3",
      },
      "& .MuiInput-underline:before": {
        borderBottomColor: "#ffe8b3",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#ffe8b3",
        },
        "&:hover fieldset": {
          borderColor: "#ffe8b3",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#ffe8b3",
        },
      },
    },
  }));

  const classes = useStyles();
  return (
    <>
      <div style={{ borderRadius: "20px", height: "340px" }}>
        <div
          style={{
            padding: "5px",
            height: "65px",
            overflow: "hidden",
            marginBottom: "-5px",
          }}
        >
          <img
            src="https://cdn.pixabay.com/photo/2015/06/25/11/16/sky-821153_1280.jpg"
            style={{
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
              width: "100%",
            }}
          />
        </div>
        <Box
          sx={{
            size: "3px",
            display: "flex",
            borderRadius: "15px",
            mt: "5px",
            height: "60px",
            marginBottom: "-63px",
          }}
        >
          <Avatar
            style={{
              marginRight: "5px",
              top: "-57px",
              height: "50px",
              width: "50px",
              marginLeft: "10px",
            }}
            alt={
              currentUser !== null
                ? currentUser.username + "(" + currentUser.name + ")"
                : ""
            }
            src={currentUser !== null ? currentUser.profileimage : ""}
          />
          <div
            style={{
              marginRight: "5px",
              marginTop: "-47px",
              backgroundColor: "#FFFBF2",
              height: "30px",
              borderRadius: "12px",
              alignContent: "center",
              paddingRight: "10px",
            }}
          >
            <IconButton aria-label="Person" onClick={clickLike} color="primary">
              <Comment />
            </IconButton>
            <span style={{ fontSize: "10px" }}>{post.comments.length}</span>
          </div>{" "}
        </Box>{" "}
        <div
          style={{
            margin: "5px",
          }}
        >
          <div
            style={{
              width: "275px",
              backgroundColor: "white",
              borderRadius: "7px",
            }}
            elevation={1}
          >
            <Paper
              style={{
                width: "268px",
                backgroundColor: "white",
                overflow: "hidden",
                borderRadius: "7px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              {values.comments.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    height: "273px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  작성된 댓글이 없습니다
                </div>
              ) : (
                <Comments
                  postid={post._id}
                  comments={values.comments}
                  updateComments={updateComments}
                  propsort={post.identifier}
                />
              )}
            </Paper>
          </div>{" "}
        </div>
      </div>
      <Paper
        elevation={3}
        style={{
          margin: "5px",
          border: "blue",
          height: "70px",
          minHeight: "70px",
        }}
      >
        <Avatar
          alt=""
          src={currentUser.profileimage}
          variant="rounded"
          style={{
            borderRadius: "100px",
            width: "20px",
            height: "20px",
            marginLeft: "10px",
            top: "15px",
            left: "-5px",
          }}
        />
        <TextField
          id="input-with-icon-textfield"
          onKeyDown={addComment}
          multiline
          value={text}
          onChange={textChange}
          placeholder="의견을 적어주세요..!"
          margin="normal"
          className={classes.root}
          maxRows={3}
          style={{
            marginTop: "-5px",
            paddingBottom: "20px",
            marginLeft: "35px",
            width: "225px",
          }}
          variant="standard"
        />
      </Paper>
    </>
  );
}

RightPost.propTypes = {
  post: PropTypes.object.isRequired,
};

//rightpost
