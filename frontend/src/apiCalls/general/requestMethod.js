import axios from "axios";
import { afs } from "./tryData";

const BASE_URL = "http://localhost:5000/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;

const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  // header: { token: `Bearer ${TOKEN}` },
});

export const kakaoUserRequest = axios.create({
  baseURL: BASE_URL,
  //header: { token: `Bearer ${TOKEN}` },
});

export const dataRequest = axios.create({
  baseURL: BASE_URL,
});
