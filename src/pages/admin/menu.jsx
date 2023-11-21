import React from 'react';
import { useEffect } from 'react';
import { NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png'
import User from './user/user';
import DashBoard from './dashboard';
import { useState } from 'react';
import AuthWrapperAdmin from '../../componets/admin/authWrapperAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, logoutAdmin } from '../../reduxTool/authSlice';
import axiosClient from '../../axios-client';
import avatar from "../../assets/images/usernoavatar.png"
import station from "../../assets/images/bus.png"


const MenuSidebar =() => {
    // tương tác menu
    const [isNavVisible, setNavVisibility] = useState(false);
    const [isIconToggled, setIconToggle] = useState(false);
    const [isIconToggledPad, setIconTogglePad] = useState(false);
    // const [isIconImgLogo, setIconImgLogo] = useState(false);

    const [isBodyPdToggled, setBodyPdToggled] = useState(false);
    const [isHeaderPdToggled, setHeaderPdToggled] = useState(false);
  
    const toggleNavbar = () => {
      setNavVisibility(!isNavVisible);
      
      setIconToggle(!isIconToggled);
      setIconTogglePad(!isIconToggledPad);
    //   setIconImgLogo(!isIconImgLogo);

      setBodyPdToggled(!isBodyPdToggled);
      setHeaderPdToggled(!isHeaderPdToggled);
    };
    const dispatch = useDispatch();

    const navigate= useNavigate()
    const [user, setUser]= useState('')
    const token= localStorage.getItem('adminToken')
    useEffect(() => {
        const userInfor = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        axiosClient.get("/user/profile", userInfor)
          .then((resp) => {
            const data = resp.data.data;
            console.log(data);
            setUser(data);

          })
          .catch((err) => {
          
            console.log(err);
            // navigate('/admin')

          })
  
      }, [])
    const handLogout=()=>{
        const token= localStorage.getItem('adminToken')
        if(token){
            dispatch(logoutAdmin(token))

        }
        localStorage.removeItem('adminToken');
        navigate('/admin')
    }
    
    return (
        <AuthWrapperAdmin>
       {user !=='' && <div >
              <div className="bodyAdmin"  id="body-pd" >
  <header className="headerAdmin" id="headerAdmin"  >
    <div className={isIconToggledPad ? 'header_toggle body-pd' : 'header_toggle'}  onClick={toggleNavbar}>
      {" "}
      <i className={isIconToggled ? "bx bx-x" : "bx bx-menu"} id="header-toggle" />{" "}
    </div>
    <div className='admininfor row m-0 align-items-center'>
      <span  className='col'>{user.name}</span>

    <div className="header_img" >
      {" "}
      {user.avatar !==null &&
   
        <img src={user.avatar} alt=""  className='' />
        
      }
 {user.avatar ===null &&

      <img src={avatar} alt=""  className='' style={{ backgroundColor:"white"}}/>

    }
      {/* <img src="https://i.imgur.com/hczKIze.jpg" alt="" />{" "} */}
      </div>
    </div>
  </header>
  <div  className={isNavVisible ? 'l-navbar show' : 'l-navbar'} id="nav-bar">
    <nav className="nav nav-bar">
      <div>
        {" "}
        <a href="/" className="nav_logo">
          {" "}
          <i className="bx bx-layer nav_logo-icon" />{" "}
          {/* <span>Web</span> */}
          <img src={logo} alt="" className="img-fluid img-logo"style={{height:"60px"}}/>
          {/* <span className="nav_logo-name">BBBootstrap</span>{" "} */}
        </a>
        <div className="nav_list">
        <NavLink activeclassname='active' className="nav_link" to="/admin/dashboard" aria-current="false">
        <i className="bx bx-grid-alt nav_icon" />
        <span className="nav_name">Thống kê</span>
        
        </NavLink>
        <NavLink activeclassname='active'  className="nav_link" to="/admin/user" aria-current="false">
        <i className="bx bx-user nav_icon" />
        <span className="nav_name">Quản lý người dùng</span>
        
        </NavLink>
        <NavLink activeclassname='active'  className="nav_link" to="/admin/cars" aria-current="false">
        <i class="fas fa-bus"></i>
        <span className="nav_name">Quản lý xe khách</span>
        
        </NavLink>
        <NavLink activeclassname='active'  className="nav_link" to="/admin/trips" aria-current="false">
        
        <i class="fas fa-route"></i>
        <span className="nav_name">Quản lý chuyến xe</span>
        
        </NavLink>
        {/* <NavLink activeclassname='active'  className="nav_link" to="/admin/hometrip" aria-current="false">
        
        <i class="fas fa-warehouse"></i>
        <span className="nav_name">Quản lý nhà xe</span>
        
        </NavLink> */}
        <NavLink activeclassname='active'  className="nav_link" to="/admin/stations" aria-current="false">
        {/* <i class="fas fa-bus"></i> */}
        <i class="fas fa-location-dot"></i>
        <span className="nav_name">Quản lý bến xe</span>
        
        </NavLink>
        <NavLink activeclassname='active'  className="nav_link" to="/admin/rentCar" aria-current="false">
        <i class="fas fa-car-side"></i>
        <span className="nav_name">Quản lý thuê xe</span>
        
        </NavLink>
        <NavLink activeclassname='active'  className="nav_link" to="/admin/tickets" aria-current="false">
        <i class="fas fa-ticket"></i>
        <span className="nav_name">Quản lý vé</span>
        
        </NavLink>
        <NavLink activeclassname='active'  className="nav_link" to="/admin/news" aria-current="false">
        <i class="fas fa-newspaper"></i>
        <span className="nav_name">Quản lý tin tức</span>
        
        </NavLink>
        <NavLink activeclassname='active'  className="nav_link" to="/admin/job" aria-current="false">
        <i class="fas fa-users-viewfinder"></i>
        <span className="nav_name">Quản lý tuyển dụng</span>
        
        </NavLink>
        <NavLink activeclassname='active'  className="nav_link" to="/admin/comment" aria-current="false">
        <i class="fas fa-comment"></i>
        <span className="nav_name">Quản lý bình luận</span>
        
        </NavLink>
        </div>
      </div>{" "}
      <div className="nav_link" onClick={handLogout}>
        {" "}
        <i className="bx bx-log-out nav_icon" />{" "}
        <span className="nav_name">SignOut</span>{" "}
      </div>
    </nav>
  </div>
  {/*Container Main start*/}
  <div className={isBodyPdToggled ? 'height-100 bg-light body-pd' : 'height-100 bg-light'}>
    {/* <h4>Main Components</h4> */}
    <div className='admin-contents'>
        <Outlet/>
    </div>
    
  {/* {children} */}
  </div>
</div>
        </div>
        } 
        </AuthWrapperAdmin>
    );
};

export default MenuSidebar;