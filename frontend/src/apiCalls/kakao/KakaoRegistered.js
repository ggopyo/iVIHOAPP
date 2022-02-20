import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneId, userRegister } from "../apiCalls";
const KakaoRegistered = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login.currentUser);

  const getOne = async (username) => {
    try {
      const res = await getOneId(username);

      if (res.code !== "success") {
        userRegister(dispatch, currentUser);
        return window.location.assign("/kakaoregistered");
      } else return window.location.assign("/");
    } catch (err) {
      console.log(err);
    }
  };
  getOne(currentUser.username);
};

export default KakaoRegistered;
