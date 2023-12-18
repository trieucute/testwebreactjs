import React, { useState, createRef, useEffect } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import dark from "../../assets/images/dark-sunset.jpg";

import "../../assets/css/changePass.css"
const ChangePassword = () => {
    const { token, user } = useStateContext();
    const [loading, setLoading]= useState(false);
    const navigate= useNavigate();
    const old_passwordRef = createRef()
    const new_passwordRef = createRef()
    const confirm_passwordRef = createRef()
    const [errorpassword, setErrorpassword] = useState(null);
    const [erroroldpassword, setErroroldpassword] = useState(null);
    const [errorpasswordcom, setErrorpasswordcom] = useState(null);
        const handleChange=(e)=>{
            e.preventDefault();
    // if(token){
    //     setLoading(true)

        const changePassword={
            old_password: old_passwordRef.current.value, 
            password: new_passwordRef.current.value,
            confirm_password: confirm_passwordRef.current.value
        }

        axiosClient.put('/user/change-password',changePassword,{
            headers: {
              Authorization: `Bearer ${token}`, // Thêm Authorization header vào yêu cầu PUT
            },
          })
        .then((resp)=>{
            console.log(resp.data);   
            resetForm();
            alert('Đổi mật khẩu thành công ')
            navigate('/')

        })
        .catch(err => {
            const response = err.response;
            console.error(err);
            const errors = response.data.errors;
            if (response && response.status === 400) {
                
                if(errors.password){
                    setErrorpassword(errors.password)
                }else{
                    setErrorpassword(null)
                }
                if(errors.old_password){
                    setErroroldpassword(errors.old_password)
                }else{
                    setErroroldpassword(null)
                }
                if(errors.confirm_password){
                    setErrorpasswordcom(errors.confirm_password)
                }else{
                    setErrorpasswordcom(null)
                   
                }
              
            } else  { // Unauthorized status code for incorrect old password
                setErroroldpassword("Old Password Doesn't match!");
                setErrorpassword(null);
                setErrorpasswordcom(null);
            } 
     
          });
 
  
    // }else{
    //     setLoading(false);
    //     navigate('/')
    // }   
     }
     const resetForm = () => {
   
        old_passwordRef.current.value = '';
        confirm_passwordRef.current.value = '';
        new_passwordRef.current.value = '';
        setErroroldpassword(null)
        setErrorpassword(null);
        setErrorpasswordcom(null);
    };
    const [showPass, setShowPass] = useState(0);
    const [showPass2, setShowPass2] = useState(0);
    const [showPass3, setShowPass3] = useState(0);
    const handleShowPass = () => {
      if (showPass === 0) {
        setShowPass(1);
      } else {
        setShowPass(0);
      }
    };
    const handleShowPass2 = () => {
      if (showPass2 === 0) {
        setShowPass2(1);
      } else {
        setShowPass2(0);
      }
    };
    const handleShowPass3 = () => {
        if (showPass3 === 0) {
          setShowPass3(1);
        } else {
          setShowPass3(0);
        }
      };
     useEffect(()=>{
        if(user){
            // setLoading(true)
            console.log(user);
        }else{
            // setLoading(false);
            navigate('/')
        }
     },[])
    return (
        <div className='mt-10'>
        <div className='changePass-container container'>
          
            <form  onSubmit={handleChange} className='form-change ' style={{backgroundColor:"white", color:"black" }}> 
             <h3 className='text-uppercase text-center'>Đổi mật khẩu</h3>
                <div className='form-group'>
                    <label htmlFor="">Mật khẩu cũ: </label>
                    <input type={showPass === 0 ? 'password' : 'text'} ref={old_passwordRef} name='old_password' className='form-control'  />
                    <div className='eyes-pass' onClick={handleShowPass}><i className={`fas ${showPass === 0 ? 'fa-eye' : 'fa-eye-slash'}`}></i></div>
                    {erroroldpassword !== null && (
                                            <><div style={{ color: '#E63946', fontWeight: 'bolder', marginTop: '5px', fontSize: '0.8em', textAlign: 'left', fontFamily: 'var(--fontBold)' }}>{erroroldpassword}</div></>
                                        )}
                </div>
                <div className='form-group'>
                <label htmlFor="">Mật khẩu mới: </label>
                    <input type={showPass2 === 0 ? 'password' : 'text'}  ref={new_passwordRef} name='password'  className='form-control' />
                    <div className='eyes-pass' onClick={handleShowPass2}><i className={`fas ${showPass2 === 0 ? 'fa-eye' : 'fa-eye-slash'}`}></i></div>
                    {errorpassword !== null && (
                                            <><div style={{ color: '#E63946', fontWeight: 'bolder', marginTop: '5px', fontSize: '0.8em', textAlign: 'left', fontFamily: 'var(--fontBold)' }}>{errorpassword}</div></>
                                        )}
                </div>
                <div className="form-group">
                <label htmlFor="">Xác nhận mật khẩu mới: </label>
                    <input type={showPass3 === 0 ? 'password' : 'text'} ref={confirm_passwordRef} name='confirm_password'  className='form-control'/>
                    <div className='eyes-pass' onClick={handleShowPass3}><i className={`fas ${showPass3 === 0 ? 'fa-eye' : 'fa-eye-slash'}`}></i></div>
                    {errorpasswordcom !== null && (
                                            <><div style={{ color: '#E63946', fontWeight: 'bolder', marginTop: '5px', fontSize: '0.8em', textAlign: 'left', fontFamily: 'var(--fontBold)' }}>{errorpasswordcom}</div></>
                                        )}
                </div>
                <div className="form-group text-center">
                <button type='submit' className='button_change'>Xác nhận</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default ChangePassword;