import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import LoginIcon from "@mui/icons-material/Login";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import CottageIcon from "@mui/icons-material/Cottage";
import { Avatar, Badge, ListItem, ListItemAvatar } from "@mui/material";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
} from "@mui/material";
import ListSearchForm from "./ListSearchForm";
import LoginForm from "../Navbar/LoginForm";
import { useSelector } from "react-redux";

const loginStyle = {
  position: "absolute",
  top: "-5%",
  left: "224%",
  transform: "translate(50%, 50%)",
  width: 338,
  height: 180,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

export default function NestedList() {
  const currentUser = useSelector((state) => state.login.currentUser);
  const [listSearchOpen, setlistSearchOpen] = React.useState(false);
  const listSearchHandleOpen = () => setlistSearchOpen(true);
  const listSearchHandleClose = () => setlistSearchOpen(false);
  const [userInfo, setUserInfo] = React.useState(currentUser);

  const [inboxOpen, setInboxOpen] = React.useState(false);
  const [outboxOpen, setOutboxOpen] = React.useState(false);

  const inboxHandleClick = () => {
    setInboxOpen(!inboxOpen);
  };
  const outboxHandleClick = () => {
    setOutboxOpen(!outboxOpen);
  };

  const [loginOpen, setLoginOpen] = React.useState(false);
  const loginHandleOpen = () => setLoginOpen(true);
  const loginHandleClose = () => setLoginOpen(false);
  const listSearchStyle = {
    position: "absolute",
    top: "49%",
    left: "40%",
    transform: "translate(-50%, -50%)",
    width: 740,
    height: 580,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <ListItem
            alignItems="flex-start"
            style={{ width: 260, padding: 0, borderRadius: 5 }}
          >
            {" "}
            <ListItemAvatar>
              <Avatar
                alt=""
                variant="square"
                src={currentUser === null ? "" : currentUser.profileimage}
                style={{ border: "0.1px solid lightgray", borderRadius: 16 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <div style={{ height: 16 }}>
                    {currentUser === null
                      ? ""
                      : currentUser.username + "(" + currentUser.name + ")"}
                  </div>
                  <div
                    style={{
                      color: "#f64",
                      height: 16,
                      cursor: "pointer",
                      fontsize: "14px",
                      margin: "1px",
                      fontweight: 400,
                      lineheight: "21px",
                    }}
                  >
                    {currentUser === null ? (
                      <>
                        <Button
                          onClick={loginHandleOpen}
                          style={{ color: "red", top: -10 }}
                        >
                          로그인이 필요합니다
                          <LoginIcon />
                        </Button>
                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          open={loginOpen}
                          onClose={loginHandleClose}
                          closeAfterTransition
                          BackdropComponent={Backdrop}
                          BackdropProps={{
                            timeout: 500,
                          }}
                          style={{ width: "338px" }}
                        >
                          <Fade in={loginOpen}>
                            <Box sx={loginStyle}>
                              <LoginForm />
                            </Box>
                          </Fade>
                        </Modal>
                      </>
                    ) : (
                      currentUser.email
                    )}
                  </div>
                  <div
                    style={{
                      color: "blue",
                      height: 16,
                    }}
                  >
                    {currentUser === null ? "" : currentUser.mobilephone}{" "}
                  </div>
                </React.Fragment>
              }
              secondary={<React.Fragment></React.Fragment>}
            />
          </ListItem>
        </ListSubheader>
      }
    >
      <ListItemButton onClick={inboxHandleClick}>
        <ListItemIcon>
          <Badge badgeContent={4} variant="dot" color="primary">
            <InboxIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="공유요청 받은내역" />
        {inboxOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={inboxOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={outboxHandleClick}>
        <ListItemIcon>
          <Badge badgeContent={4} variant="dot" color="primary">
            <InboxIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="공유요청 받은내역" />
        {outboxOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={outboxOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton>
        <ListItemIcon>
          <CottageIcon />
        </ListItemIcon>
        <Button style={{ color: "black" }} onClick={listSearchHandleOpen}>
          <ListItemText primary="내 공유함" />
        </Button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={listSearchOpen}
          onClose={listSearchHandleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          style={{ width: "1500px" }}
        >
          <Fade in={listSearchOpen}>
            <Box sx={listSearchStyle}>
              <ListSearchForm props={currentUser} />
            </Box>
          </Fade>
        </Modal>
      </ListItemButton>
    </List>
  );
}
