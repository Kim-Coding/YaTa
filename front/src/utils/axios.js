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
      const { data: error } = err.response;

      throw new Error(error.message);
    }
  },

  get: async ({ uri = "" }) => {
    try {
      const response = await instance().get(uri);

      return response;
    } catch (err) {
      const { data: error } = err.response;

      throw new Error(error.message);
    }
  },

  delete: async ({ uri = "" }) => {
    try {
      const response = await instance().delete(uri);

      return response;
    } catch (err) {
      const { data: error } = err.response;

      throw new Error(error.message);
    }
  },

  put: async ({ uri = "", data = {} }) => {
    try {
      const response = await instance().put(uri, data);

      return response;
    } catch (err) {
      const { data: error } = err.response;

      throw new Error(error.message);
    }
  },
};

export default request;
