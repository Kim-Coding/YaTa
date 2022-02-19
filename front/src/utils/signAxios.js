import axios from "axios";

export const signInAxios = (method, url, userId, userPw) => {
  return axios({
    method: method,
    baseURL: "http://localhost:8000",
    url: `/api/auth/${url}`,
    data: {
      id: userId,
      pw: userPw,
    },
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
  });
};
