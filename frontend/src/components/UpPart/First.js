import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import FirstTab from "./FirstTab";
import { dataRequest, publicRequest } from "../../apiCalls/requestMethod";

export default function Profile(props) {
  const {
    executeScroll,
    executeScroll2,
    firstRef,
    secondRef,
    thirdRef,
    tab,
    setTab,
    mySearchInputProps,
    triggerTabObject,
    myProfileGroup,
    myDataGroup,
  } = props;

  return (
    <Paper
      elevation={1}
      style={{
        marginLeft: "5px",
        marginRight: "5px",
        marginTop: "5px",
      }}
    >
      <FirstTab
        myDataGroup={myDataGroup}
        executeScroll={executeScroll}
        executeScroll2={executeScroll2}
        firstRef={firstRef}
        secondRef={secondRef}
        thirdRef={thirdRef}
        tab={tab}
        setTab={setTab}
        mySearchInputProps={mySearchInputProps}
        triggerTabObject={triggerTabObject}
        // removePostUpdate={removePost}
        myProfileGroup={myProfileGroup}
      />
    </Paper>
  );
}
