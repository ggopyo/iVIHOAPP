import React from "react";

import { Container } from "@mui/material";
import { Box } from "@mui/material";
import Indicator from "./ImageIndicator";
import SideShow from "../SideShow";

const Indicators = (props) => {
  return (
    <Container
      style={{
        display: "flex",
        paddingTop: 50,
        paddingRight: 0,
        border: "none",
        width: "1210px",
        marginLeft: "-40px",
        marginTop: "-50px",
        marginBottom: "10px",
        height: "995px",
      }}
    >
      <Box
        sx={{
          marginLeft: "15px",
          width: "247px",
          height: "100%",
          overflow: "hidden",
          border: "none",
        }}
      >
        {" "}
        <Indicator identifier="howto" />
      </Box>
      <Box
        sx={{
          marginLeft: "15px",
          width: "247px",
          height: "100%",
          overflow: "hidden",
          border: "none",
        }}
      >
        {" "}
        <Indicator identifier="youtube" />
      </Box>{" "}
      <Box
        sx={{
          marginLeft: "15px",
          width: "247px",
          height: "100%",
          overflow: "hidden",
          border: "none",
        }}
      >
        <Indicator identifier="image" />
      </Box>
      <Box
        sx={{
          ml: -5.7,
          width: "429px",
          height: "950px",
          overflow: "hidden",
          border: "none",
        }}
      >
        <SideShow />
      </Box>
    </Container>
  );
};

export default Indicators;
