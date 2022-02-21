import { PersonAddAlt } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Following = (props) => {
  const { userStatus, whichSide } = props;
  const currentUser = useSelector((state) => state.login.currentUser);
  const mapData = whichSide === "right" ? userStatus.user : currentUser;
  const checkFollowing = (subjectId) => {
    const match = currentUser.following.some(
      (following) => following._id === subjectId
    );
    const matchMe = currentUser._id === subjectId;
    return { match, matchMe };
  };

  return (
    <div>
      <List
        sx={{
          width: "100%",

          ml: 1.5,
        }}
        subheader={<li />}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          {mapData.following.map((item, i) => {
            const { match, matchMe } = checkFollowing(item._id);

            return (
              <>
                {" "}
                <div style={{ display: "flex" }}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ pl: 0.5, mt: 0, mb: 0, pt: 0.3 }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: "50px",
                          borderRadius: "10px",
                          height: "50px",
                          mr: 1.5,
                        }}
                        src={item.profileimage}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={" "}
                      sx={{
                        color: "red",
                        pt: 1.9,
                        width: 1.5,
                      }}
                      secondary={
                        <React.Fragment>
                          <Typography
                            style={{}}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.username}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {!matchMe ? (
                    !match ? (
                      <Button
                        sx={{
                          border: "solid 1px ",
                          alignItems: "center",
                          height: "23px",
                          color: "white",
                          backgroundColor: "blue",
                          marginTop: "20px",
                          marginRight: "30px",
                          "&.MuiButtonBase-root:hover": {
                            bgcolor: "skyblue",
                          },
                        }}
                        color="primary"
                      >
                        <div style={{ marginRight: "2px", width: "100px" }}>
                          팔로우하기
                        </div>
                        <PersonAddAlt />
                      </Button>
                    ) : (
                      <Button
                        style={{
                          alignItems: "center",
                          height: "23px",
                          color: "black",
                          backgroundColor: "white",
                          marginTop: "20px",
                          marginRight: "30px",
                        }}
                        color="primary"
                      >
                        <div style={{ marginRight: "2px", width: "100px" }}>
                          팔로잉 중
                        </div>
                      </Button>
                    )
                  ) : (
                    <Button
                      style={{
                        alignItems: "center",
                        height: "23px",
                        color: "black",
                        backgroundColor: "white",
                        marginTop: "20px",
                        marginRight: "30px",
                      }}
                      color="primary"
                    >
                      <div style={{ marginRight: "2px", width: "100px" }}>
                        본인
                      </div>
                    </Button>
                  )}
                </div>
                <Divider
                  variant="middle"
                  sx={{
                    width: "90%",
                    borderBottomWidth: 2,
                    ml: 0.5,
                    mt: 0.2,
                    mb: 0.5,
                  }}
                />
              </>
            );
          })}
        </div>
      </List>
    </div>
  );
};

export default Following;
