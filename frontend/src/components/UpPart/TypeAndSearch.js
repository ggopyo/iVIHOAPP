import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import SearchInputComponent from "./SearchInputComponent";
import SearchResultComponent from "./SearchResultComponent";

const TypeAndSearch = (props) => {
  const { searchInputProps, triggerTabObject, mySearchInputProps } = props;

  const { searchInputHandleSubmit, searchUpdated, result } = searchInputProps;
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
