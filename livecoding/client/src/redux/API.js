// axios interceptor
import axios from "axios";
export const REACT_APP_API_URL = "http://localhost:9898/api";

const API = axios.create({
  baseURL: REACT_APP_API_URL,
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export default API;
