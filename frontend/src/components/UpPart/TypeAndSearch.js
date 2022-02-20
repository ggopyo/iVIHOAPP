import {
  Avatar,
  Button,
  ButtonBase,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { afs } from "../../apiCalls/tryData";
import { dataRequest } from "../../apiCalls/requestMethod";

import SearchInputComponent from "./SearchInputComponent";
import { Comment, Favorite } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import SearchResultComponent from "./SearchResultComponent";

const TypeAndSearch = (props) => {
  const { searchInputProps, triggerTabObject, mySearchInputProps } = props;

  const {
    searchInputHandleSubmit,
    searchUpdated,
    setSearchUpdated,
    result,
    setTab,
  } = searchInputProps;
  useEffect(() => {}, [searchUpdated]);
  const [searchText, setSearchText] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState();

  return (
    <div style={{ overflow: "hidden", width: "358px" }}>
      {result.length === 0 ? (
        <>
          <div style={{ marginLeft: "45px", marginTop: "126px" }}>
            <form
              onSubmit={(event) => {
                searchInputHandleSubmit(event, searchText);
                setSearchText("");
              }}
            >
              <SearchInputComponent
                setSearchText={setSearchText}
                searchText={searchText}
                searchInputProps={searchInputProps}
              />
              <Button
                type="submit"
                style={{
                  display: "none",
                }}
              />
            </form>
            {searchUpdated && searchText.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  justifyContent: "center",
                }}
              >
                검색 결과가 없습니다
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <SearchResultComponent
          result={result}
          mySearchInputProps={mySearchInputProps}
          searchIdentifier="searchResult"
          triggerTabObject={triggerTabObject}
        />
      )}
    </div>
  );
};

export default TypeAndSearch;
