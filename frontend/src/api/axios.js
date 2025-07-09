import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/accounts/",
  withCredentials: true,
});

export default axiosInstance;