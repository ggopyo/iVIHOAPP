import MuiNavbar from "./Navbar/MuiNavbar";
import React, { useEffect, useRef } from "react";
import "./Circle.css";
import SideIndicator from "./Indicator/SideIndicator";
import HowtoIndicator from "./Indicator/HowtoIndicator";
import YoutubeIndicator from "./Indicator/YoutubeIndicator";
import ImageIndicator from "./Indicator/ImageIndicator";
import { Box, Container, Menu } from "@mui/material";
import SideBar from "./Sidebar/SideBar";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Circle() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const openCanvas = () => {
      const canvas = canvasRef.current;

      const ctx = canvas.getContext("2d");

      if (window.devicePixelRatio > 1) {
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);
      }

      let width = canvas.offsetWidth;
      let height = canvas.offsetHeight;
      let rotation = 0;
      let dots = [];

      const DOTS_AMOUNT = 1000;
      const DOT_RADIUS = 2;
      let GLOBE_RADIUS = width * 0.7;
      let GLOBE_CENTER_Z = -GLOBE_RADIUS;
      let PROJECTION_CENTER_X = width / 2;
      let PROJECTION_CENTER_Y = height / 2;
      let FIELD_OF_VIEW = width * 0.8;

      class Dot {
        constructor(x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;

          this.xProject = 0;
          this.yProject = 0;
          this.sizeProjection = 0;
        }
        project(sin, cos) {
          const rotX = cos * this.x + sin * (this.z - GLOBE_CENTER_Z);
          const rotZ =
            -sin * this.x + cos * (this.z - GLOBE_CENTER_Z) + GLOBE_CENTER_Z;
          this.sizeProjection = FIELD_OF_VIEW / (FIELD_OF_VIEW - rotZ);
          this.xProject = rotX * this.sizeProjection + PROJECTION_CENTER_X;
          this.yProject = this.y * this.sizeProjection + PROJECTION_CENTER_Y;
        }
        draw(sin, cos) {
          this.project(sin, cos);
          ctx.beginPath();
          ctx.arc(
            this.xProject,
            this.yProject,
            DOT_RADIUS * this.sizeProjection,
            0,
            Math.PI * 2
          );
          ctx.closePath();
          ctx.fill();
        }
      }

      function createDots() {
        dots.length = 0;

        for (let i = 0; i < DOTS_AMOUNT; i++) {
          const theta = Math.random() * 2 * Math.PI;
          const phi = Math.acos(Math.random() * 2 - 1);

          const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
          const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
          const z = GLOBE_RADIUS * Math.cos(phi) + GLOBE_CENTER_Z;
          dots.push(new Dot(x, y, z));
        }
      }

      function render(a) {
        ctx.clearRect(0, 0, width, height);

        rotation = a * 0.0004;

        const sineRotation = Math.sin(rotation);
        const cosineRotation = Math.cos(rotation);

        for (var i = 0; i < dots.length; i++) {
          dots[i].draw(sineRotation, cosineRotation);
        }

        window.requestAnimationFrame(render);
      }

      createDots();

      window.requestAnimationFrame(render);
    };
    openCanvas();
  }, []);
  return (
    <div>
      <MuiNavbar />
      <div style={{ paddingTop: "64px" }}>
        <Menu>
          <SideBar />
        </Menu>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "800px",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ width: "300px", height: "300px", marginLeft: "500px" }}
          />
          <Container
            style={{
              display: "flex",
              paddingTop: 50,
              paddingLeft: 235,
              paddingRight: 0,
              border: "none",
              height: "1000px",
            }}
          >
            <Box
              sx={{
                margin: 0,
                width: "25%",
                height: "90%",
                overflow: "hidden",
                border: "none",
              }}
            >
              <HowtoIndicator />
            </Box>
            <Box
              sx={{
                margin: 0,
                width: "25%",
                height: "90%",
                overflow: "hidden",
                border: "none",
              }}
            >
              <ImageIndicator />
            </Box>
            <Box
              sx={{
                margin: 0,
                width: "25%",
                height: "90%",
                overflow: "hidden",
                border: "none",
              }}
            >
              <YoutubeIndicator />
            </Box>
            <Box
              sx={{
                ml: -5,
                width: "35%",
                height: "90%",
                overflow: "hidden",
                border: "none",
              }}
            >
              <SideIndicator />
            </Box>
          </Container>
        </div>
      </div>
    </div>
  );
}
