// src/api/axiosClient.js
import axios from "axios";
import queryString from "query-string";

export const HTTP_CONSTANTS = {
  PROXY_SERVER: import.meta.env.VITE_APP_API_BASE_URL,
  HTTP_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const axiosClient = axios.create({
  baseURL: HTTP_CONSTANTS.PROXY_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRequest = async (URL: string) => {
  try {
    const { data } = await axiosClient.get(
      queryString.stringifyUrl({
        url: `${HTTP_CONSTANTS?.PROXY_SERVER}/${URL}`,
      })
    );
    return data;
  } catch (error: any) {
    console.log(error?.message);
    console.log(error?.response?.data?.message);
    if (error?.response?.data?.message) {
      throw error?.response?.data?.message;
    } else throw error?.message;
  }
};
