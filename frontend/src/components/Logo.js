import { Container, List, ListItem, Wrapper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./Logo.css";
import styled from "styled-components";

const Logo = () => {
  const charS = [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1];
  const charH = [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1];
  const charA = [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1];
  const charR = [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1];
  const charE = [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1];
  const charU = [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1];
  const charI = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
  const charMark = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
  const charT = [1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
  const charD = [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0];
  const StyledList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    width: 5%;
  `;
  const StyledListItem = styled.li`
    align-items: center;
    border: none;
    display: inline-flex;
    font-size: 100%;
    height: 20px;
    width: 18px;
    justify-content: center;
    margin-bottom: 0;
    margin-top: 0;
    outline: 0;
    text-align: left;
    background-color: ${(props) => (props.color === 1 ? "black" : "#F2F2F7")};
  `;

  return (
    <div>
      <Container sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "5%",
                left: "450px",
              }}
            >
              {charS.map((i, j) => (
                <StyledListItem key={j} color={i}></StyledListItem>
              ))}
            </List>
            <List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "5%",
                left: "450px",
              }}
            >
              {charH.map((i, j) => (
                <StyledListItem key={j} color={i}></StyledListItem>
              ))}
            </List>
            <List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "5%",
                left: "450px",
              }}
            >
              {charA.map((i, j) => (
                <StyledListItem key={j} color={i}></StyledListItem>
              ))}
            </List>
            <List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "5%",
                left: "450px",
              }}
            >
              {charR.map((i, j) => (
                <StyledListItem key={j} color={i}></StyledListItem>
              ))}
            </List>
            <List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "5%",
                left: "450px",
              }}
            >
              {charE.map((i, j) => (
                <StyledListItem key={j} color={i}></StyledListItem>
              ))}
            </List>
            {/* <List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "5%",
                left: "450px",
              }}
            >
              {charD.map((i) => (
                <StyledListItem color={i}></StyledListItem>
              ))}
            </List>
            <List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "5%",
                left: "450px",
              }}
            >
              {charMark.map((i) => (
                <StyledListItem color={i}></StyledListItem>
              ))}
            </List>
            <List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "5%",
                left: "450px",
              }}
            >
              {charI.map((i) => (
                <StyledListItem color={i}></StyledListItem>
              ))}
            </List>
            <List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "5%",
                left: "450px",
              }}
            >
              {charT.map((i) => (
                <StyledListItem color={i}></StyledListItem>
              ))}
            </List> */}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Logo;
