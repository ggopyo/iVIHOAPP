import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  Typography,
} from "@mui/material";

import ReactStars from "react-rating-stars-component";
import { Comment, Favorite } from "@mui/icons-material";
import { useEffect, useState } from "react";
export default function VirtualizedList(props) {
  const { onItemClick, dataInfo, whichSide } = props;
  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  useEffect(() => {}, [selectedIndex]);
  const getYoutubeThumbnail = (addr) => {
    let regex;

    if (addr.substring(0, 5) === "https")
      regex = /https\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;
    else if (addr.substring(0, 5) === "http:")
      regex = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

    const id = addr.match(regex)[1];

    return `https://img.youtube.com/vi/${id}/default.jpg`;
  };
  return (
    <Box
      sx={{
        height: 400,
        width: whichSide === "left" ? 270 : 270,
        bgcolor: "background.paper",
        overflowY: "auto",
      }}
    >
      <List
        sx={{
          width: 250,
        }}
        subheader={<li />}
      >
        {dataInfo.map((item, index) => {
          if (item.identifier === "youtube") {
            var youtubeThumbnail = getYoutubeThumbnail(item.core);
          }

          return (
            <div
              key={index}
              selected={selectedIndex === index}
              onClick={(event) => {
                handleListItemClick(event, index);
                onItemClick(event, item);
              }}
            >
              {" "}
              <ListItemButton
                style={{ padding: "0px" }}
                //  handleListItemClick(event, j)}
              >
                <ListItem
                  alignItems="flex-start"
                  sx={{ pl: 0.5, mt: 0, mb: 0, pt: 0.3 }}
                >
                  <ListItemAvatar>
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
                      sx={{ width: "60px", height: "60px", mr: 1.5 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      item.title.length >= 20
                        ? item.title.substring(0, 20) + "..."
                        : item.title
                    }
                    sx={{ color: "black", pt: 0.3, width: 0.3 }}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>

                        <Chip
                          label="c++"
                          style={{
                            height: "15px",
                            fontSize: "5px",
                            marginBottom: "2px",
                            marginTop: "2px",
                          }}
                        />
                        <Chip
                          label="파이썬"
                          style={{
                            height: "15px",
                            fontSize: "5px",
                          }}
                        />
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
                        onChange={ratingChanged}
                        size={12}
                        activeColor="#ffd700"
                        edit={false}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <IconButton aria-label="Like" color="secondary">
                        <Favorite />
                      </IconButton>
                      <span>{item.likes.length}</span>
                      <IconButton aria-label="Comment" color="secondary">
                        <Comment />
                      </IconButton>
                      <span>{item.comments.length}</span>
                    </div>
                  </div>
                </ListItem>
              </ListItemButton>
              <Divider
                variant="middle"
                component="li"
                sx={{ borderBottomWidth: 1.5, ml: 1 }}
              />
            </div>
          );
        })}
      </List>
    </Box>
  );
}
