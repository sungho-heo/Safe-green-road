import axios from "axios";

export const publicApi = axios.create({
  baseURL: "https://apis.data.go.kr",
  params: {
    serviceKey: process.env.DATA_API_KEY,
    type: "JSON",
  },
  timeout: 5000,
});
