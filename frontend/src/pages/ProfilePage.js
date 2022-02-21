import React, { useState } from "react";

import MuiNavbar from "../components/Navbar/MuiNavbar";
import SideBar from "../components/Sidebar/SideBar";
import { slide as Menu } from "react-burger-menu";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import Profile from "../components/Profile/Profile";
import SideIndicator from "../components/Indicator/SideIndicator";
const ProfilePage = () => {
  return (
    <div>
      <MuiNavbar style={{ width: "100%" }} />

      <div style={{ paddingTop: "64px" }}>
        <Menu>
          <SideBar />
        </Menu>

        <Container
          style={{
            display: "flex",
            paddingTop: 50,
            paddingLeft: 235,
            paddingRight: 0,
            border: "none",
          }}
        >
          {" "}
          <Box
            sx={{
              margin: 0,
              width: "80%",
              height: "90%",
              overflow: "hidden",
              border: "none",
            }}
          >
            <Profile />
          </Box>
          <Box
            sx={{
              ml: -5,
              width: "35%",
              height: "90%",
              overflow: "hidden",
              border: "none",
            }}
          >
            <SideIndicator />
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default ProfilePage;
