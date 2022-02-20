import React from "react";
import { Fragment, useState } from "react";
import "./styles.css";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { afs } from "../../apiCalls/tryData";

// import Blur from "react-blur";
const UseMyCard = ({ myUserData, myDataOne }) => {
  // { myUserData, myData }

  return (
    <div>
      <Card sx={{ height: 215, width: "100%", mb: "10px" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: red[500],
                mt: -2,
                ml: -1,
              }}
              src={myUserData.profileimage}
              aria-label="recipe"
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            myDataOne.title.length >= 15
              ? myDataOne.title.substring(0, 15) + "..."
              : myDataOne.title
          }
          subheader={myUserData.username}
        />

        <Fragment>
          <CardMedia
            component="img"
            // 194
            height="80"
            image={myDataOne.core}
            alt=""
          />
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ height: 5, mt: -2 }}
            >
              {myDataOne.desc}
            </Typography>
          </CardContent>
          <CardActions sx={{ height: "50px" }} disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Fragment>
      </Card>
    </div>
  );
};

export default UseMyCard;
