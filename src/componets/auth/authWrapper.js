import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import {useStateContext} from "../../context/ContextProvider.jsx";
import { fetchUserProfile } from '../../reduxTool/authSlice.js';
function AuthWrapper({ children }) {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);
  const { user, token,setUser } = useStateContext();

  useEffect(() => {
    // Kiểm tra token ở đây và thực hiện điều hướng (redirect) nếu cần
    if (token) {

      const userInfor = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      axiosClient.get('/user/profile', userInfor)
        .then((res)=>{
            console.log(res);
            setUser(res.payload.data)
            navigate('/');
            // setUpdateinf(res.payload.data)
        })
        .catch((err)=>{
            console.error(err)
            setUser(null)
      
        })
        //  navigate(
    }
  }, [navigate, token, setUser]);

//   useEffect(() => {
//     // Gọi API Laravel để kiểm tra thông tin đăng nhập và xác thực

// if(token){
//   const userInfor = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
//   axiosClient.get('/user/profile', userInfor)
//     .then(response => {
//       const data = response.data;

//       // Kiểm tra kết quả từ API
//       if (data.data) {
//         setUser(data.data);
//         console.log(setUser);

//       } 
     

//       setLoading(false);
//       navigate('/');
//     })
//     .catch(error => {
//       console.error(error);
//       // setLoading(false);
//       // navigate('/dangnhap');
//     });
//   // setLoading(false);
//   // navigate('/');

// }

//  }, []);  


//   if (user) {   
//     navigate('/'); 
//     // Hoặc có thể hiển thị một trang hoặc thông báo lỗi
//     return null;
//   }

  return children;
}

export default AuthWrapper;
