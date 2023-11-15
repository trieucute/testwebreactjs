import React from 'react';
// import   '../../assets/js/animationSlide';
import Snowfall from 'react-snowfall'
import banner from '../../assets/images/banner.webp';

import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import banner2 from '../../assets/images/banner2.jpg'
import banner3 from '../../assets/images/banner4.jpg'
import imgcap from '../../assets/images/h6-img-1-yellow.png'

const Slideshow = () => {
  const fadeImages = [
    
    {
      url: banner,
      caption: 'Hành trình đáng nhớ, trải nghiệm tuyệt vời',
      des:'Hành trình trên xe khách của chúng tôi sẽ mang lại những trải nghiệm đáng nhớ và tuyệt vời cho khách hàng'
    },
    {
      url: banner2,

      caption: 'An toàn, tiện nghi và thoải mái trên mỗi chuyến đi',
      des:'Các giá trị đáng giá của dịch vụ của hành trình, như an toàn, tiện nghi và sự thoải mái.'

    },
    {
      url:banner3,

      caption: 'Hãy đồng hành cùng chúng tôi trên những tuyến đường đẹp nhất',
      des:'Mở ra của cửa sổ xe khách, cho khách hàng cảm giác như đang khám phá thế giới xung quanh khi ngồi trên xe.'

    },
  ];
    return (
        <>
          {/* ------------------Banner -----------------------*/}
  {/* <div className="container-fuild container-banner-index"> */}
  <div className="banner">
  <Snowfall
  // Changes the snowflake color
  color="white"
  // Applied to the canvas element
  style={{  width: '100%',position:"absolute", left:"0", top:"0",zIndex:"20",
  height: '100%',}}
  // Controls the number of snowflakes that are created (default 150)
  snowflakeCount={300}
/>
<div className="slide-container">
       <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div key={index}>
            <div className='back-fill-banner'></div>
            <img style={{ width: '100%' }} src={fadeImage.url}  alt=''/> 
          
            <div className="slide-caption  d-md-block">
  {/* <h5>Second slide label</h5> */}
  <div className="text-inner text-start">
   
      
    
    <h2 className="thin-font ps-2">{fadeImage.caption} <i className="fas fa-circle-check ps-2" style={{color:"#FE9831" , fontSize:"25px"}}></i></h2>
    {/* <h1>VỊNH HẠ LONG</h1> */}
    <p className="mt-4 ps-2" >
    {fadeImage.des}
    </p>
    
  </div>
</div>

          </div>
        ))}
      </Fade>
      </div>
      {/* <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="" aria-hidden="true">
          <i className="fas fa-caret-left" />
        </span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="" aria-hidden="true">
          <i className="fas fa-caret-right" />
        </span>
        <span className="visually-hidden">Next</span>
      </button> */}
    
  </div>

{/* </div> */}
{/*-----------------END  Banner ------------------*/}
</>
    );
};

export default Slideshow;