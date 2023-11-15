import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

function AuthWrapperAdmin({ children }) {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);
  const token  =localStorage.getItem('adminToken');


  useEffect(() => {
    // Kiểm tra token ở đây và thực hiện điều hướng (redirect) nếu cần
    if (!token || token===null || token===undefined) {
      navigate('/admin')
    }
  }, [navigate, token]);

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

export default AuthWrapperAdmin;
