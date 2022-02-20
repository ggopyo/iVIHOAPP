import React from "react";
import SendLogin from "./PassKakaoCode";

const OAuth = () => {
  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  alert(code);
  return <SendLogin code={code}></SendLogin>;
};

export default OAuth;
