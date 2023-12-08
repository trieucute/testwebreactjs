import axios from "axios";
// import {useStateContext} from "./context/ContextProvider.jsx";
import { API_BASE_URL } from '../../config.js';
const axiosAdmin = axios.create({
  baseURL: `${API_BASE_URL}/api`
})

axiosAdmin.interceptors.request.use((config) => {
  const tokenAdmin = localStorage.getItem('adminToken');
  config.headers.Authorization = `Bearer ${tokenAdmin}`;
  config.headers.Accept = `application/json`;

  return config;
})

axiosAdmin.interceptors.response.use((response) => {
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

export default axiosAdmin
