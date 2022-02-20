import React from "react";
import PropTypes from "prop-types";
import { dataRequest } from "../../apiCalls/requestMethod";
import { afs } from "../../apiCalls/tryData";
import { Button } from "@mui/material";

export default function FollowProfileButton(props) {
  const follow = async (followid, userid) => {
    try {
      let res = await dataRequest.put("/user/follow", {
        userid: userid,
        followid: followid,
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const unfollow = async (followid, userid) => {
    try {
      let res = await dataRequest.put("/user/unfollow", {
        userid: userid,
        unfollowid: followid,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const followClick = () => {
    props.onButtonClick(follow);
  };
  const unfollowClick = () => {
    props.onButtonClick(unfollow);
  };
  return (
    <div>
      {props.following ? (
        <Button variant="contained" color="secondary" onClick={unfollowClick}>
          Unfollow
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={followClick}>
          Follow
        </Button>
      )}
    </div>
  );
}
