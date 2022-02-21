import axios from "axios";

export const verifyAxios = (method, url) => {
  return axios({
    method: `${method}`,
    baseURL: "http://localhost:8000",
    url: `/api/auth/${url}`,
    withCredentials: true,
  });
};
