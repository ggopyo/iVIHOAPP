import { Button, FormControl, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../apiCalls/apiCalls";

import { makeStyles } from "@mui/styles";
import { getNewest } from "../../apiCalls/tryData";
import { select } from "../../redux/postRedux";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const getOneHowto = async (userid, username) => {
    try {
      getNewest().then((data) => {
        const time = Date.now();

        if (time % 3 === 0) dispatch(select(data.newestimage));
        if (time % 3 === 1) dispatch(select(data.newestyoutube));
        if (time % 3 === 2) dispatch(select(data.newesthowto));
      });
      return window.location.assign("/" + username);
    } catch (err) {
      console.log(err);
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    userLogin(dispatch, {
      username,
      password,
    }).then((user) => {
      getOneHowto(user._id, user.username);
    });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& label.Mui-focused": {
        borderBottomColor: "#ffe8b3",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#ffe8b3",
      },
      "& .MuiInput-underline:before": {
        borderBottomColor: "#ffe8b3",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#ffe8b3",
        },
        "&:hover fieldset": {
          borderColor: "#ffe8b3",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#ffe8b3",
        },
      },
    },
  }));
  const classes = useStyles();
  return (
    <>
      <div
        style={{
          width: "100%",
        }}
      >
        <div>
          <FormControl
            style={{
              marginTop: "70px",
              marginLeft: "90px",
              top: "20px",
            }}
            variant="outlined"
          >
            <TextField
              required
              label="아이디"
              name="username"
              placeholder="아이디"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className={classes.root}
              style={{ width: "180px" }}
              id="input-with-icon-textfield"
              margin="normal"
              variant="standard"
            />
          </FormControl>
        </div>
        <div>
          <form
            style={{ paddingTop: "0px", marginLeft: "90px" }}
            variant="outlined"
          >
            <TextField
              required
              label="비밀번호"
              type="password"
              name="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={classes.root}
              style={{ width: "180px" }}
              id="input-with-icon-textfield"
              margin="normal"
              variant="standard"
            />
          </form>
        </div>
        <div style={{ display: "flex", marginLeft: "67px" }}>
          <Button
            style={{ width: "130px", marginLeft: "10px" }}
            onClick={(e) => formSubmit(e)}
          >
            로그인
          </Button>
          <div style={{ marginTop: "3px", fontSize: "15px" }}>|</div>
          <Button style={{ width: "130px" }}>회원가입</Button>
          <div style={{ marginTop: "3px", fontSize: "15px" }}>|</div>
          <Button style={{ width: "130px", marginRight: "10px" }}>
            계정찾기
          </Button>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
