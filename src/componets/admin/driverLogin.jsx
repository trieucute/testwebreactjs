import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch,} from 'react-redux';
import { fetchUserProfile, loginAdmin } from '../../reduxTool/authSlice';


import { useNavigate } from 'react-router-dom';
// import AuthWrapperDriver from './authWrapperDrAuthWrapperDriver';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axios-client';
import AuthWrapperDriver from './authWrapperDriver';

const DriverLogin = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { tokenAdmin, setAdmin, setTokenAdmin, setDriver, setTokenDriver, } = useStateContext();
    // const admin = useSelector(state=>state.authAdmin)
    const [errorMessage, setErrorMessage] = useState('');
    // console.log(admin);
    // console.log(admin.adminToken);
    // const adminProfile = useSelector(state=>state.authAdmin.profile)
    // console.log(adminProfile.role);
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const loginResponse = await dispatch(loginAdmin({ email, password }));
    
            // Kiểm tra xem đăng nhập thành công
            if (loginResponse.payload) {
                const userProfileResponse = await dispatch(fetchUserProfile(loginResponse.payload.data.access_token));
                if (userProfileResponse.payload) {
                    const profile = userProfileResponse.payload.data;
                    if (profile.role === 'driver'){
                          setTokenDriver(loginResponse.payload.data.access_token)
                            setDriver(profile)
                            navigate('/driver/dashboard');
           
                    }else{
                      alert('Bạn không có quyền truy cập trang tài xế');

                    }
                }
            }
        } catch (error) {
            setErrorMessage('Sai mật khẩu hoặc email');
        }
    };
// useEffect(()=>{
//   if(tokenAdmin ){
//     axiosClient.get('/user/profile',{
//       headers: {
//         Authorization: `Bearer ${tokenAdmin}`,
//       },
//     })
//     .then((res=>{
//       console.log(res);
//       navigate('/admin/dashboard');
//     }))
//     .catch((res=>{
//       navigate('/admin')
//     }))
   
//   }
//   // console.log(admin);

// },[ ])
    return (
        <AuthWrapperDriver>
        <div className='mt-5 login-admin-container'>
            <h1 className='text-center fs-2'>Login Driver</h1>
            <form className='w-50 mx-auto mt-4' onSubmit={handleLogin}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">
      Email 
    </label>
    <input
      type="email"
      className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} name='email'
      id="email"
      aria-describedby="emailHelp"
    />
  
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">
      Password
    </label>
    <input
      type="password" name='password'
      className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}
      id="password"
    />
  </div>
  
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>
{errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
        </div>
      </AuthWrapperDriver>
    );
};

export default DriverLogin;