// src/api/axiosClient.js
import axios from "axios";
import queryString from "query-string";

// PROXY_SERVER: "http://localhost:4000",
export const HTTP_CONSTANTS = {
  PROXY_SERVER: "https://jira-issues-736nxkpjk-kiran-pvs-projects.vercel.app",
  PROXY_SERVER: "http://localhost:4000",
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

export default axiosClient;

export const getRequest = async (URL: string) => {
  try {
    const { data } = await axiosClient.get(
      queryString.stringifyUrl({
        url: `${HTTP_CONSTANTS?.PROXY_SERVER}/${URL}`,
      })
    );
    return data;
  } catch (error: any) {
    console.log(error);
    if (error?.name == "AxiosError") {
      throw error?.response?.data?.message;
    } else throw error;
  }
};
