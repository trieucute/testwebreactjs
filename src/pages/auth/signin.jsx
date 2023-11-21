import React, {useState,useEffect, createRef} from 'react';
import "../../assets/css/login.css";
import logo from "../../assets/images/logo.png";
import dark from "../../assets/images/dark-sunset.jpg";
import axiosClient from "../../axios-client";
import logo2 from "../../assets/images/LogoWebProTicket.png";
// import "../../../assets/css/dangnhap.css"
import {  useNavigate } from 'react-router-dom';
// import logo from "../../../assets/images/LogoWebProTicket.png"
import back1 from "../../assets/images/bgr1.jpg"
import AuthWrapper from '../../componets/auth/authWrapper';
import {useStateContext} from "../../context/ContextProvider.jsx";
import { API_BASE_URL } from '../../config.js';
const Signin = () => {
  const emailRef = createRef()
  const passwordRef = createRef()
    const {  setToken } = useStateContext()
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true); 
    const [erroremail, setErroremail] = useState(null);
    const [errorpassword, setErrorpassword] = useState(null);
    // const navigate= useNavigate()

    const handleLogin = (e) => {
    e.preventDefault();
 
      const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }
        axiosClient.post('/login', payload)
        .then((res) => {
          // setUser(data.user)
        console.log(res.data.data.access_token);
        setToken(res.data.data.access_token);
        console.log(setToken);
        setMessage('Đăng nhập thành công!');
        // navigate.goBack();
        })
        .catch((err) => {
          const response = err.response;
          console.log(response.data.errors);
          const errors=response.data.errors;
            // setMessage(response.data.errors)
            if(!errors.password && !errors.emai){
              setMessage(response.data.errors)
            }else {
              setMessage(null)
  
            }
            if (errors.email) {
              setErroremail(errors.email)
          } else {
              setErroremail(null); // ẩn thông báo lỗi
          }
          if (errors.password) {
              setErrorpassword(errors.password)
          } else {
              setErrorpassword(null); // ẩn thông báo lỗi
          }
        
        })

  };
//login gg

  const [googleLoginUrl, setGoogleLoginUrl] = useState(null);

  useEffect(() => {
      fetch(`${API_BASE_URL}/api/login/google`, { headers: new Headers({ accept: 'application/json' }) })
          .then((response) => {
              if (response.ok) {
                  return response.json();
              }
              throw new Error('Something went wrong!');
          })
          .then((data) => setGoogleLoginUrl(data.data.url))
          .catch((error) => console.error(error));
  }, []);

  //end login gg
  //show password
  const [showPass, setShowPass] = useState(0);

  const handleShowPass = () => {
    if (showPass === 0) {
      setShowPass(1);
    } else {
      setShowPass(0);
    }
  };

  // Call this function to execute the redirect after the user clicks the button
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);
  const navigate= useNavigate()
  const hanleNavigateLogin =()=>{
    navigate('/signup')
  }
    return (
      <AuthWrapper>
          {loading ? (
      <div className="loading ">
        <div className='img-load'><img src={logo2} alt=""  /></div>
        <div class="dots-3"></div>
        </div>
    ) : (
       <div className='forms-login-container'>
      <>
  <div className="overlay"  style={{   backgroundImage: `url(${dark})`}}/>
  <div className="login-container" style={{   backgroundImage: `url(${dark})`}}>
    <div>
      <div className="logo">
        <a href="/"><img src={logo} alt="" className="img-fluid" /></a>
        {/* <i class="fas fa-hat-wizard"></i>
      <span>Wizard Magazine</span> */}
      </div>
      <div className="register">
        <div>Bạn chưa có tài khoản?</div>
        <p>
        <a href="/signup" style={{color:"#FE9831", textDecoration:"none"}}>Đăng ký</a> để truy cập tất cả các tính năng của dịch vụ của chúng tôi. 
        </p>
        <div className="social">
          <a data-toggle="tooltip" title="Facebook" href="..">
            <i className="fab fa-facebook-f" />
          </a>
          <a data-toggle="tooltip" title="Google" href="..">
            <i className="fab fa-google" />
          </a>
          <a data-toggle="tooltip" title="Github" href="..">
            <i className="fab fa-github" />
          </a>
        </div>
      </div>
    </div>
    <div className="form-login">
    <div className='logo-mobile-login'>        <a href="/"><img src={logo} alt="" className="img-fluid" /></a></div>
      <form onSubmit={handleLogin} className="form" id="form-2">
        <h3 className="heading">Đăng nhập</h3>
        <div className='login-gg-fb row m-0 justify-content-center py-2'>
          <a data-toggle="tooltip" title="Facebook" href=".." >
            <i className="fab fa-facebook-f" />
          </a>

          {googleLoginUrl && (  <a data-toggle="tooltip" title="Google" type='button'  href={googleLoginUrl} style={{textDecoration:"none"}}>
          <i className="fa-brands fa-google" />
           
            </a>
            )}
        </div>
        {/* <div className="spacer" /> */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email" name='email' ref={emailRef}
            placeholder="VD: email@domain.com"
            className="form-control"
          />
            
           {erroremail !== null && (
                                            <><div style={{ color: '#FE9831', fontWeight: '700', marginTop: '5px', fontSize: '0.8em', textAlign: 'left'}}>{erroremail}</div></>
                                        )}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
          Mật khẩu
          </label>
          <input
            id="password"
            type={showPass === 0 ? 'password' : 'text'} placeholder="Mật khẩu"  name='password'  ref={passwordRef}
            className="form-control"
          />
               
            <div className='eyes-pass' onClick={handleShowPass}><i className={`fas ${showPass === 0 ? 'fa-eye' : 'fa-eye-slash'}`}></i></div>
      
      
          {errorpassword !== null && (
                                            <div  style={{ color: '#FE9831', fontWeight: '700', marginTop: '5px', fontSize: '0.8em', textAlign: 'left' }}>{errorpassword}</div>
                                        )}  
                                     
        </div>
        <div className="form-group f-term">
          {/* <input id="agree" name="agree" type="checkbox" />
          <label htmlFor="agree" className="form-label">
            I agree to the all statements in <a href="">Terms of service</a>
          </label> */}
          <a href="/forgot_password">Quên mật khẩu?!</a>
          <span className="form-message" />
        </div>
        <div className="sign-up">
          <div>
            <button className="form-submit" type='submit'>Đăng nhập</button>
         
          </div>
          <a onClick={hanleNavigateLogin}>Bạn chưa có tài khoản?</a>
        </div>
      
        
      </form>
      <div className="text-center mt-3">   {message && (
                <div style={{color:'#FE9831', fontWeight:'700',fontSize:'1.1em'    }}>{message}</div>
            )
                
            }
             </div>
    </div>
   
  </div>
</>

    </div>
    )}
    </AuthWrapper>
    );
};

export default Signin;