import { Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import LearnRepeat from "../../pages/LearnRepeat";
import LearnRepeatBelow from "../../pages/LearnRepeatBelow";
import Indicators from "../Indicator/Indicators";

import MyDataGrid from "../UpPart/MyDataGrid";

const ModifyPage = (props) => {
  const { tab, setTab, myGridResult, firstRef } = props;

  const currentUser = useSelector((state) => state.login.currentUser);
  const currentPost = useSelector((state) => state.post.currentPost);

  return (
    <Container
      style={{
        marginLeft: "80px",
        marginRight: "0px",
        marginTop: "5px",
        width: "1200px",
      }}
    >
      {tab === 0 && (
        <>
          {currentUser && currentPost ? (
            currentUser.username !== "guest" ? (
              <></>
            ) : (
              <>
                {" "}
                <Indicators />
              </>
            )
          ) : (
            <> </>
          )}
        </>
      )}

      {tab === 2 && (
        <>
          {currentUser ? (
            currentUser.username !== "guest" ? (
              <MyDataGrid
                setTab={setTab}
                whichData="root"
                myGridResult={myGridResult}
              />
            ) : (
              <>
                {" "}
                <Indicators />
              </>
            )
          ) : (
            <> </>
          )}
        </>
      )}
      {tab === 4 && (
        <>
          {currentUser ? (
            currentUser.username !== "guest" ? (
              <></>
            ) : (
              <>
                <Indicators />
              </>
            )
          ) : (
            <> </>
          )}
        </>
      )}
      {tab === 6 && (
        <>
          {currentUser ? (
            currentUser.username !== "guest" ? (
              <>
                {" "}
                <MyDataGrid setTab={setTab} myGridResult={myGridResult} />{" "}
              </>
            ) : (
              <>
                <Indicators />
              </>
            )
          ) : (
            <> </>
          )}
        </>
      )}
      {tab === 8 && (
        <>
          {currentUser && currentPost ? (
            currentUser.username !== "guest" ? (
              <>
                <div style={{ marginLeft: "-25px", marginTop: "-16px" }}>
                  <LearnRepeat />
                </div>
                <MyDataGrid setTab={setTab} myGridResult={myGridResult} />{" "}
              </>
            ) : (
              <>
                {" "}
                <Indicators />
              </>
            )
          ) : (
            <> </>
          )}
        </>
      )}
      {tab === 10 && (
        <>
          {currentUser && currentPost ? (
            currentUser.username !== "guest" ? (
              <div style={{ marginLeft: "-16px", marginTop: "-16px" }}>
                <LearnRepeatBelow />{" "}
              </div>
            ) : (
              <>
                {" "}
                <Indicators />
              </>
            )
          ) : (
            <></>
          )}
        </>
      )}
      <div ref={firstRef} />
    </Container>
  );
};

export default ModifyPage;
