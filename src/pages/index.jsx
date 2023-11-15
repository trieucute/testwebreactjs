import React from 'react';
import { useState, useEffect } from 'react';
import logo2 from "../assets/images/LogoWebProTicket.png";
import Header from '../componets/header/header';
import { Outlet } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../componets/footer/footer';
const Index = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
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
      <div className="app">
  
                <Header/>
                <main >
                <Outlet/> 

                </main>
                {/* <div className='mt-10' >
                   <Outlet/> 
                </div> */}
                <Footer/>
        </div>
    
    )} 
  </div>
        
    );
};

export default Index;