import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  Avatar,
  Divider,
  List,
  ListItemAvatar,
  Typography,
} from "@mui/material";

import ReactStars from "react-rating-stars-component";
export default function VirtualizedList({ myDataInfo, onMyItemClick }) {
  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        width: 250,
        bgcolor: "background.paper",
      }}
    >
      <List
        sx={{
          width: 250,
        }}
        subheader={<li />}
      >
        {myDataInfo.map((i, j) => (
          <>
            {" "}
            <ListItemButton
              selected={selectedIndex === j}
              onClick={(event) => {
                handleListItemClick(event, j);
                onMyItemClick(event, j);
              }}
              key={j}
              sx={{ pl: 1, pt: 0.5, pr: 1, pb: 0 }}
              //  handleListItemClick(event, j)}
            >
              <ListItem
                alignItems="flex-start"
                sx={{ pl: 0.5, mt: 0, mb: 0, pt: 0.3 }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt=""
                    src={i.core}
                    variant="rounded"
                    sx={{ width: "60px", height: "60px", mr: 1.5 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    i.title.length >= 20
                      ? i.title.substring(0, 20) + "..."
                      : i.title
                  }
                  sx={{ color: "red", pt: 0.3, width: 0.3 }}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali
                      </Typography>
                      {i.desc}
                    </React.Fragment>
                  }
                />
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={10}
                  activeColor="#ffd700"
                  edit={false}
                />
              </ListItem>
            </ListItemButton>
            <Divider
              variant="middle"
              component="li"
              sx={{ borderBottomWidth: 2, ml: 1, mt: 0.5, mb: 0.5 }}
            />
          </>
        ))}
      </List>
    </Box>
  );
}
