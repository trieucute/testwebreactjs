import axios from "axios";
// import {useStateContext} from "./context/ContextProvider.jsx";
import { API_BASE_URL } from './config.js';
const axiosClient = axios.create({
  baseURL: `${API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
  // const token = localStorage.getItem('access_token');
  // config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = `application/json`;

  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    // localStorage.removeItem('access_token')
    // window.location.reload();
  } else if (response.status === 404) {
    //Show not found
  }

  throw error;
})

export default axiosClient
