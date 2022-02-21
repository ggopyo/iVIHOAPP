import axios from "axios";
import { useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import Navbar from "../../components/Navbar/Navbar";
import { slide as Menu } from "react-burger-menu";
const qs = require("qs");
const { kakaoLogin } = require("../general/apiCalls");

const kakao = {
  clientID: "8bd3289d1260c7686f31ae5cb5ee0ccb",
  redirectUri: "http://localhost:3000/api/oauth",
};

const kakaoGetToken = (dispatch, code) => {
  const getToken = async (req, res) => {
    const url = `https://kauth.kakao.com/oauth/token`;
    let tokenResponse;
    try {
      tokenResponse = await axios({
        method: "POST",
        url,
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        data: qs.stringify({
          grant_type: "authorization_code",
          client_id: kakao.clientID,
          redirect_uri: kakao.redirectUri,
          code,
        }),
      });
    } catch (error) {
      return res.json(error.data);
    }
    const { Kakao } = window;
    const access_token = tokenResponse.data.access_token;
    Kakao.Auth.setAccessToken(access_token);
    kakaoLogin(dispatch, tokenResponse);
  };
  getToken(code);
};

const PassKakaoCode = () => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");
  kakaoGetToken(dispatch, code);
  // 위에 kakaoLogin 함수를 콤포넌트로 만들면 dispatch를 그곳에서 형성해도되지만
  //과하게 구분한다고 생각해서 이곳에서 Dispatch 선언하고 함수 호출할 때 넘겨줌
  return (
    <div>
      <Navbar style={{ width: "100%" }} />
      <div style={{ paddingTop: "61px" }}>
        <Spinner />
      </div>
    </div>
  );
};

export default PassKakaoCode;
