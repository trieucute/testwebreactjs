
import React, { useState, useEffect, createRef } from 'react';
import logo from "../../assets/images/logo.png";
import logo2 from "../../assets/images/LogoWebProTicket.png";
import axiosClient from "../../axios-client";
import dark from "../../assets/images/dark-sunset.jpg";
// import "../../../assets/css/dangky.css"
import { useNavigate } from 'react-router-dom';

import AuthWrapper from '../../componets/auth/authWrapper';
const Signup = () => {
    const [message, setMessage] = useState(false);
    const [seconds, setSeconds] = useState(5);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [erroremail, setErroremail] = useState(null);
    const [errorname, setErrorname] = useState(null);
    const [errorphone, setErrorphone] = useState(null);
    const [errorpassword, setErrorpassword] = useState(null);
    const [errorpasswordcom, setErrorpasswordcom] = useState(null);
    // const [erroraddress, setErroraddress] = useState(null);

    const navigate = useNavigate()
    const nameRef = createRef();
    const emailRef = createRef();
    const phoneRef = createRef();
    const passwordRef = createRef();
    // const addressRef = createRef();

    const passwordConfirmationRef = createRef();
    // const {setUser, setToken} = useStateContext()



    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {

            name: nameRef.current.value,
            email: emailRef.current.value,
            phone_number: phoneRef.current.value,
            // address: addressRef.current.value,
            password: passwordRef.current.value,
            password_confirm: passwordConfirmationRef.current.value,


        }

        axiosClient.post('/register', payload)
            .then((res) => {
                setMessage(true)
                //    alert('Đăng ký thành công! Mời bạn đăng nhập');
                resetForm()
                // navigate('/login')

            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    const errors = response.data.errors;
                    if (errors.name) {
                        setErrorname(errors.name)
                    } else {
                        setErrorname(null); // ẩn thông báo lỗi 
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
                    if (errors.password_confirm) {
                        setErrorpasswordcom(errors.password_confirm)
                    } else {
                        setErrorpasswordcom(null); // ẩn thông báo lỗi
                    }
                    if (errors.phone_number) {
                        setErrorphone(errors.phone_number)
                    } else {
                        setErrorphone(null); // ẩn thông báo lỗi
                    }
                    // if(errors.address){
                    //     setErroraddress(errors.address)
                    // }
                    setError(true)
                    console.log(response.data.errors);
                }
            })
    }
    const resetForm = () => {
        nameRef.current.value = '';
        emailRef.current.value = '';
        phoneRef.current.value = '';
        passwordRef.current.value = '';
        passwordConfirmationRef.current.value = '';
        setErrorname(null);
        setErroremail(null);
        setErrorphone(null);
        setErrorpassword(null);
        setErrorpasswordcom(null);
    };

  //show password
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
  
  const [googleLoginUrl, setGoogleLoginUrl] = useState(null);

  useEffect(() => {
      fetch('http://localhost:8000/api/login/google', { headers: new Headers({ accept: 'application/json' }) })
          .then((response) => {
              if (response.ok) {
                  return response.json();
              }
              throw new Error('Something went wrong!');
          })
          .then((data) => setGoogleLoginUrl(data.data.url))
          .catch((error) => console.error(error));
  }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        //   const timerError = setTimeout(() => {
        //     setError(true);
        //   }, 5000);
        return () =>
            clearTimeout(timer);
        // clearTimeout(timerError);
        //   }

    }, [])
    useEffect(() => {
        if (message) {
            //   alert('Đăng ký thành công! Mời bạn đăng nhập.');
            const timers = setTimeout(() => {
                navigate('/login');
            }, 5000);
            const timerSeconds = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
              }, 1000);
            return () => {clearTimeout(timers);
                clearTimeout(timerSeconds);
            
            }
        }
    }, [message]);
    return (
        <AuthWrapper>
        <div>
            {message && <div class="alert alert-success" role="alert" style={{position:"fixed", top:"0", left:"0", width:"100%", backgroundColor:"#FE6531",zIndex:"100",color:"white", border:"none", borderRadius:"0"}}>
                Đăng ký thành công! <a href="/login" class="alert-link" >Mời bạn đăng nhập.</a>Tự động chuyển trang đăng nhập sau {seconds} giây
            </div>}
            {loading ? (
                <div className="loading ">
                    <div className='img-load'><img src={logo2} alt="" /></div>
                    <div class="dots-3"></div>
                </div>
            ) : (
                <div className='forms-login-container forms-signup-container  '>
                <>
            <div className="overlay"  style={{   backgroundImage: `url(${dark})`}}/>
            <div className="login-container signup-container" style={{   backgroundImage: `url(${dark})`}}>
              <div>
                <div className="logo">
                  <a href="/"><img src={logo} alt="" className="img-fluid" /></a>
                  {/* <i class="fas fa-hat-wizard"></i>
                <span>Wizard Magazine</span> */}
                </div>
                <div className="register">
                  <div>Bạn đã có tài khoản?</div>
                  <p>
                  <a href="/login" style={{color:"#FE9831", textDecoration:"none"}}>Đăng nhập</a> để truy cập tất cả các tính năng của dịch vụ của chúng tôi. 
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
              <div className="form-login form-signup">
              <div className='logo-mobile-login'>        <a href="/"><img src={logo} alt="" className="img-fluid" /></a></div>
                <form onSubmit={onSubmit} className="form" id="form-2">
                  <h3 className="heading">Đăng ký</h3>
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
                  <div className="form-group ">
                                        <input id="name" type="text" name='name' placeholder="Họ và tên" ref={nameRef} className="form-control" />
                                        {errorname !== null && (
                                            <><div style={{ color: '#FE9831', fontWeight: '700', marginTop: '5px', fontSize: '0.8em', textAlign: 'left' }}>{errorname}</div></>
                                        )}
                                    </div>
                                    <div className="form-group ">
                                        <input id="email" type="email" name='email' placeholder="Email" ref={emailRef} className="form-control" />
                                        {erroremail !== null && (
                                            <><div style={{ color: '#FE9831', fontWeight: '700', marginTop: '5px', fontSize: '0.8em', textAlign: 'left' }}>{erroremail}</div></>
                                        )}
                                    </div>
                                    <div className="form-group ">
                                        <input id="phone" type="tel" name='phone_number' placeholder="Số điện thoại" ref={phoneRef} className="form-control"/>
                                        {errorphone !== null && (
                                            <><div style={{ color: '#FE9831', fontWeight: '700', marginTop: '5px', fontSize: '0.8em', textAlign: 'left' }}>{errorphone}</div></>
                                        )}
                                    </div>
                                    <div className="form-group ">
                                        <input id="password" name="password" type={showPass === 0 ? 'password' : 'text'} placeholder="Mật khẩu" ref={passwordRef} className="form-control" />
                                        <div className='eyes-pass' onClick={handleShowPass}><i className={`fas ${showPass === 0 ? 'fa-eye' : 'fa-eye-slash'}`}></i></div>
                                        {errorpassword !== null && (
                                            <><div style={{ color: '#FE9831', fontWeight: '700', marginTop: '5px', fontSize: '0.8em', textAlign: 'left' }}>{errorpassword}</div></>
                                        )}
                                    </div>

                                    <div className="form-group ">
                                        {" "}
                                        <input
                                            id="password_confirm" name='password_confirm' ref={passwordConfirmationRef}
                                            type={showPass2 === 0 ? 'password' : 'text'}
                                            placeholder="Xác nhận mật khẩu" className="form-control"
                                        />
                                        <div className='eyes-pass' onClick={handleShowPass2}><i className={`fas ${showPass2 === 0 ? 'fa-eye' : 'fa-eye-slash'}`}></i></div>
                                        {errorpasswordcom !== null && (
                                            <><div style={{ color: '#FE9831', fontWeight: '700', marginTop: '5px', fontSize: '0.8em', textAlign: 'left' }}>{errorpasswordcom}</div></>
                                        )}
                                    </div>
                  {/* <div className="form-group">
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
                      Password
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
                                               
                  </div> */}
                  
                  <div className="sign-up">
                    <div>
                      <button className="form-submit" type='submit'>Đăng ký</button>
                   
                    </div>
                    <a href="/login">Bạn đã có tài khoản?</a>
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
              
            )
            }
        </div>
        </AuthWrapper>
    );
};

export default Signup;