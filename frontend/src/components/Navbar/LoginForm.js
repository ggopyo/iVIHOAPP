import { Button, FormControl, TextField } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../apiCalls/general/apiCalls";
import "./RegistrationForm.css";
import { select } from "../../redux/postRedux";
import { publicRequest } from "../../apiCalls/general/requestMethod";
import { makeStyles } from "@mui/styles";
const LoginForm = ({ registrationHandleOpen }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const formSubmit = (e) => {
    e.preventDefault();
    userLogin(dispatch, {
      username,
      password,
    });
  };

  const guestLogin = (e) => {
    const getOneHowto = async (userid, username) => {
      try {
        const returnedHowto = await publicRequest.get(
          "/data/howto/by/" + "61eeeb364c7d37622fce957d"
        );

        dispatch(select(returnedHowto.data[0]));
        return window.location.assign("/");
      } catch (err) {
        console.log(err);
      }
    };
    const username = "ggopyo";
    const password = "abcd123$";
    userLogin(dispatch, {
      username,
      password,
    }).then((user) => {
      getOneHowto(user._id, user.username);
    });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& div.MuiBackdrop-root": {
        backgroundColor: "black",
      },
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
      <div style={{}}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            top: "3px",
            marginLeft: "-5.5px",
            marginTop: "-4px",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            border: "solid 0.1px lightgray",
            width: "347px",
            height: "30px",
            left: "5px",
            color: "black",
            backgroundColor: "#FFFBF2",
          }}
        >
          &nbsp;&nbsp;&nbsp;로그인
        </Box>
      </div>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <div>
          <FormControl
            sx={{ m: 1, width: "22ch", height: "4.5ch" }}
            variant="outlined"
          >
            <TextField
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              label="아이디"
              name="username"
              placeholder="아이디"
              className={classes.root}
              variant="standard"
            />
          </FormControl>

          <Button
            sx={{
              m: 1,
              width: "13.0ch",
              height: "8ch",
              border: "solid 0.1px lightgray",
              color: "black",
              backgroundColor: "#FFFBF2",
            }}
            tabIndex={-1}
            variant="outlined"
            onClick={registrationHandleOpen}
          >
            회원가입
          </Button>
          <FormControl sx={{ m: 1, width: "22ch", height: "4.5ch" }}>
            <TextField
              id="outlined-adornment-password"
              type="password"
              value={password}
              name="password"
              className={classes.root}
              variant="standard"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="비밀번호"
            />
          </FormControl>
          <Button
            sx={{
              m: 1,
              width: "12.5ch",
              color: "black",
              height: "8ch",
              backgroundColor: "#FFFBF2",
              border: "solid 0.1px lightgray",
            }}
            variant="outlined"
            onClick={(e) => formSubmit(e)}
          >
            로그인
          </Button>
        </div>
        <Button
          sx={{
            m: 1,
            width: "45.3ch",
            color: "black",
            height: "8ch",
            backgroundColor: "#FFFBF2",
            border: "solid 0.1px lightgray",
          }}
          variant="outlined"
          onClick={() => guestLogin()}
        >
          회원가입 없이 계속하기
        </Button>
      </Box>
    </>
  );
};
export default LoginForm;
