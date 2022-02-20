import React from "react";
import TopDivider from "./TopDivider";
const NeedLogin = () => {
  return (
    <div style={{ marginLeft: "5px" }}>
      <div
        style={{
          width: "360px",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "14px",
        }}
      >
        로그인이 필요합니다
      </div>
    </div>
  );
};

export default NeedLogin;
