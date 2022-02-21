import { Container } from "@mui/material";
import React from "react";

const BottomMargin = () => {
  return (
    <Container
      style={{ marginLeft: "80px", marginRight: "0px", width: "1200px" }}
    >
      <div
        style={{
          width: "99%",
          height: "30px",
          marginTop: "0px",
          marginLeft: "10px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          marginBottom: "435px",
          backgroundColor: "#0E5711",
        }}
      ></div>
    </Container>
  );
};

export default BottomMargin;
