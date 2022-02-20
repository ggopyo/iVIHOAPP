import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import SlideBar from "./SlideBar";
const SideBar = () => {
  return (
    <>
      <div class="slide-bar">
        <SlideBar />
      </div>
    </>
  );
};

export default SideBar;
