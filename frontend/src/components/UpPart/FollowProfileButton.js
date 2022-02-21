import React from "react";
import { dataRequest } from "../../apiCalls/general/requestMethod";
import { getOneUserById } from "../../apiCalls/general/tryData";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/loginRedux";

export default function FollowProfileButton({ onButtonClick, userStatus }) {
  const dispatch = useDispatch();
  const follow = async (userid, followid) => {
    try {
      let res = await dataRequest.put("/user/follow", {
        userid: userid,
        followid: followid,
      });

      getOneUserById(userid).then((data) => {
        dispatch(loginSuccess(data));
      }); // selectedId Redux업데이트

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const unfollow = async (userid, unfollowid) => {
    try {
      let res = await dataRequest.put("/user/unfollow", {
        userid: userid,
        unfollowid: unfollowid,
      });
      getOneUserById(userid).then((data) => {
        dispatch(loginSuccess(data));
      }); // selectedId Redux업데이트

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const followClick = () => {
    onButtonClick(follow);
  };
  const unfollowClick = () => {
    onButtonClick(unfollow);
  };
  return (
    <div>
      {userStatus.following ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              border: "solid 0px",

              color: "white",
              borderRadius: "5px",
              padding: "3px",
              backgroundColor: "#E95F6E",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "orange",
              },
            }}
            onClick={unfollowClick}
          >
            Unfollow
          </Button>{" "}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              border: "solid 0px",

              color: "white",

              borderRadius: "5px",
              padding: "3px",
              backgroundColor: "blue",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "skyblue",
              },
            }}
            onClick={followClick}
          >
            Follow
          </Button>{" "}
        </div>
      )}
    </div>
  );
}
