import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axiosAdmin from '../../pages/admin/axois-admin';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axios-client';

function AuthWrapperDriver({ children }) {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);
  // const tokenAdmin  =localStorage.getItem('adminToken');
  const { admin, tokenAdmin,setAdmin, setDriver, driver, tokenDriver } = useStateContext();

  useEffect(() => {
    // Kiểm tra token ở đây và thực hiện điều hướng (redirect) nếu cần
    // if (!token || token===null || token===undefined) {
    //   navigate('/admin')
    // }
    
  
if(tokenDriver ){
    axiosClient.get('/user/profile',{
      headers: {
        Authorization: `Bearer ${tokenDriver}`,
      },
    })
    .then((res=>{
      console.log(res);
      setDriver(res.data.data)
      navigate('/driver/dashboard');
    }))
    .catch((res=>{
      navigate('/driver')
      setDriver(null)
    }))
   
  }else{
    navigate('/driver')
  }
   
      // if( admin===null){
      //   navigate('/admin')
      // }

      // }else if(tokenAdmin && admin===null){
      //   navigate('/admin')
      // }else{
      //   navigate('/admin')
      // }
      // if( admin===null){
      //   navigate('/admin')
      // }
  }, [navigate, tokenAdmin,setAdmin, admin,setDriver, tokenDriver]);

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

export default AuthWrapperDriver;
