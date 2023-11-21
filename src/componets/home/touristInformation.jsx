
import React, { useEffect } from "react";
import { slide } from "../../assets/js/slideshowHome.js";
import hoxh from '../../assets/images/ho-xuan-huong-da-lat-4.webp';
import caubt from '../../assets/images/cau-vang-da-nang.jpg';
import thacpe from '../../assets/images/thac-prenn.jpg';
import nuilangbi from '../../assets/images/Đỉnh_Langbiang.jpg';
import chodalat from '../../assets/images/cho-da-lat-ve-dem.jpg';
import doicat from '../../assets/images/doi-cat-mui-ne-2.jpg'
import { fetchnews } from "../../reduxTool/newsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";



const TouristInformation = () => {
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
  const dispatch = useDispatch();

  const { news, isLoading } = useSelector(state => state.news)
  const List = news.data
  useEffect(() => {
    slide()
  }, [news])
  useEffect(() => {
    console.log("dispatch");
    dispatch(fetchnews());
  }, [])

  const currentItemsinf = List
const navigate=useNavigate();
const handleNewsdetail=(id)=>{
  navigate(`/tinchitiet/${id}`)
}
  return (
    <div className=" w-100">
      <div className="title_home_bus">
        <h1>Thông tin du lịch</h1>
      </div>
      <div className="container-tour-infor touristInformation-container ">
        {/* {/* <div class="tour-items d-flex justify-content-evenly ">
                                  
                              </div> * /} */}
                              <div className="touristInformation mt-4 mb-3">
                                <Slider {...settings}>
        {currentItemsinf?.map((item, index) => (
            <div key={index} className='slider-bus'>
              <div className=" popular-route-cards cursor-pointer position-relative d-flex flex-column  p-0">
                <div className="img-popular-route-card">
                  <img      src={item.imgs} alt={item.title} className="img-fluid" />
                </div>
                <div className="position-absolute bottom z-10 text-white text-start text-bus" >
                  {/* <form action="">
                    <input type="text" name="start_location" value={route.start_station} />
                    <input type="text" name="end_location" value={route.end_station}/>
                    <input type="text" name="start_location" value={formattedDate}/>
                  <button type='button' onClick={()=>handleChooses(route.start_station, route.end_station,formattedDate)}>ok</button>
                  </form> */}
                    <a className="title-card" onClick={()=>handleNewsdetail(item.id)} style={{cursor:"pointer"}}>
                          <div>{item.title}</div>
                          </a>
         
                </div>
              </div>
            </div>
          ))}

      </Slider>
      </div>
        {/* <div
          id="myCarousel"
          className="carousel carousel-tour slide container"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner w-100">
            {isLoading ? (
              <>
          
              </>
            ) : (
              <>
                {currentItemsinf?.map((item, index) => (
                  <div className={`carousel-item ${index === 0 && 'active'}`}>
                    <div className="col-md-3">
                      <div className="card card-body">
                        <img
                          className="img-fluid"
                          src={item.imgs}
                          alt=""
                        />
                        <a className="title-card" onClick={()=>handleNewsdetail(item.id)} style={{cursor:"pointer"}}>
                          <div>{item.title}</div>
                          </a>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon">
              <i className="fas fa-play" />
            </span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon">
              <i className="fas fa-play" />
            </span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> */}
      </div>
    </div>

  );

};


export default TouristInformation;