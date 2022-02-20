import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { List } from "@mui/material";
import ReactStars from "react-rating-stars-component";
export default function NotificationForm() {
  // const [selectedIndex, setSelectedIndex] = React.useState();
  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex(index);
  // };
  // const ratingChanged = (newRating) => {
  //   console.log(newRating);
  // };
  return (
    <Box sx={{}}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: "100%",
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {[1, 2, 3, 4, 5].map((i, j) => (
          <ListItemButton
          // selected={selectedIndex === j}
          // onClick={(event) => {
          //   handleListItemClick(event, j);
          //   // onMyItemClick(event, j);
          // }}
          // key={j}
          //  handleListItemClick(event, j)}
          >
            <ListItem key={j} sx={{ pl: 0, pr: 0 }}>
              <ListItemText
              // primary={
              //   i.title.length >= 20
              //     ? i.title.substring(0, 20) + "..."
              //     : i.title
              // }
              // sx={{ width: 13 }}
              />
              <ReactStars
              // count={5}
              // onChange={ratingChanged}
              // size={10}
              // activeColor="#ffd700"
              // edit={false}
              />
            </ListItem>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
