import React from "react";
import "./KakaoLogin.css";
import PassKakaoCode from "./PassKakaoCode";

const KakaoLogin = () => {
  const { Kakao } = window;
  const scope = "profile_nickname,profile_image, account_email,birthday";
  const REDIRECT_URI = "http://localhost:3000/api/oauth";
  Kakao.Auth.authorize({ redirectUri: REDIRECT_URI, scope });
  return <PassKakaoCode />;
};

export default KakaoLogin;
