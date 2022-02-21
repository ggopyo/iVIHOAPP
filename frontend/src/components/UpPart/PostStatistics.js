import {
  AutoAwesomeMotion,
  Comment,
  Favorite,
  SwapHorizontalCircle,
} from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import React from "react";

const PostStatistic = (props) => {
  const { statistic } = props;
  return (
    <div
      style={{
        height: "260px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div style={{ width: "49%", height: "50%" }}>
        {" "}
        <Paper
          elevation={3}
          style={{
            height: "98%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <AutoAwesomeMotion
            color="primary"
            style={{ width: "50px", height: "50px" }}
          />
          <div style={{ marginTop: "2.5px" }}>데이터 수</div>{" "}
          <Typography variant="h3" style={{ marginTop: "2.5px" }}>
            {statistic.dataCount}
          </Typography>
        </Paper>
      </div>
      <div style={{ width: "49%", height: "50%", marginLeft: "5px" }}>
        {" "}
        <Paper
          elevation={3}
          style={{
            height: "98%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Comment color="primary" style={{ width: "50px", height: "50px" }} />
          <div style={{ marginTop: "2.5px" }}>받은 댓글 수</div>{" "}
          <Typography variant="h3" style={{ marginTop: "2.5px" }}>
            {statistic.commentsCount}
          </Typography>
        </Paper>
      </div>
      <div style={{ marginTop: "3px", width: "49%", height: "50%" }}>
        <Paper
          elevation={3}
          style={{
            height: "98%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Favorite color="primary" style={{ width: "50px", height: "50px" }} />
          <div style={{ marginTop: "2.5px" }}>받은 좋아요 수</div>
          <Typography variant="h3" style={{ marginTop: "2.5px" }}>
            {statistic.likesCount}
          </Typography>
        </Paper>
      </div>
      <div
        style={{
          marginTop: "3px",
          width: "49%",
          height: "50%",
          marginLeft: "5px",
        }}
      >
        <Paper
          elevation={3}
          style={{
            height: "98%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <SwapHorizontalCircle
            color="primary"
            style={{ width: "50px", height: "50px" }}
          />
          <div style={{ marginTop: "2.5px" }}>스왑 수</div>{" "}
          <Typography variant="h3" style={{ marginTop: "2.5px" }}>
            {statistic.swapsCount}
          </Typography>
        </Paper>
      </div>
    </div>
  );
};

export default PostStatistic;
