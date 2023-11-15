import React, { createRef, useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import logo from "../../assets/images/logo.png"
// import backsignup from "../../assets/images/bgr1.jpg"
import logo2 from "../../assets/images/LogoWebProTicket.png";
import "../../assets/css/forgotPass.css";
import backsignup from "../../assets/images/dark-sunset.jpg";
const ForgotPassword = () => {
    const emailRef= createRef();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const handleForget=(e)=>{
        e.preventDefault();
 
        const payload = {
          email: emailRef.current.value,

        }
          axiosClient.post('/forgot-password', payload)
          .then((res) => {
            // setUser(data.user)
          console.log(res);
        //   setToken(res.data.data.access_token);
        //   console.log(setToken);
          setMessage('Đã gửi link đặt lại mật khẩu vào gmail của bạn. Vui lòng check mail!!!');
          // navigate('/');
          })
          .catch((err) => {
            const response = err.response;
            console.error(err);
            const errors = response.data.errors;
            if (response && response.status === 500) {
              
              setMessage('The email field is required.')
            }else{
              setMessage(errors )

            }

          })
  
    }
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      window.scrollTo(0, 0);
      return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            {loading ? (
      <div className="loading ">
        <div className='img-load'><img src={logo2} alt=""  /></div>
        <div class="dots-3"></div>
        </div>
    ) : (
     
          <div className="limiter forgot-password-container"   style={{ backgroundImage: `url(${backsignup})` }}>
  <div className="container-login100">
    <div className="wrap-login100">
      <form className="login100-form validate-form" onSubmit={handleForget}>
        <span className="login100-form-title p-b-26">Quên Mật Khẩu</span>
        <a className="login100-form-title p-b-48" href='/'>
         <img src={logo} alt="" className='img-fluid' />
        </a>
        <div
          className="form-group"
          data-validate="Valid email is: a@b.c"
        >
          <label htmlFor="">Email</label>

          <input className="input100" type="email" ref={emailRef}/>

        </div>

        <div className="text-center mt-3">   {message && (
                <div style={{color:'#FE9831', fontWeight:'bolder',fontSize:'0.9em'    }}>{message}</div>
            )
                
            }
             </div>
        <div className="container-login100-form-btn">
          <div className="wrap-login100-form-btn">
            <div className="login100-form-bgbtn" />
            <button className="login100-form-btn" type='submit'>Gửi mail</button>
          </div>
        </div>
        
      </form>
    </div>
  </div>
</div>

)
}
    </div>
            // <form onSubmit={handleForget}>
            //     <input type="email" placeholder='email' ref={emailRef} />
            //     <button type='submit'>submit</button>
            //     <div className="text-center mt-3">   {message !=="" && (
            //     <div style={{color:'#E63946', fontWeight:'bolder',fontSize:'1.2em', textShadow: 'rgb(190 190 190) 2px 2px 2px, rgb(174 174 174) 1px -1px 1px',fontFamily: 'var(--fontBold)'     }}>{message}</div>
            // )
                
            // }
            //  </div>
            // </form>

    );
};

export default ForgotPassword;