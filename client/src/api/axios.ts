// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:4000/jira/rest/api/3",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
