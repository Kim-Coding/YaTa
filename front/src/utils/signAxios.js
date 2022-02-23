import axios from "axios";
import { setToken } from "../utils/token";

export const signInAxios = (method, url, userId, userPw) => {
  return axios({
    method: method,
    baseURL: "http://localhost:8000",
    url: `/api/auth/${url}`,
    data: {
      id: userId,
      pw: userPw,
    },
  }).then((res) => {
    if (res.data.result) {
      setToken("accessToken", res.data.accessToken);
      setToken("refreshToken", res.data.refreshToken);
      if (res.data.userType === "일반인") {
        return "일반인";
      } else {
        return "드라이버";
      }
    } else {
      alert("아이디 비밀번호 확인해주세요");
    }
  });
};

export const signUpAxios = (method, url, userId, userPw, userType) => {
  return axios({
    method: method,
    baseURL: "http://localhost:8000",
    url: `/api/auth/${url}`,
    data: {
      id: userId,
      pw: userPw,
      userType: userType,
    },
  }).then((res) => {
    if (res.data.result) {
      alert("회원가입에 성공하셨습니다. 로그인 후 이용해 주세요");
      return true;
    }
    if (res.data.err) {
      alert("회원가입에 실패하였습니다. 아이디 중복");
      return false;
    }
  });
};
