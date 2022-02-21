import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getOneEmail, getOneId, userRegister } from "../../apiCalls/apiCalls";
import "./RegistrationForm.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rewritePassword, setRewritePassword] = useState("");
  const [address, setAddress] = useState("");
  const [mobilephone, setMobilephone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRewritePassword, setShowRewritePassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState();
  const [passwordSymbolMessage, setPasswordSymbolMessage] = useState();
  const [idValidateMessage, setIdValidateMessage] =
    useState("아이디 중복 검사");
  const [emailValidateMessage, setEmailValidateMessage] =
    useState("이메일 중복 검사");
  const dispatch = useDispatch();
  const [agreementChecked, setAgreementChecked] = useState(false);

  const handleChange = (event) => {
    setAgreementChecked(event.target.checked);
  };

  const idValidator = async (username) => {
    let { code } = await getOneId(username);
    if (username === "") {
      alert("입력이 되지 않았습니다");
      setIdValidateMessage("입력이 되지 않았습니다");
    } else if (code === "success") {
      alert("중복된 아이디입니다");
      setIdValidateMessage("중복된 아이디입니다");
    } else setIdValidateMessage("사용 가능합니다");
  };

  const emailValidator = async (email) => {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let { code } = await getOneEmail(email);
    if (email === null) {
      alert("입력이 되지 않았습니다");
      setEmailValidateMessage("입력이 되지 않았습니다");
    } else if (code === "success") {
      alert("중복된 이메일입니다");
      setEmailValidateMessage("중복된 이메일입니다");
    } else if (emailRegex.test(email) === false) {
      alert("이메일 형식이 잘못되었습니다.");
      setEmailValidateMessage("이메일 형식이 잘못되었습니다.");
    } else setEmailValidateMessage("사용 가능합니다");
  };

  const formSubmit = (e) => {
    e.preventDefault();
    var passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (password !== rewritePassword) {
      setPassword("");
      setRewritePassword("");
      setPasswordMessage("비밀번호 입력이 잘못되었습니다.");
      alert("다시 작성해 주십시오");
    } else if (
      !(passwordRegex.test(password) && passwordRegex.test(rewritePassword))
    ) {
      setPassword("");
      setRewritePassword("");
      setPasswordSymbolMessage(
        "비밀번호는 숫자와 특수문자(!,@,#,$,%,^,&,*)를 포함해야 합니다."
      );

      alert("다시 작성해 주십시오");
      console.log({
        name,
        username,
        email,
        password,
        address,
        mobilephone,
        birthday,
      });
    } else if (
      emailValidateMessage === "사용 가능합니다" &&
      idValidateMessage === "사용 가능합니다"
    ) {
      userRegister(dispatch, {
        name,
        username,
        email,
        password,
        address,
        mobilephone,
        birthday,
        profileimage: "null",
        howto: [],
        youtube: [],
        image: [],
      });
    } else alert("다시 작성해 주십시오");
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowRewritePassword = () => {
    setShowRewritePassword(!showRewritePassword);
  };

  const handleMouseDownRewritePassword = (event) => {
    event.preventDefault();
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
    <div style={{ width: "700px" }}>
      <div
        style={{
          backgroundColor: "#FFFBF2",
          marginTop: "-33px",
          marginLeft: "-33px",
          marginBottom: "30px",
          width: "100%",
          height: "50px",
          border: "0.1px solid lightgray",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            fontSize: "20px",
            color: "black",
            top: "10px",
            left: "15px",
          }}
        >
          회원가입
        </Box>
      </div>
      <Box
        sx={{
          display: "flex",
          marginLeft: "-10px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
            <TextField
              required
              onChange={(e) => {
                setIdValidateMessage("아이디 중복 검사");
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
              width: "26.5ch",
              height: "8ch",
              border: "solid 0.1px lightgray",
              color: "black",
              backgroundColor: "#FFFBF2",
            }}
            variant="outlined"
            onClick={(e) => idValidator(username)}
          >
            {idValidateMessage}
          </Button>

          <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
            <TextField
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPasswordMessage();
                setPasswordSymbolMessage();
                setPassword(e.target.value);
              }}
              className={classes.root}
              variant="standard"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="비밀번호 입력"
            />
          </FormControl>
          <Button
            tabIndex={-1}
            required
            name="passwordSymbolMessage"
            sx={{
              m: 1,
              width: "26.5ch",
              height: "8ch",
              borderBottom: "solid 0.1px lightgray",
              color: "black",
            }}
          >
            {passwordSymbolMessage}
          </Button>

          <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
            <TextField
              required
              onChange={(e) => {
                setEmailValidateMessage("이메일 중복 검사");
                setEmail(e.target.value);
              }}
              label="이메일"
              name="email"
              type="email"
              placeholder="이메일"
              className={classes.root}
              variant="standard"
            />
          </FormControl>
          <Button
            sx={{
              m: 1,
              width: "26.5ch",
              height: "8ch",
              border: "solid 0.1px lightgray",
              color: "black",
              backgroundColor: "#FFFBF2",
            }}
            variant="outlined"
            onClick={() => emailValidator(email)}
          >
            {emailValidateMessage}
          </Button>

          <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
            <TextField
              id="outlined-adornment-password"
              type={showRewritePassword ? "text" : "password"}
              value={rewritePassword}
              onChange={(e) => {
                setPasswordMessage();
                setPasswordSymbolMessage();
                setRewritePassword(e.target.value);
              }}
              className={classes.root}
              variant="standard"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowRewritePassword}
                    onMouseDown={handleMouseDownRewritePassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="비밀번호 재입력"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
            <Button
              disablePointerEvents={true}
              tabIndex={-1}
              required
              name="passwordMessage"
              sx={{
                width: "26.5ch",
                borderBottom: "solid 0.1px lightgray",
                color: "black",
                height: "8ch",
              }}
            >
              {passwordMessage}
            </Button>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
            <TextField
              required
              onChange={(e) => setName(e.target.value)}
              label="이름"
              name="name"
              placeholder="이름"
              className={classes.root}
              variant="standard"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
            <TextField
              required
              onChange={(e) => setBirthday(e.target.value)}
              label="생일"
              name="birthday"
              placeholder="생일"
              className={classes.root}
              variant="standard"
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
            <TextField
              required
              onChange={(e) => setMobilephone(e.target.value)}
              label="전화번호"
              name="mobilephone"
              placeholder="전화번호"
              className={classes.root}
              variant="standard"
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: "42ch" }} variant="outlined">
            <TextField
              required
              onChange={(e) => setAddress(e.target.value)}
              label="주소"
              name="address"
              placeholder="주소"
              className={classes.root}
              variant="standard"
            />
          </FormControl>
        </div>
        <div>
          <div>
            <FormControl
              sx={{ m: -3, width: "20ch" }}
              variant="outlined"
            ></FormControl>

            <Button
              sx={{
                mt: "10",
                ml: 9.7,
                width: "26.5ch",
                backgroundColor: "#FFFBF2",
                height: "8ch",
                color: "black",
              }}
              variant="contained"
              onClick={(e) => formSubmit(e)}
            >
              가입하기
            </Button>
            <Link to="/api/login">
              <Button>
                <Paper>
                  <img
                    style={{ width: "155px", height: "45px" }}
                    src=".\image\kakao_login_large_narrow.png"
                  />
                </Paper>
              </Button>
            </Link>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Checkbox
              checked={agreementChecked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            「iVIHO 웹사이트」 통합회원 가입 및 서비스 이용을 위한 정보 제공에
            동의합니다.
          </div>
        </div>
      </Box>
    </div>
  );
};
export default RegistrationForm;
//https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
//   https://www.regextester.com/99041
