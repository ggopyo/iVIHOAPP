import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KakaoRegistered from "./apiCalls/kakao/KakaoRegistered";
import PassKakaoCode from "./apiCalls/kakao/PassKakaoCode";
import ProfilePage from "./pages/ProfilePage";
import KakaoLogin from "./apiCalls/kakao/KakaoLogin.js";
import TryPage from "./apiCalls/TryPage";
import Home from "./pages/Home";
import RegistrationForm from "./components/Navbar/RegistrationForm";
import LoginForm from "./components/UpPart/LoginForm";
import Sample from "./Sample";
// import LoginForm from "./components/HomeProfile/LoginForm";
// import Circle from "./components/Circle";
const { Kakao } = window;

const App = () => {
  return (
    <Router>
      <Routes>
        {/* how to 구현하면서 location, image와 통합하는 게 간편할 지 오히려 어려울 지 파악하려고 함. */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/api/oauth" element={<PassKakaoCode />} />
        <Route path="/api/login" element={<KakaoLogin />} />
        <Route path="/kakaoregistered" element={<KakaoRegistered />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/swapdata" element={<SwapData />} /> */}
        {/* <Route path="/modaloverlay" element={<ModalOverlay />} /> */}
        {/* <Route path="/circle" element={<Circle />} /> */}
        <Route path="/trypage" element={<TryPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sample" element={<Sample />} />
      </Routes>
    </Router>
  );
};

export default App;
