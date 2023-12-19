import React from "react";
import { NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png'
import AuthWrapperAdmin from "../../componets/admin/authWrapperAdmin";
import '../../assets/css/admin.css'
// import '../../assets/js/adminMenu.js'
import { useEffect } from "react";

import MenuSidebar from "./menu";
import { useStateContext } from "../../context/ContextProvider";
import AuthWrapperDriver from "../../componets/admin/authWrapperDriver";
const IndexDriver = () => {
 const {driver}=  useStateContext();
 const navigate= useNavigate()
  useEffect(()=>{
    if(driver){
    
    }else{
      navigate('/driver')
    }
},[driver])

  return (
    // <AuthWrapperDriver>
      <MenuSidebar/>
    // </AuthWrapperDriver>
    
  );
};

export default IndexDriver ;
