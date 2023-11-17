import React from 'react';
import hcm from '../../assets/images/tphcm.jpg';
import img4 from '../../assets/images/bus1.jpg'
import img2 from '../../assets/images/bus2.jpg'
import img3 from '../../assets/images/bus3.jpg'
import img1 from '../../assets/images/bus4.jpg'
import img5 from '../../assets/images/bus5.jpg'
import img6 from '../../assets/images/bus6.jpg'


import Slider from 'react-slick';
import { useEffect } from 'react';
import axiosClient from '../../axios-client';
import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchData } from '../../reduxTool/routesBookingSlice';
import { useNavigate } from 'react-router-dom';

const RoutesBus = () => {
  const images = [img1, img2, img3, img4, img5, img6];
  // const sliderRef = useRef(null);
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay:true,
    autoplaySpeed: 3000, 
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          // dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ],

  };
  function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
      <button onClick={onClick} className="slick-prev">
        <i className="fa-solid fa-caret-left"></i>
      </button>
    );
  }

  function CustomNextArrow(props) {
    const { onClick } = props;
    return (
      <button onClick={onClick} className="slick-next">
        <i className="fa-solid fa-caret-right"></i>
      </button>
    );
  }
  const currentDate = new Date();
const year = currentDate.getFullYear();
const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
const day = ('0' + currentDate.getDate()).slice(-2);

const formattedDate = `${year}-${month}-${day}`;
console.log(formattedDate);
  const [popularRoutes, setPopularRoutes] = useState([]);
  useEffect(()=>{
    axiosClient.get("/trip/popular")
    .then((response) => {
      const fetchedData = response.data.data;
      setPopularRoutes(fetchedData);
      console.log(fetchedData);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);
const dispatch = useDispatch();
const navigate= useNavigate()
// const routeData = useSelector((state) => state.tripReducer.data);
// console.log(routeData);
  const handleChoose= async (start_station,end_station,date)=>{
    dispatch(updateSearchData({
      start_location: start_station,
      end_location: end_station,
      date: date
    }));
 
   
    navigate(`/lichtrinh1chieu/?start_location=${encodeURIComponent(start_station)}&end_location=${encodeURIComponent(end_station)}&date=${date}&amount=1`);
  }


    return (
        <div className="bus_popular width-main-items">
  <div className="title_home_bus">
    <h1>Tuyến xe phổ biến</h1>
  </div>
  <div className='bus_popular-contents mt-4'>
  <Slider {...settings}>
  {popularRoutes.map((route, index) => (
            <div key={index} className='slider-bus'>
              <div className=" popular-route-cards cursor-pointer position-relative d-flex flex-column  p-0">
                <div className="img-popular-route-card">
                  <img src={images[index]} alt={`Bus ${index + 1}`} className="img-fluid" />
                </div>
                <div className="position-absolute bottom z-10 text-white text-start text-bus" onClick={()=>handleChoose(route.start_station, route.end_station,formattedDate)}>
                  {/* <form action="">
                    <input type="text" name="start_location" value={route.start_station} />
                    <input type="text" name="end_location" value={route.end_station}/>
                    <input type="text" name="start_location" value={formattedDate}/>
                  <button type='button' onClick={()=>handleChooses(route.start_station, route.end_station,formattedDate)}>ok</button>
                  </form> */}
                  <span>{route.start_station} - {route.end_station}</span>
                  {/* Thêm các thông tin khác nếu cần */}
                  <br />
                  <span>từ {route.min_price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                </div>
              </div>
            </div>
          ))}

      </Slider>
      </div>

  </div>


    );
};

export default RoutesBus;