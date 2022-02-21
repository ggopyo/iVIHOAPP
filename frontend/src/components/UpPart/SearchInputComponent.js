import { Divider } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
const SearchInputComponent = (props) => {
  const { setSearchText, searchText } = props;

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
          width: "250px",
          marginLeft: "24px",
          height: "33px",
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
          <SearchIcon style={{ marginLeft: "10px", color: "black" }} />
        </div>
        <Divider
          orientation="vertical"
          style={{ marginLeft: "5px", color: "black" }}
        />
        <TextField
          className={classes.textField}
          placeholder="검색어입력.."
          InputProps={{
            classes: { notchedOutline: classes.noBorder },
          }}
          style={{ marginTop: "-8px", marginLeft: "-4px", width: "100%" }}
          onChange={(event) => setSearchText(event.target.value)}
          value={searchText ? searchText : ""}
          autoFocus
        />
      </div>
    </div>
  );
};

export default SearchInputComponent;
