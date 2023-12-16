import React from "react";
import { NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png'
import AuthWrapperAdmin from "../../componets/admin/authWrapperAdmin";
import '../../assets/css/admin.css'
// import '../../assets/js/adminMenu.js'
import { useEffect } from "react";

import MenuSidebar from "./menu";
import { useStateContext } from "../../context/ContextProvider";
const IndexDriver = () => {
 const {driver}=  useStateContext();
 const navigate= useNavigate()
  useEffect(()=>{
    if(!driver){
      navigate('/admin')
    }
},[])

  return (
    // <AuthWrapperAdmin>
      <MenuSidebar/>
    // </AuthWrapperAdmin>
    
  );
};

export default IndexDriver ;
