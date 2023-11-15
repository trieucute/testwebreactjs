
import React, { useEffect } from "react";
import { slide } from "../../assets/js/slideshowHome.js";
import hoxh from '../../assets/images/ho-xuan-huong-da-lat-4.webp';
import caubt from '../../assets/images/cau-vang-da-nang.jpg';
import thacpe from '../../assets/images/thac-prenn.jpg';
import nuilangbi from '../../assets/images/Đỉnh_Langbiang.jpg';
import chodalat from '../../assets/images/cho-da-lat-ve-dem.jpg';
import doicat from '../../assets/images/doi-cat-mui-ne-2.jpg'


const TouristInformation = () => {
  useEffect(()=>{
    slide()
  },[])
   
  
  return (
    <div className=" w-100">
    <div className="title_home_bus">
      <h1>Thông tin du lịch</h1>
    </div>
    <div className="container-tour-infor">
      {/* {/* <div class="tour-items d-flex justify-content-evenly ">
                                  
                              </div> * /} */}
      <div
        id="myCarousel"
        className="carousel carousel-tour slide container"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner w-100">
          <div className="carousel-item active">
            <div className="col-md-3">
              <div className="card card-body">
                <img
                  className="img-fluid"
                  src={hoxh}
                  alt=""
                />
                <div className="title-card">Hồ Xuân Hương</div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="col-md-3">
              <div className="card card-body">
                <img className="img-fluid" src={thacpe} alt="" />
                <div className="title-card">Thác Prenn</div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="col-md-3">
              <div className="card card-body">
                <img
                  className="img-fluid"
                  src={caubt}
                  alt=""
                />
                <div className="title-card">Cầu Bàn Tay</div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="col-md-3">
              <div className="card card-body">
                <img
                  className="img-fluid"
                  src={nuilangbi}
                  alt=""
                />
                <div className="title-card">Núi Lang biang</div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="col-md-3">
              <div className="card card-body">
                <img
                  className="img-fluid"
                  src={doicat}
                  alt=""
                />
                <div className="title-card">Đồi cát Mũi Né</div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="col-md-3">
              <div className="card card-body">
                <img
                  className="img-fluid"
                  src={chodalat}
                  alt=""
                />
                <div className="title-card">Chợ Đà Lạt</div>
              </div>
            </div>
          </div>
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
      </div>
    </div>
  </div>
  
  );
  
};


export default TouristInformation;
