import axios from "axios";
import { setToken } from "./token";

export const verifyAxios = (method, url) => {
  return axios({
    method: `${method}`,
    baseURL: "http://localhost:8000",
    url: `/api/auth/${url}`,
    withCredentials: true,
  }).then((result) => {
    if (result.data.result) {
      if (result.data.accessToken) {
        setToken("accessToken", result.data.accessToken);
      }
      if (result.data.refreshToken) {
        setToken("refreshToken", result.data.refreshToken);
      }
      return {
        isLogin: result.data.isLogin,
        userType: result.data.userType,
      };
    } else {
      return { isLogin: false };
    }
  });
};
