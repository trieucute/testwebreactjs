import React from "react";
import { NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png'
import AuthWrapperAdmin from "../../componets/admin/authWrapperAdmin";
import '../../assets/css/admin.css'
// import '../../assets/js/adminMenu.js'
import { useEffect } from "react";
import DashBoard from "./dashboard";
import RouteAdmin from "./route/route";
import User from "./user/user";
import MenuSidebar from "./menu";
import { useStateContext } from "../../context/ContextProvider";
const IndexAdmin = () => {
 const {admin}=  useStateContext();
 const navigate= useNavigate()
  useEffect(()=>{
    if(admin){
      // navigate('/admin')

    }else{
      navigate('/admin')
    }
},[admin])

  return (
    // <AuthWrapperAdmin>
      <MenuSidebar/>
    // </AuthWrapperAdmin>
    
  );
};

export default IndexAdmin;
