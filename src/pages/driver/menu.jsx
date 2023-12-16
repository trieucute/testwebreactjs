import React from 'react';
import { useEffect } from 'react';
import { NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png'

import { useState } from 'react';
import AuthWrapperAdmin from '../../componets/admin/authWrapperAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, logoutAdmin } from '../../reduxTool/authSlice';
import axiosClient from '../../axios-client';
import avatar from "../../assets/images/usernoavatar.png"
import station from "../../assets/images/bus.png"
import { useStateContext } from '../../context/ContextProvider';


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
    // const [user, setUser]= useState('')
    const { driver, tokenDriver,setDriver , setTokenDriver} = useStateContext();
    // const token= localStorage.getItem('adminToken')
 
    const handLogout=()=>{
        // const token= localStorage.getItem('adminToken')
        if( tokenDriver){
            dispatch(logoutAdmin( tokenDriver))

        }
        localStorage.removeItem('driverToken');
        setTokenDriver(null)
        navigate('/admin')
    }
    
    return (
        <AuthWrapperAdmin>
       {driver!==null && <div >
              <div className="bodyAdmin"  id="body-pd" >
  <header className="headerAdmin" id="headerAdmin"  >
    <div className={isIconToggledPad ? 'header_toggle body-pd' : 'header_toggle'}  onClick={toggleNavbar}>
      {" "}
      <i className={isIconToggled ? "bx bx-x" : "bx bx-menu"} id="header-toggle" />{" "}
    </div>
    <div className='admininfor row m-0 align-items-center'>
      <span  className='col'>{driver.name}</span>

    <div className="header_img" >
      {" "}
      {driver.avatar !==null &&
   
        <img src={driver.avatar} alt=""  className='' />
        
      }
 {driver.avatar ===null &&

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
        <NavLink activeclassname='active' className="nav_link" to="/driver/dashboard" aria-current="false">
        <i className="bx bx-grid-alt nav_icon" />
        <span className="nav_name">Thông tin </span>
        
        </NavLink>

        <NavLink activeclassname='active'  className="nav_link" to="/driver/trips" aria-current="false">
        
        <i class="fas fa-route"></i>
        <span className="nav_name">Lịch trình chuyến xe</span>
        
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