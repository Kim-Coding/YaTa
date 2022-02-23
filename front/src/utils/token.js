import { verifyAxios } from "./verifyAxios";

const token = (type) => {
  return document.cookie
    ? document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${type}Token`))
        .split("=")
    : null;
};

export const setToken = (tokenName, token) => {
  document.cookie = `${tokenName}=${token}`;
};

export const getToken = (type) => {
  return token(type)[1];
};

export const removeToken = () => {
  document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export const isToken = () => {
  return verifyAxios("get", "verify");
};
