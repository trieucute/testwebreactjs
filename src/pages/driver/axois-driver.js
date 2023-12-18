import axios from "axios";
// import {useStateContext} from "./context/ContextProvider.jsx";
import { API_BASE_URL } from '../../config.js';
const axiosDriver = axios.create({
  baseURL: `${API_BASE_URL}/api`
})

axiosDriver.interceptors.request.use((config) => {
  const tokenDriver = localStorage.getItem('driverToken');
  config.headers.Authorization = `Bearer ${tokenDriver}`;
  config.headers.Accept = `application/json`;

  return config;
})

axiosDriver.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    // localStorage.removeItem('adminToken')
    // window.location.reload();
  } else if (response.status === 404) {
    //Show not found
  }

  throw error;
})

export default axiosDriver
