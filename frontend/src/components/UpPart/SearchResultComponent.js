import React from "react";
import {
  Avatar,
  ButtonBase,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Comment, Favorite } from "@mui/icons-material";
import { select, selectFailure } from "../../redux/postRedux";
import { selectUser, selectUserFailure } from "../../redux/selectedUserRedux";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
const SearchResultComponent = (props) => {
  const { triggerTabObject, result, mySearchInputProps, searchIdentifier } =
    props;
  const {
    setTriggerRightProfile,
    setTriggerRightProfileFlag,
    triggerRightProfileFlag,
  } = triggerTabObject;
  const { setTab, setLastHistory } = mySearchInputProps;
  const currentUser = useSelector((state) => state.login.currentUser);

  const dispatch = useDispatch();
  const selectPost = (post) => {
    try {
      dispatch(select(post));
      setLastHistory(searchIdentifier);
      setTab(8);
    } catch (err) {
      console.log(err);
      dispatch(selectFailure);
    }
  };

  const selectUserClick = (selectedUser) => {
    try {
      if (selectedUser.username !== currentUser.username) {
        dispatch(selectUser(selectedUser));
        setTriggerRightProfile(0);
        setTriggerRightProfileFlag(!triggerRightProfileFlag);
      }
    } catch (err) {
      console.log(err);
      dispatch(selectUserFailure);
    }
  };

  const getYoutubeThumbnail = (addr) => {
    let regex;

    if (addr.substring(0, 5) === "https")
      regex = /https\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;
    else if (addr.substring(0, 5) === "http:")
      regex = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

    const id = addr.match(regex)[1];

    return `https://img.youtube.com/vi/${id}/default.jpg`;
  };

  const useStyles = makeStyles((theme) => ({
    listItemTitle: {
      fontSize: "1.2em",
    },
    listItemText: {
      fontSize: "0.5em",
    },
    listItemUser: {
      marginBottom: "5px",
    },
    iconButton: {
      cursor: "pointer",
    },
  }));

  const classes = useStyles();
  return (
    <div
      style={{
        marginLeft: "5px",
        height: "300px",
        width: "365px",
        overflowY: "auto",
      }}
    >
      <div>
        <List
          style={{
            width: "100%",
            marginTop: "5px",
          }}
          subheader={<li />}
        >
          {result.map((item, index) => {
            if (item.identifier === "youtube") {
              var youtubeThumbnail = getYoutubeThumbnail(item.core);
            }

            return (
              <div
                key={index}
                onClick={(event) => {
                  // handleListItemClick(event, index);
                  // onItemClick(event, item);
                }}
                style={{
                  width: "100%",
                }}
                subheader={<li />}
              >
                {" "}
                <ListItem
                  alignItems="flex-start"
                  sx={{ pl: 0.5, mt: 0, mb: 0, pt: 0.3 }}
                >
                  <ListItemAvatar>
                    <ButtonBase centerRipple="true">
                      <Avatar
                        alt=""
                        src={
                          item.identifier === "image"
                            ? item.core.eitherType === "link"
                              ? item.core.data.link
                              : item.image
                            : item.identifier === "howto"
                            ? item.logo.domainimage
                            : youtubeThumbnail
                        }
                        variant="rounded"
                        sx={{
                          width: "40px",
                          height: "40px",
                        }}
                      />
                    </ButtonBase>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <>
                        <div>
                          <ButtonBase
                            centerRipple="true"
                            onClick={() => {
                              selectPost(item);
                            }}
                          >
                            {" "}
                            <div
                              className={classes.listItemTitle}
                              style={{ textAlign: "left" }}
                            >
                              {" "}
                              {item.title.length >= 40
                                ? item.title.substring(0, 40) + "..."
                                : item.title}
                            </div>
                          </ButtonBase>
                        </div>
                        <span>by</span>
                        <ButtonBase
                          onClick={() => {
                            // handleUserClick(event, index);
                            selectUserClick(item.owner);
                          }}
                          centerRipple="true"
                        >
                          <span
                            className={classes.listItemUser}
                            style={{
                              color: "brown",
                              marginLeft: "5px",
                            }}
                          >
                            {item.owner.username === currentUser.username
                              ? item.owner.username + "(나)"
                              : item.owner.username}
                          </span>
                        </ButtonBase>
                      </>
                    }
                    sx={{
                      color: "black",
                      pt: 0.3,
                      width: 0.3,
                    }}
                    secondary={
                      <>
                        {" "}
                        <ButtonBase
                          onClick={() => {
                            selectPost(item);
                          }}
                        >
                          <Typography
                            className={classes.listItemText}
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            align="left"
                          >
                            {item.desc.length >= 100
                              ? item.desc.substring(0, 100) + "..."
                              : item.desc}
                          </Typography>
                        </ButtonBase>
                        <ButtonBase centerRipple="true">
                          <Chip
                            label={
                              item.identifier === "youtube"
                                ? "video"
                                : item.identifier
                            }
                            style={{
                              height: "15px",
                              fontSize: "5px",
                              marginBottom: "2px",
                              marginLeft: "5px",
                              marginTop: "2px",
                            }}
                          />
                        </ButtonBase>
                      </>
                    }
                  />
                  <div
                    style={{
                      marginTop: "5px",
                    }}
                  >
                    <div style={{ marginLeft: "10px" }}>
                      <ReactStars
                        count={5}
                        // onChange={ratingChanged}
                        size={12}
                        activeColor="#ffd700"
                        edit={false}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "70px",
                        maxHeight: "100px",
                      }}
                    >
                      <div>
                        {" "}
                        <div>
                          <IconButton
                            disableRipple={true}
                            aria-label="View"
                            color="secondary"
                            style={{ cursor: "default" }}
                          >
                            <Favorite color="primary" />
                          </IconButton>
                          <span style={{ cursor: "default" }}>
                            {item.likes.length}
                          </span>
                        </div>
                        <div>
                          <IconButton
                            disableRipple={true}
                            aria-label="Comment"
                            color="secondary"
                            style={{ cursor: "default" }}
                          >
                            <Comment color="primary" />
                          </IconButton>
                          <span style={{ cursor: "default" }}>
                            {item.comments.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ListItem>
                <Divider
                  variant="middle"
                  sx={{ borderBottomWidth: 1.5, mt: -0.8, ml: 1 }}
                />
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default SearchResultComponent;
