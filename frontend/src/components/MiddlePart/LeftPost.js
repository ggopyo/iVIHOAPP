import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  CalendarToday,
  Comment,
  Delete,
  FavoriteBorder,
  Person,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { afs, getOneData1, like, unlike } from "../../apiCalls/tryData";
import { useSelector } from "react-redux";
import Comments from "../Profile/Comments";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

export default function Post(props) {
  const lu = useSelector((state) => state.login.currentUser);
  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const [tab, setTab] = useState(0);
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

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "23px",
      backgroundColor: "white",
      minHeight: "0px",
      color: "black",
      border: "none",
    },
    indicator: {
      backgroundColor: "white",
      font: "bold",
    },
  }));

  const classes = useStyles();
  return (
    <div style={{ width: "284px", height: "412px" }}>
      <Card
        style={{
          marginLeft: "5px",
          marginRight: "5px",
          marginTop: "5px",
          height: "412px",
        }}
      >
        <div style={{ height: "60px", overflow: "hidden" }}>
          <img
            src="https://cdn.pixabay.com/photo/2015/06/25/11/16/sky-821153_1280.jpg"
            style={{ width: "100%" }}
          />
          {/* <div
            // src="https://images.theconversation.com/institutions/1260/logos/logo-1424731486.png?ixlib=rb-1.1.0&q=45&auto=format&w=170&h=170"
            style={{ backgroundColor: "black", width: "100%", height: "275px" }}
          /> */}
        </div>
        <Box
          sx={{
            size: "3px",
            display: "flex",
            mt: "5px",
            marginBottom: "-63px",
          }}
        >
          <Avatar
            style={{
              marginRight: "5px",
              top: "-63px",
              height: "50px",
              width: "50px",
              marginLeft: "10px",
            }}
            alt={lu !== null ? lu.username + "(" + lu.name + ")" : ""}
            src={lu !== null ? lu.profileimage : ""}
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
              <Person />
            </IconButton>
            <span style={{ fontSize: "10px" }}>{lu.username}</span>
          </div>{" "}
        </Box>{" "}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "5px",
            marginRight: "15px",
          }}
        >
          <IconButton aria-label="Calendar" color="primary">
            <CalendarToday />
          </IconButton>
          <span style={{ fontSize: "10px" }}>
            {" "}
            {props.post
              ? props.post.createdAt
                ? new Date(props.post.createdAt).toISOString().split("T")[0]
                : new Date(props.post.updatedAt).toISOString().split("T")[0]
              : ""}
          </span>
        </div>
        <CardContent style={{ marginTop: "-20px" }}>
          <Typography style={{ fontSize: "20px" }}>
            {props.post.title}
          </Typography>
          <Divider
            variant="middle"
            sx={{
              width: "99%",
              borderBottomWidth: 1,
              ml: 0,
              mt: 0.2,
              mb: 0.5,
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {values.like ? (
              <IconButton aria-label="Like" onClick={clickLike} color="primary">
                <Favorite />
              </IconButton>
            ) : (
              <IconButton
                aria-label="Unlike"
                onClick={clickLike}
                color="primary"
              >
                <FavoriteBorder />
              </IconButton>
            )}{" "}
            <span>{values.likes}</span>
            <IconButton aria-label="Comment" color="primary">
              <Comment />
            </IconButton>
            <span>{props.post.comments.length}</span>
          </div>
          <Divider
            variant="middle"
            sx={{
              width: "99%",
              borderBottomWidth: 1,
              ml: 0,
              mt: 0.2,
              mb: 0.5,
            }}
          />
          <Typography style={{ marginTop: "10px", lineHeight: "20px" }}>
            <ReactReadMoreReadLess
              charLimit={120}
              readMoreText={
                <span style={{ fontSize: "8px", color: "orange" }}>
                  더 보기▼
                </span>
              }
              readLessText={
                <span style={{ fontSize: "8px", color: "orange" }}>
                  덜 보기▼
                </span>
              }
            >
              {props.post.desc}
            </ReactReadMoreReadLess>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
