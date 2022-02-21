import React, { useEffect, useState, useRef } from "react";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Avatar, Icon, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { CalendarToday } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
export default function Comments(props) {
  const lu = useSelector((state) => state.login.currentUser);
  const [text, setText] = useState("");
  const observed = useRef(null);

  console.log(observed);
  const textChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {}, [observed]);
  const deleteComment = (comment) => (event) => {
    // uncomment(props.postid, comment).then((data) => {
    //   if (data.error) {
    //     console.log(data.error);
    //   } else {
    //     props.updateComments(data.comments);
    //   }
    // });
  };

  const useStyles = makeStyles((theme) => ({
    root: {},
  }));
  const classes = useStyles();
  const commentBody = (item) => {
    return (
      <div style={{ marginTop: "20px", marginLeft: "-30px" }}>
        <Typography
          className={classes.root}
          ref={(invoke) => {
            observed.current = invoke;
          }}
          style={{
            fontSize: "11px",
            width: "218px",
            wordWrap: "break-word",
          }}
        >
          <ReactReadMoreReadLess
            charLimit={150}
            readMoreText={
              <span style={{ fontSize: "8px", color: "orange" }}>더 보기▼</span>
            }
            readLessText={
              <span style={{ fontSize: "8px", color: "orange" }}>덜 보기▼</span>
            }
          >
            {item.text}
          </ReactReadMoreReadLess>
        </Typography>

        <Stack direction="row" spacing={1}>
          <CalendarToday />{" "}
          <Typography style={{ marginTop: "2px", fontSize: "1px" }}>
            {" "}
            {new Date(item.createdAt).toISOString().split("T")[0]}
          </Typography>
          {lu._id === item.commentedBy._id && (
            <Icon onClick={deleteComment(item)}></Icon>
          )}
        </Stack>
      </div>
    );
  };

  return (
    <Box style={{ height: "273px", width: "281px", overflow: "auto" }}>
      {props.comments.map((item, i) => {
        return (
          <div key={i}>
            <Box
              style={{
                display: "flex",
                marginLeft: "5px",
                marginTop: "5px",
                paddingTop: "10px",
              }}
              key={i}
            >
              <Avatar
                className={classes.avatar}
                src={item.commentedBy.profileimage}
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "11px",
                  width: "30px",
                  marginLeft: "10px",
                  color: "gray",
                  marginTop: "-2px",
                }}
              >
                {item.commentedBy.username}
              </Typography>
              {commentBody(item)}
            </Box>
          </div>
        );
      })}
    </Box>
  );
}

Comments.propTypes = {
  postid: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  updateComments: PropTypes.func.isRequired,
};
