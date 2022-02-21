import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KakaoRegistered from "./apiCalls/kakao/KakaoRegistered";
import PassKakaoCode from "./apiCalls/kakao/PassKakaoCode";
import KakaoLogin from "./apiCalls/kakao/KakaoLogin.js";
import Home from "./pages/Home";
import RegistrationForm from "./components/Navbar/RegistrationForm";
import LoginForm from "./components/UpPart/LoginForm";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* how to 구현하면서 location, image와 통합하는 게 간편할 지 오히려 어려울 지 파악하려고 함. */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/api/oauth" element={<PassKakaoCode />} />
        <Route path="/api/login" element={<KakaoLogin />} />
        <Route path="/kakaoregistered" element={<KakaoRegistered />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;
