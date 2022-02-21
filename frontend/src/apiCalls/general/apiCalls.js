import { dataRequest, kakaoUserRequest, userRequest } from "./requestMethod";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from "../../redux/loginRedux";
import { afs, createPost } from "./tryData";

export const kakaoLogin = async (dispatch, tokenResponse) => {
  dispatch(loginStart());
  try {
    const res = await kakaoUserRequest.post("/auth/kakaoLogin", tokenResponse);

    if (res.data.code === "success") {
      dispatch(loginSuccess(res.data));
      return window.location.assign("/");
    }
  } catch (err) {
    dispatch(loginFailure());
    console.log(err);
  }
};

const registerFirstPost = (postSort, values) => {
  //자료가 제출됐을 때 동작되는 함수
  let postData = new FormData();
  if (postSort === "image") {
    if (values.photo) {
      postData.append("photo", values.photo);
      // postData.append("core.data.file", values.photo);
      postData.append("core.eitherType", "file");
    } else {
      postData.append("core.data.link", values.core);
      postData.append("core.eitherType", "link");
    }
  } else if (postSort === "youtube") {
    postData.append("core", values.core);
  } else if (postSort === "howto") {
    postData.append("core", values.core);
    // postData.append("logo", howtoLogoId);
  }
  postData.append("title", values.title);
  postData.append("desc", values.desc);
  postData.append("category", values.category);
  postData.append("identifier", postSort);
  postData.append("owner", values.id);

  createPost(postSort, postData);
};

export const userRegister = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post("/auth/register", user);

    if (res.data.code === "success") {
      dispatch(logout());

      registerFirstPost("image", {
        core: "https://media.istockphoto.com/photos/collection-of-round-popular-social-media-black-logos-picture-id660687774?k=20&m=660687774&s=612x612&w=0&h=DvIaQIzpMaGXF1sKT5k-TR_l-ge233h57_QGgrcQ27E=",
        title: "환영합니다.",
        desc: "Image를 등록해주세요",
        category: "starter",
        id: res.data._id,
      });
      registerFirstPost("howto", {
        core: "http://www.iVIHO.com/",
        title: "환영합니다. ",
        logo: "61f3eb2cb66ee9f86006d052",
        desc: "Howto를 등록해주세요",
        category: "starter",
        id: res.data._id,
      });
      registerFirstPost("youtube", {
        core: "https://www.youtube.com/watch?v=p2vpqKBPj4U",
        title: "환영합니다. ",
        desc: "Video를 등록해주세요",
        category: "starter",
        id: res.data._id,
      });
      alert("회원가입이 완료되었습니다. 로그인을 해 주세요.");
      return window.location.assign("/");
    }
  } catch (err) {
    alert("회원가입이 실패했습니다.");
    console.log(err);
  }
};

export const userLogin = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post("/auth/login", user);

    if (res.data.code === "success") {
      dispatch(loginSuccess(res.data));

      return window.location.assign("/");
    }
  } catch (err) {
    dispatch(loginFailure());
    console.log(err);
  }
};

// export const getAllData = async () => {
//     try {
//       const res = await dataRequest.get("/howto/find/");
//       console.log(1, res);
//       if (res.data.code === "success") {
//         useDispatch(searchSuccess(res.data));
//       }
//       } catch (err) {
//       console.log(err);
//     }
//   }; // getAllData
//  // getAllData()

export const getOneId = async (username) => {
  try {
    const res = await dataRequest.get("/user/username/" + username);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getOneEmail = async (email) => {
  try {
    const res = await dataRequest.get("/user/email/" + email);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
