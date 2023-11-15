import React, { useEffect } from "react";
import "../../assets/css/completlyPayment.css";
// import "../../assets/css/index.css";

import down from "../../assets/images/push-down.png";
import check from "../../assets/images/check.png";
import qr from "../../assets/images/QR.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay } from "@fortawesome/free-solid-svg-icons";

const CompletlyPayment = () => {
  const slide = () =>
    document.querySelectorAll(".carousel .carousel-item").forEach((item) => {
      let minPerSlide = 2;
      let next = item.nextElementSibling;
      if (!next) {
        next = item.parentNode.firstElementChild;
      }
      item.appendChild(next.firstElementChild.cloneNode(true));

      for (let i = 0; i < minPerSlide; i++) {
        next = next.nextElementSibling;
        if (!next) {
          next = item.parentNode.firstElementChild;
        }

        item.appendChild(next.firstElementChild.cloneNode(true));
      }
    });

  useEffect(() => {
    slide();
  }, []);
  return (
    <div className='mt-10'>
    <div className="complete-pay-container container backWhite-padding ">
    <div className="mb-5 ">
      <div className="check">
        <img src={check} alt="" />
      </div>
      <h3 className="booking__ticket mb-2">Mua vé xe thành công</h3>
      <p className="notifies">
        WebProTicket đã gửi thông tin đặt vé vào email của bạn. Vui lòng kiểm tra
        lại.
      </p>
      {/*------------------------ {/* thông tin * /} ---------------*/}
    </div>
    <div className="my-4">
      <h3 className="title__ticket__infor mb-4">Thông tin mua vé</h3>
      <div className="ticket__infor row justify-content-between">
        <div className="ticket__infor1 col-md-5">
          <div className="row mt-3">
            <div className="col text-start">Họ và tên:</div>
            <div className="col text-end">Trần Bích Triệu</div>
          </div>
          <div className="row mt-2">
            <div className="col text-start">Số điện thoại:</div>
            <div className="col text-end ">039654049</div>
          </div>
          <div className="row mt-2">
            <div className="col text-start">Email:</div>
            <div className="col text-end">trieutran989@gmail.com</div>
          </div>
        </div>
        <div className="ticket__infor2  col-md-5">
          <div className="row mt-2">
            <div className="col text-start">Tổng giá vé:</div>
            <div className="col text-end ">2.240.000đ</div>
          </div>
          <div className="row mt-2">
            <div className="col text-start">PTTT:</div>
            <div className="col text-end ">VNPay</div>
          </div>
          <div className="row mt-2">
            <div className="col text-start">Trạng thái:</div>
            <div className="col text-end ">Thanh toán thành công</div>
          </div>
        </div>
      </div>
    </div>
    {/*------------------------------- {/*slide show vé * /}--------------------------*/}
    <div
      id="myCarousel"
      className="carousel slide container carousel-card-item"
      data-ride="carousel"
      data-interval="false"
    >
      <div className="carousel-inner w-100">
        {/*---------------------------------------- vé 1--------------------- */}
        <div className="carousel-item active">
          <div className="col-md-3">
            <div className="card card-body">
              <div className="card swiper-slide">
                <div className="ticket__infor3">
                  <div className="row justify-content-center my-2 align-items-baseline">
                    <h5 className=" number_ticket">1</h5>
                    <h5 className="ticket__code  text-center">Mã vé EZGEW4</h5>
                    <div className="download__ticket  text-end">
                      <img src={down} alt="" />
                    </div>
                  </div>
                  <div className="QR">
                    <img src={qr} alt="" />
                  </div>
                  <div className="infor__trip mt-4 ">
                    <div className="card ">
                      <div className="row">
                        <div className="col text-start">Tuyến xe</div>
                        <div className="col text-end ">
                          TP.Hồ Chí Minh - Đà Lạt
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Thời gian</div>
                        <div className="col text-end ">
                          <span>08:30</span> <span>10/08/2023</span>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Số ghế</div>
                        <div className="col text-end ">A01</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Điểm lên xe</div>
                        <div className="col text-end ">BX An Sương</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Giá vé</div>
                        <div className="col text-end ">280.000đ</div>
                      </div>
                    </div>
                  </div>
                  <div className="note__trip mt-4">
                    <p>
                      Mang mã vé đến văn phòng để đổi vé lên xe trước giời xuất
                      bến ít nhất 60 phút
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*---------------------------------------- vé 2--------------------- */}
        <div className="carousel-item ">
          <div className="col-md-3">
            <div className="card card-body">
              <div className="card swiper-slide">
                <div className="ticket__infor3">
                  <div className="row justify-content-center my-2">
                    <h5 className="col-md-2 number_ticket">2</h5>
                    <h5 className="ticket__code col-md-8 text-center">
                      Mã vé EZG433
                    </h5>
                    <div className="download__ticket col-md-2 text-end">
                      <img src={down} alt="" />
                    </div>
                  </div>
                  <div className="QR">
                    <img src={qr} alt="" />
                  </div>
                  <div className="infor__trip mt-4 ">
                    <div className="card ">
                      <div className="row">
                        <div className="col text-start">Tuyến xe</div>
                        <div className="col text-end ">
                          TP.Hồ Chí Minh - Đà Lạt
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Thời gian</div>
                        <div className="col text-end ">
                          <span>08:30</span> <span>10/08/2023</span>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Số ghế</div>
                        <div className="col text-end ">A01</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Điểm lên xe</div>
                        <div className="col text-end ">BX An Sương</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Giá vé</div>
                        <div className="col text-end ">280.000đ</div>
                      </div>
                    </div>
                  </div>
                  <div className="note__trip mt-4">
                    <p>
                      Mang mã vé đến văn phòng để đổi vé lên xe trước giời xuất
                      bến ít nhất 60 phút
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*---------------------------------------- vé 3--------------------- */}
        <div className="carousel-item ">
          <div className="col-md-3">
            <div className="card card-body">
              <div className="card swiper-slide">
                <div className="ticket__infor3">
                  <div className="row justify-content-center my-2">
                    <h5 className="col-md-2 number_ticket">3</h5>
                    <h5 className="ticket__code col-md-8 text-center">
                      Mã vé ESDFQ1
                    </h5>
                    <div className="download__ticket col-md-2 text-end">
                      <img src={down} alt="" />
                    </div>
                  </div>
                  <div className="QR">
                    <img src={qr} alt="" />
                  </div>
                  <div className="infor__trip mt-4 ">
                    <div className="card ">
                      <div className="row">
                        <div className="col text-start">Tuyến xe</div>
                        <div className="col text-end ">
                          TP.Hồ Chí Minh - Đà Lạt
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Thời gian</div>
                        <div className="col text-end ">
                          <span>08:30</span> <span>10/08/2023</span>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Số ghế</div>
                        <div className="col text-end ">A01</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Điểm lên xe</div>
                        <div className="col text-end ">BX An Sương</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Giá vé</div>
                        <div className="col text-end ">280.000đ</div>
                      </div>
                    </div>
                  </div>
                  <div className="note__trip mt-4">
                    <p>
                      Mang mã vé đến văn phòng để đổi vé lên xe trước giời xuất
                      bến ít nhất 60 phút
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*---------------------------------------- vé 4--------------------- */}
        <div className="carousel-item">
          <div className="col-md-3">
            <div className="card card-body">
              <div className="card swiper-slide">
                <div className="ticket__infor3">
                  <div className="row justify-content-center my-2">
                    <h5 className="col-md-2 number_ticket">4</h5>
                    <h5 className="ticket__code col-md-8 text-center">
                      Mã vé EZ2322
                    </h5>
                    <div className="download__ticket col-md-2 text-end">
                      <img src={down} alt="" />
                    </div>
                  </div>
                  <div className="QR">
                    <img src={qr} alt="" />
                  </div>
                  <div className="infor__trip mt-4 ">
                    <div className="card ">
                      <div className="row">
                        <div className="col text-start">Tuyến xe</div>
                        <div className="col text-end ">
                          TP.Hồ Chí Minh - Đà Lạt
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Thời gian</div>
                        <div className="col text-end ">
                          <span>08:30</span> <span>10/08/2023</span>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Số ghế</div>
                        <div className="col text-end ">A01</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Điểm lên xe</div>
                        <div className="col text-end ">BX An Sương</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Giá vé</div>
                        <div className="col text-end ">280.000đ</div>
                      </div>
                    </div>
                  </div>
                  <div className="note__trip mt-4">
                    <p>
                      Mang mã vé đến văn phòng để đổi vé lên xe trước giời xuất
                      bến ít nhất 60 phút
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*---------------------------------------- vé 5--------------------- */}
        <div className="carousel-item ">
          <div className="col-md-3">
            <div className="card card-body">
              <div className="card swiper-slide">
                <div className="ticket__infor3">
                  <div className="row justify-content-center my-2">
                    <h5 className="col-md-2 number_ticket">5</h5>
                    <h5 className="ticket__code col-md-8 text-center">
                      Mã vé EUUIR3
                    </h5>
                    <div className="download__ticket col-md-2 text-end">
                      <img src={down} alt="" />
                    </div>
                  </div>
                  <div className="QR">
                    <img src={qr} alt="" />
                  </div>
                  <div className="infor__trip mt-4 ">
                    <div className="card ">
                      <div className="row">
                        <div className="col text-start">Tuyến xe</div>
                        <div className="col text-end ">
                          TP.Hồ Chí Minh - Đà Lạt
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Thời gian</div>
                        <div className="col text-end ">
                          <span>08:30</span> <span>10/08/2023</span>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Số ghế</div>
                        <div className="col text-end ">A01</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Điểm lên xe</div>
                        <div className="col text-end ">BX An Sương</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Giá vé</div>
                        <div className="col text-end ">280.000đ</div>
                      </div>
                    </div>
                  </div>
                  <div className="note__trip mt-4">
                    <p>
                      Mang mã vé đến văn phòng để đổi vé lên xe trước giời xuất
                      bến ít nhất 60 phút
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*---------------------------------------- vé 6--------------------- */}
        <div className="carousel-item ">
          <div className="col-md-3">
            <div className="card card-body">
              <div className="card swiper-slide">
                <div className="ticket__infor3">
                  <div className="row justify-content-center my-2">
                    <h5 className="col-md-2 number_ticket">6</h5>
                    <h5 className="ticket__code col-md-8 text-center">
                      Mã vé UIERQ2
                    </h5>
                    <div className="download__ticket col-md-2 text-end">
                      <img src={down} alt="" />
                    </div>
                  </div>
                  <div className="QR">
                    <img src={qr} alt="" />
                  </div>
                  <div className="infor__trip mt-4 ">
                    <div className="card ">
                      <div className="row">
                        <div className="col text-start">Tuyến xe</div>
                        <div className="col text-end ">
                          TP.Hồ Chí Minh - Đà Lạt
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Thời gian</div>
                        <div className="col text-end ">
                          <span>08:30</span> <span>10/08/2023</span>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Số ghế</div>
                        <div className="col text-end ">A01</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Điểm lên xe</div>
                        <div className="col text-end ">BX An Sương</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Giá vé</div>
                        <div className="col text-end ">280.000đ</div>
                      </div>
                    </div>
                  </div>
                  <div className="note__trip mt-4">
                    <p>
                      Mang mã vé đến văn phòng để đổi vé lên xe trước giời xuất
                      bến ít nhất 60 phút
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*---------------------------------------- END  vé 6--------------------- */}
      </div>
      {/*---------------------------Button lùi------------------*/}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon">
          <i className="fa-solid fa-play" />
        </span>
        <span className="visually-hidden">Previous</span>
      </button>
      {/*---------------------------Button tới------------------*/}
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon">
          <i className="fa-solid fa-play" />
        </span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  </div>

  );
};

export default CompletlyPayment;
