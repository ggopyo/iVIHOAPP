import { Button, Divider } from "@mui/material";
import React from "react";

const TopDivider = (props) => {
  const { title, setTab } = props;
  return (
    <div style={{ marginLeft: "5px" }}>
      {" "}
      <Divider
        style={{
          backgroundColor: "#C0C0C0",
          marginTop: "10px",
          borderWidth: "0.5px",

          width: "100%",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "0.5px 0px 0.5px 0px",
          fontSize: "14px",
          color: "white", //#1976D2
          backgroundColor: "black",
        }}
      >
        {title}{" "}
        {title.includes("내 자료검색 결과") ? (
          <Button
            variant="contained"
            size="small"
            style={{
              marginLeft: "130px",
              height: "20px",
            }}
            onClick={() => setTab(6)}
          >
            테이블에서 보기
          </Button>
        ) : (
          <></>
        )}
      </div>
      <Divider
        style={{
          backgroundColor: "#C0C0C0",
          borderWidth: "0.5px",
          width: "100%",
        }}
      />
    </div>
  );
};

export default TopDivider;
