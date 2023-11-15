import React, { useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import axiosClient from '../../axios-client';
import logo from "../../assets/images/logo.png"
import backsignup from "../../assets/images/dark-sunset.jpg"
import logo2 from "../../assets/images/LogoWebProTicket.png";
import "../../assets/css/forgotPass.css"
const ResetPassword = () => {
  const location = useLocation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [errorpassword, setErrorpassword] = useState(null);
  const [errorpasswordcom, setErrorpasswordcom] = useState(null);
    const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    const token = new URLSearchParams(location.search).get('token');
    const email = new URLSearchParams(location.search).get('email');
    console.log(email);
    axiosClient.post('/reset-password', {
      email: email,
      password: password,
      confirm_password: confirmPassword,
      token: token
    })
      .then((response) => {
        if (response.data.success) {
          setErrorpasswordcom(null)
          setErrorpassword(null)
          setMessage('Đặt lại mật khẩu thành công. Tự động chuyển qua đăng nhập sau 2 giây!')
          setSuccess(true);
          setTimeout(() => {
           navigate('/login')
          }, 2000);
        } else {
          setError(response.data.error);
        }
      })
      .catch((err) => {
        console.error(err);
        const response = err.response;
        if (response && response.status === 422) {
            const errors = response.data.errors;
            if(errors.confirm_password){
              setErrorpasswordcom(errors.confirm_password)
            }else(
              setErrorpasswordcom(null)

            )
            if(errors.password){
              setErrorpassword(errors.password)
            }else(
              setErrorpassword(null)

            )
        }
        setError('An error occurred. Please try again.');
      });
  };
  const [showPass, setShowPass] = useState(0);
  const [showPass2, setShowPass2] = useState(0);

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


  return (
    <div>

<div className="limiter forgot-password-container"   style={{ backgroundImage: `url(${backsignup})` }}>
  <div className="container-login100">
    <div className="wrap-login100">
      <form className="login100-form validate-form" onSubmit={handleSubmit}>
        <span className="login100-form-title p-b-26">Đặt Lại Mật Khẩu</span>
        <a className="login100-form-title p-b-48" href='/'>
         <img src={logo} alt="" className='img-fluid' />
        </a>
   
        <div
          className="form-group"
          data-validate="Enter password"
        >
          <span className="btn-show-pass" onClick={handleShowPass}>
            {/* <i className="zmdi zmdi-eye" /> */}
            <i className={`fas ${showPass === 0 ? 'fa-eye' : 'fa-eye-slash'}`}></i>
          </span>
          <label htmlFor="">Mật khẩu</label>
          <input className="input100" type={showPass === 0 ? 'password' : 'text'}  value={password} name='password' onChange={(e) => setPassword(e.target.value)}/>
     
        </div>
         {errorpassword !== null && (
                                            <><div style={{ color: '#FE9831', fontWeight: 'bolder', marginTop: '5px', fontSize: '0.8em', textAlign: 'left'}}>{errorpassword}</div></>
                                        )}
        <div
          className="form-group"
          data-validate="Enter password"
        >
          <span className="btn-show-pass" onClick={handleShowPass2}>
          <i className={`fas ${showPass2 === 0 ? 'fa-eye' : 'fa-eye-slash'}`}></i>
          </span>
          <label htmlFor="">Xác nhận mật khẩu</label>

          <input className="input100" type={showPass2 === 0 ? 'password' : 'text'}  value={confirmPassword} name='confirm_password' onChange={(e) => setConfirmPassword(e.target.value)}/>
        
        </div>
          {errorpasswordcom !== null && (
                                            <><div style={{ color: '#FE9831', fontWeight: 'bolder', marginTop: '5px', fontSize: '0.8em', textAlign: 'left' }}>{errorpasswordcom}</div></>
                                        )}
        <div className="text-center mt-3">   {message && (
                <div style={{color:'#FE9831', fontWeight:'bolder',fontSize:'1em'   }}>{message}</div>
            )
                
            }
             </div>
        <div className="container-login100-form-btn">
          <div className="wrap-login100-form-btn">
            <div className="login100-form-bgbtn" />
            <button className="login100-form-btn" type='submit'>Xác nhận</button>
          </div>
        </div>
        
      </form>
    </div>
  </div>
</div>

    </div>
  );
};

export default ResetPassword;
