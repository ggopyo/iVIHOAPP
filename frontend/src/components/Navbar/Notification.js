import MyList from "./MyList";
import React from "react";
import { Box } from "@mui/system";
import "./RegistrationForm.css";
const Notification = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#E95F6E",
          marginLeft: "-32px",
          marginTop: "-34px",
          marginBottom: "10px",
          width: "338px",
          height: "30px",
          color: "white",
          alignItems: "center",
        }}
      >
        <Box sx={{ position: "absolute", top: "3px", left: "5px" }}>로그인</Box>
      </div>
      <MyList />
    </>
  );
};
export default Notification;
//https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
//   https://www.regextester.com/99041
