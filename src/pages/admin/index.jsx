import React from "react";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import logo from '../../assets/images/logo.png'
import AuthWrapperAdmin from "../../componets/admin/authWrapperAdmin";
import '../../assets/css/admin.css'
// import '../../assets/js/adminMenu.js'
import { useEffect } from "react";
import DashBoard from "./dashboard";
import RouteAdmin from "./route/route";
import User from "./user/user";
import MenuSidebar from "./menu";
const IndexAdmin = () => {
  

  return (
    <AuthWrapperAdmin>
      <MenuSidebar/>
    </AuthWrapperAdmin>
    
  );
};

export default IndexAdmin;
