import {
  alpha,
  Divider,
  InputBase,
  styled,
  InputAdornment,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
const SidebarSearchInputComponent = (props) => {
  const { setMySearchText, mySearchText } = props;

  const useStyles = makeStyles(() => ({
    noBorder: {
      border: "none",
    },
  }));
  const classes = useStyles();

  return (
    <div>
      {" "}
      <div
        style={{
          border: "solid 1px gray",
          width: "85px",
          marginBottom: "5px",
          height: "23px",
          borderRadius: "4px",
          //   marginTop: "-32px",
          display: "flex",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchIcon style={{ marginLeft: "2px", color: "black" }} />
        </div>
        <Divider
          orientation="vertical"
          style={{ marginLeft: "2px", color: "black" }}
        />
        <TextField
          className={classes.textField}
          placeholder="나의자료.."
          InputProps={{
            classes: { notchedOutline: classes.noBorder },
          }}
          style={{ marginTop: "-12px", marginLeft: "-8px", width: "100%" }}
          onChange={(event) => {
            setMySearchText(event.target.value);
          }}
          value={mySearchText}
          autoFocus
        />
      </div>
    </div>
  );
};

export default SidebarSearchInputComponent;
