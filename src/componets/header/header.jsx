import React ,{useEffect}from 'react';
import logo from '../../assets/images/WebProTicketLogo.png';
import '../../assets/css/header.css';
import {Link, NavLink} from 'react-router-dom'
import Logout from '../auth/Logout';
import { menushow } from '../../assets/js/menu';
const Header = () => {
  useEffect(()=>{
    menushow();
  },[])
    return (
      <header>
  <nav className="navbar navbar-expand-lg  p-0">
    <div className="container">
      {/* <a class="navbar-brand" href="#">Navbar</a> */}
      <Link
        className="navbar-brand"
        href="/"
        title="TicketProWeb "
        rel="home"
      >
        <img
          width={215}
          height={75}
          src={logo}
          className="header_logo header-logo "
          alt="GetAway"
        />
        <img
          width={215}
          height={75}
          src="http://mauweb.monamedia.net/getaway/wp-content/uploads/2018/12/light-logo-img.png"
          className="header-logo-dark"
          alt="GetAway"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="background" />
      <div
        className="collapses navbar-collapse justify-content-center"
        id="navbarSupportedContent"
      >
        <span className="icon-x--menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
            <path style={{fill:"white"}} d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
          </svg>
        </span>
        <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
                <NavLink  activeclassname="active"  className="nav-link " to="/">Trang chủ</NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink activeclassname="active"  className="nav-link " to="/thuexe">Thuê xe</NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink activeclassname="active"  className="nav-link " to="/searchTicket">Tra cứu vé</NavLink>
              </li>
              <li className="nav-item">
                <NavLink   activeclassname="active"  className="nav-link " to="/introduce"> Giới Thiệu</NavLink>
              </li>
              <li className="nav-item">
                <NavLink   activeclassname="active"  className="nav-link " to="/contact">  Liên hệ</NavLink>
              </li>
              <li className="nav-item">
                <NavLink   activeclassname="active"   className="nav-link " to="/recruitment">  Tuyển dụng</NavLink>
              </li> 
              <li className="nav-item">
                <NavLink activeclassname="active" className="nav-link " to="/news">Tin tức</NavLink>

              </li>
              <li className='nav-item login-mobile'>    <Logout/></li>
        </ul>
      </div>
      <div className="row m-0 header-btn-login">
        {/* <div class="col"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg></div> */}
          <Logout/>
      
      </div>
    </div>
  </nav>
</header>

    
    );
};

export default Header;