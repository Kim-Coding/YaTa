import axios from "axios";

const instance = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
  });
};

const request = {
  post: async ({ uri = "", data = {} }) => {
    try {
      const response = await instance().post(uri, data);
      return response;
    } catch (err) {
      throw new Error(err);
    }
  },

  get: async ({ uri = "" }) => {
    try {
      const response = await instance().get(uri);

      return response;
    } catch (err) {
      throw new Error(err);
    }
  },

  delete: async ({ uri = "" }) => {
    try {
      const response = await instance().delete(uri);

      return response;
    } catch (err) {
      throw new Error(err);
    }
  },

  put: async ({ uri = "", data = {} }) => {
    try {
      const response = await instance().put(uri, data);

      return response;
    } catch (err) {
      throw new Error(err);
    }
  },
};

export default request;
