import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { afs } from "../apiCalls/tryData";
import { dataRequest } from "../apiCalls/requestMethod";
export default function AlignItemsList() {
  const cp = useSelector((state) => state.post.currentPost);

  return (
    <Paper
      style={{
        marginLeft: "52px",
        padding: "5px",
        backgroundColor: "#FFFBF2",
        width: "375px",

        marginBottom: "10px",
      }}
    >
      <List
        sx={{
          maxWidth: 365,
          bgcolor: "background.paper",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 0.1,
              m: 0.1,
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            <Button
              sx={{
                width: "95%",
                height: "35px",
                backgroundColor: "#ffe8b3",
                color: "black",
                fontSize: "15px",
              }}
            >
              최근 공유된 포스트
            </Button>
          </Box>
        </div>
        {[...Array(10).keys()].map((i, index) => (
          <div key={index}>
            <ListItem
              alignItems="flex-start"
              sx={{ pl: 0.5, ml: 0.5, mt: 0, pt: 0.3 }}
            >
              <ListItemAvatar>
                <Avatar
                  alt=""
                  src={
                    cp.identifier === "image"
                      ? cp.core.eitherType === "link"
                        ? cp.core.data.link
                        : cp.image
                      : cp.core
                  }
                  variant="rounded"
                  sx={{ width: "60px", height: "60px", mr: 1.5 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={cp.title}
                sx={{ color: "red", pt: 0.3 }}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {cp.owner.username}
                    </Typography>
                    {" — " + cp.desc}
                  </>
                }
              />
            </ListItem>
            <Divider
              variant="middle"
              component="li"
              sx={{ borderBottomWidth: 2, ml: 1, mt: 0.5, mb: 0.5 }}
            />
          </div>
        ))}
      </List>
    </Paper>
  );
}
