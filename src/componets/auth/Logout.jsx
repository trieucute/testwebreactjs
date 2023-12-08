// import firebase from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo.png"
import avatar from "../../assets/images/usernoavatar.png"


import { useEffect, useState } from 'react';
import axiosClient from "../../axios-client";
import {useStateContext} from "../../context/ContextProvider.jsx";
import { fetchUserProfile } from '../../reduxTool/authSlice.js';
import { useDispatch } from 'react-redux';

function Logout() {
  // const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser, token, setToken} = useStateContext();
console.log(token);
  const handleLogout = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axiosClient.get("/user/logout", config)
      .then(response => {
        const data = response.data;
        console.log(data);
        setUser(null)
        setToken(null)
        localStorage.removeItem('access_token');
        navigate('/login');
      })
      .catch((err) => {
        console.error(err)
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response);
        }


      })

  };
  const handleChangePassword =()=>{
    navigate('/user/change_password')
  }
  const dispatch= useDispatch()
  useEffect(() => {
    const userInfor = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
      dispatch(fetchUserProfile(token))
      .then((res)=>{
          console.log(res);
          setUser(res.payload.data)
          setIsLoading(false); 
          // setUpdateinf(res.payload.data)
      })
      .catch((err)=>{
          console.error(err)
          setUser(null)
          setIsLoading(false); 
      })
  
  }, [dispatch,  setUser,token])
const handleUpdateInfor=()=>{
  navigate('/user/update');
}
// const handleLoginPage =()=>{
//   navigate('/login')
// }
  return (
    <>

    {isLoading && <div><div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div></div>}
 {!isLoading && ( 
  <>
    {user !==null && token !==null && (

<>  
    <div className="nav-item dropdown dropdown-inforUser  " >
<div className='row m-0 align-items-center'>
  <div className='col ps-0'>
      {user.avatar !==null &&
      <div>
        <img src={user.avatar} alt=""  className='' style={{borderRadius:"100%", objectFit:"cover", width:"30px"}}/>
        </div>
      }
 {user.avatar ===null &&
      <div>
      <img src={avatar} alt=""  className='' style={{borderRadius:"100%", objectFit:"cover", width:"30px", backgroundColor:"white"}}/>
      </div>
    }
    </div>


        <a
          className="nav-link dropdown-toggle  col ps-0"
          href="..."
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false" style={{fontSize:"0.8em"}}
        >
          {user.name}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{border:"none", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>
          <li>
            <button className="dropdown-item" type='button' onClick={handleUpdateInfor}>
              Thông tin
            </button>
          </li>
          <li>
            <button className="dropdown-item" type='button'  onClick={handleChangePassword}>
             Đổi mật khẩu
            </button>
          </li>
          <li><hr className="dropdown-divider"/></li>
          <li>
            <button className="dropdown-item" type='button' onClick={handleLogout}>
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
      </div>
      </>
    ) 
}
    { user ===null &&
       <Link className="col" href='' style={{textDecoration:"none", color:"black"}} to='/login'>
       <i className="fas fa-user" />
       <button className='btn-mobile-for-login'> Đăng nhập</button>
     </Link>
    }
    </>
   )} 
  
      


    </>
  );
}

export default Logout