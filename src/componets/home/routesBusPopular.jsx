import React from 'react';
import hcm from '../../assets/images/tphcm.jpg';
import dalat from '../../assets/images/dalat.jpg'
import danang from '../../assets/images/danang.jpg'
import phanthiet from '../../assets/images/phan-thiet-pw.webp'

const RoutesBus = () => {
    return (
        <div className="bus_popular width-main-items">
  <div className="title_home_bus">
    <h1>Tuyến xe phổ biến</h1>
  </div>
  <div className=" mt-2 row mx-0 p-0 row-mobile--popularRoute">
    <div className=" popular-route-card cursor-pointer position-relative d-flex flex-column mt-4 m-2 col-mobile p-0">
      <div className="img-popular-route-card">
        <img src={hcm} alt="" className="img-fluid" />
      </div>
      <div className="position-absolute bottom z-10 text-white text-left">
        <span>Tuyến xe từ</span>
        <br />
        <span>Tp Hồ Chí Minh</span>
      </div>
      <div className="d-flex w-100  flex-wrap  flex-column align-items-center justify-content-around">
        <div
          className="d-flex align-items-center justify-content-around w-100 my-10"
          style={{ backgroundColor: "white" }}
        >
          <div className="col-item ">
            <span>Đà lạt</span>
            <br />
            <span>305km - 8 giờ - 19/08/2023</span>
          </div>
          <div className="col-item-price text-right">
            <span className=" text-right">280.000đ</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-around w-100 my-10">
          <div className="col-item">
            <span>Đà lạt</span>
            <br />
            <span>305km - 8 giờ - 19/08/2023</span>
          </div>
          <div className="col-item-price text-right">
            <span className=" text-right">280.000đ</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-around w-100 my-10 ">
          <div className="col-item">
            <span>Đà lạt</span>
            <br />
            <span>305km - 8 giờ - 19/08/2023</span>
          </div>
          <div className="col-item-price text-right">
            <span className=" text-right">280.000đ</span>
          </div>
        </div>
      </div>
    </div>
    <div className="popular-route-card cursor-pointer position-relative d-flex flex-column mt-4 m-2 col-mobile p-0">
      <div className="img-popular-route-card">
        <img src={dalat} alt="" className="img-fluid" />
      </div>
      <div className="position-absolute bottom z-10 text-white text-left">
        <span>Tuyến xe từ</span>
        <br />
        <span>Tp Đà Lạt</span>
      </div>
      <div className="d-flex w-100 flex-wrap  flex-column align-items-center justify-content-around">
        <div className="d-flex align-items-center justify-content-around w-100 my-10">
          <div className="col-item">
            <span>Đà lạt</span>
            <br />
            <span>305km - 8 giờ - 19/08/2023</span>
          </div>
          <div className="col-item-price text-right">
            <span className=" text-right">280.000đ</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-around w-100 my-10">
          <div className="col-item">
            <span>Đà lạt</span>
            <br />
            <span>305km - 8 giờ - 19/08/2023</span>
          </div>
          <div className="col-item-price text-right">
            <span className=" text-right">280.000đ</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-around w-100 my-10">
          <div className="col-item">
            <span>Đà lạt</span>
            <br />
            <span>305km - 8 giờ - 19/08/2023</span>
          </div>
          <div className="col-item-price text-right">
            <span className=" text-right">280.000đ</span>
          </div>
        </div>
      </div>
    </div>
    <div className="popular-route-card cursor-pointer position-relative d-flex flex-column mt-4 m-2 col-mobile p-0">
      <div className="img-popular-route-card">
        <img src={danang} alt="" className="img-fluid" />
      </div>
      <div className="position-absolute bottom z-10 text-white text-left">
        <span>Tuyến xe từ</span>
        <br />
        <span>Tp Đà Nẵng</span>
      </div>
      <div className="d-flex w-100 flex-wrap  flex-column align-items-center justify-content-around">
        <div className="d-flex align-items-center justify-content-around w-100 my-10">
          <div className="col-item">
            <span>Đà lạt</span>
            <br />
            <span>305km - 8 giờ - 19/08/2023</span>
          </div>
          <div className="col-item-price text-right">
            <span className=" text-right">280.000đ</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-around w-100 my-10">
          <div className="col-item">
            <span>Đà lạt</span>
            <br />
            <span>305km - 8 giờ - 19/08/2023</span>
          </div>
          <div className="col-item-price text-right">
            <span className=" text-right">280.000đ</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-around w-100 my-10">
          <div className="col-item">
            <span>Đà lạt</span>
            <br />
            <span>305km - 8 giờ - 19/08/2023</span>
          </div>
          <div className="col-item-price text-right">
            <span className=" text-right">280.000đ</span>
          </div>
        </div>
      </div>
    </div>
    <div className="popular-route-card cursor-pointer position-relative d-flex flex-column mt-4 m-2 col-mobile p-0">
      <div className="img-popular-route-card">
        <img src={phanthiet} alt="" className="img-fluid" />
      </div>
      <div className="position-absolute bottom z-10 text-white text-left">
        <span>Tuyến xe từ</span>
        <br />
        <span>Tp Phan Thiết</span>
      </div>
      <div className="d-flex w-100 flex-wrap  flex-column align-items-center justify-content-around">
        <div className="d-flex align-items-center justify-content-around w-100 my-10">
          <div className="col-item">
            <span>Đà lạt</span>
            <br />
            <span>305km - 8 giờ - 19/08/2023</span>
          </div>
          <div className="col-item-price text-right">
            <span className=" text-right">280.000đ</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-around w-100 my-10">
          <div className="col-item">
            <span>Đà lạt</span>
            <br />
            <span>305km - 8 giờ - 19/08/2023</span>
          </div>
          <div className="col-item-price text-right">
            <span className=" text-right">280.000đ</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-around w-100 my-10">
          <div className="col-item">
            <span>Đà lạt</span>
            <br />
            <span>305km - 8 giờ - 19/08/2023</span>
          </div>
          <div className="col-item-price text-right">
            <span className=" text-right">280.000đ</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    );
};

export default RoutesBus;