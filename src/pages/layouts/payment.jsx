import React,{  useEffect} from "react";
import "../../assets/css/thanhtoan.css";
import xe2 from "../../assets/images/xe2.gif";
import city from "../../assets/images/city2.jpg";
import vnpay from "../../assets/images/vnpay.jpg";
import momo from "../../assets/images/momo.webp";

const Payment= () => {
  // khi nhấn vnpay thì hiện vnpay , tương tự momo
  useEffect(() => {
    // tabs();
    const inputs= document.querySelectorAll('.input-pay')
    const payContent= document.querySelectorAll('.pay-items')
    inputs.forEach((i)=>{
        i.addEventListener("change",(e)=>{
            let dataPay = e.target.dataset.pay;
            payContent.forEach(function (el) {
                el.classList.remove("active-items-pay");
            });
            document.querySelector("#" + dataPay).classList.add("active-items-pay");
        })
    })
    
  }, []);  

  return (
    <div className='mt-10'>
    <div className="pay_container width-main container">
  <div className="routes-bus-container container  ps-0 pe-0">
          <div className=" d-flex align-items-center" style={{backgroundColor:"white"}}>
            <div className="w-25 text-center">
              <img src={xe2} alt="" style={{ width: "65%" }} />
            </div>
            <div className="text-center w-50 ">
              <h5 className="p-0 m-0">TP.Hồ Chí Minh - Đà Lạt</h5>
              <span className="date_go">10/08/2023</span>
            </div>
            <div className="w-25 text-center">
              <img src={city} alt="" style={{ width: "63%" }} />
            </div>
          </div>
 
        </div>
    <div className=" my-5 ">
      <div className="text-center">
        <div className="row">
          {/* ---------------{/* Chọn phương thức thanh toán * /} --------------*/}
          <div className="col-md-4">
            <div className="col">
              <div className="card " style={{border:"none", backgroundColor: "white", borderRadius: "5px"}}>
                <div className="card-body">
                  <h5 className="card-title text-start">
                    Chọn phương thức thanh toán
                  </h5>
                  <div className="">
                    <ul className="list-group mt-4">
                      <li
                        className="list-group-item text-start input-pay-list"
                        style={{ border: "none" }}
                      >
                        <input
                          className="form-check-input input-pay active-input-pay"
                          type="radio"
                          defaultChecked="checked"
                          data-pay="vnpay"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          defaultValue="VNPay"
                          style={{ marginTop: "0.5em" }}
                        />
                        <label htmlFor="flexRadioDefault1">
                          <img
                            src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR-635x496.png"
                            alt="VNPay"
                            style={{ width: "2em", marginLeft: "1.7em" }}
                          />
                          <span
                            className="fw-bold"
                            style={{ marginLeft: "1.7em" }}
                          >
                            VNPay
                          </span>
                        </label>
                      </li>
                      <li
                        className="list-group-item text-start input-pay-list"
                        style={{ border: "none" }}
                      >
                        <input
                          className="form-check-input input-pay"
                          type="radio"
                          data-pay="momo"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          defaultValue="Momo"
                          style={{ marginTop: "0.5em" }}
                        />
                        <label htmlFor="flexRadioDefault2">
                          <img
                            src="https://th.bing.com/th/id/R.806d2873f525a6110570c826bac75bea?rik=tF2Aygfx5H41DA&riu=http%3a%2f%2fwww.russinvecchi.com.vn%2fwp-content%2fuploads%2f2020%2f09%2f931b119cf710fb54746d5be0e258ac89-logo-momo-1024x1024.png&ehk=gHxMBtflWmXvDMQghW%2bZz%2flu0PVq81fEeUK5yatiUj8%3d&risl=&pid=ImgRaw&r=0"
                            alt="Momo"
                            style={{ width: "2em", marginLeft: "1.7em" }}
                          />
                          <span
                            className="fw-bold"
                            style={{ marginLeft: "1.7em" }}
                          >
                            Momo
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------END  {/* Chọn phương thức thanh toán * /} --------------*/}
          {/* --------------------------MÃ QR---------------------------------- */}
          <div className="col-md-4 col-sum-price">
            <div className="col">
              <div className="card " style={{border:"none", backgroundColor: "white", borderRadius: "5px"}}>
                <div className="card-body">
                  <h5 className="card-title">Tổng Thanh Toán</h5>
                  <h5 className="card-title  fw-bold">280.000đ</h5>
                  <div
                    className="text-center w-100 mb-2 pay-items active-items-pay"
                    id="vnpay"
                  >
                    <img
                      src={vnpay}
                      className="rounded"
                      alt="..."
                      style={{ maxWidth: 270, maxHeight: 270, width: "100%" }}
                    />
                  </div>
                  <div className="text-center w-100 mb-2 pay-items" id="momo">
                    <img
                      src={momo}
                      className="rounded"
                      alt="..."
                      style={{ maxWidth: 270, maxHeight: 270, width: "100%" }}
                    />
                  </div>
                  <h5 className="card-title text-start text-success">
                    Hướng dẫn thanh toán quét mã
                  </h5>
                  <div className="containers text-center">
                    <div className="row">
                      <div className="col-sm-1" style={{ marginTop: "0.5em" }}>
                        ❶
                      </div>
                      <div className="col-sm text-start">
                        Mở ứng dụng Momo hoặc app ngân hàng trên điện thoại
                      </div>
                    </div>
                  </div>
                  <div className="containers text-center">
                    <div className="row">
                      <div className="col-sm-1" style={{ marginTop: "0.1em" }}>
                        ❷
                      </div>
                      <div className="col-sm text-start">
                        Dùng biểu tượng [-] để quét mã QR
                      </div>
                    </div>
                  </div>
                  <div className="containers text-center">
                    <div className="row">
                      <div className="col-sm-1" style={{ marginTop: "0.1em" }}>
                        ❸
                      </div>
                      <div className="col-sm text-start">
                        Quét mã ở trang này và thanh toán
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* --------------------------END  MÃ QR---------------------------------- */}
          {/* --------------------------Thông tin khách hàng---------------------------------- */}
          <div className="col-md-4 col-infor-client">
            <div className="col">
              <div className="card " style={{border:"none", backgroundColor: "white", borderRadius: "5px"}}>
                <div className="card-body">
                  <h5 className="card-title text-start">Thông tin hành khách</h5>
                  <div className="row mt-3">
                    <div className="col text-start">Họ và tên</div>
                    <div className="col text-end">Nguyễn Ngọc Thế</div>
                  </div>
                  <div className="row mt-2">
                    <div className="col text-start">Số điện thoại</div>
                    <div className="col text-end">0901921111</div>
                  </div>
                  <div className="row mt-2">
                    <div className="col text-start">Email</div>
                    <div className="col text-end">nguyenngocthe765@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="col">
              <div className="card " style={{border:"none", backgroundColor: "white", borderRadius: "5px"}}>
                <div className="card-body">
                  <h5 className="card-title text-start">Thông tin lượt đi</h5>
                  <div className="row mt-3">
                    <div className="col text-start">Tuyến xe</div>
                    <div className="col text-end">BX Mien Dong =&gt; Da lat</div>
                  </div>
                  <div className="row mt-2">
                    <div className="col text-start">Thời gian</div>
                    <div className="col text-end text-danger">
                      19:35 10-08-2023
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col text-start">Số lượng ghế</div>
                    <div className="col text-end">4</div>
                  </div>
                  <div className="row mt-2">
                    <div className="col text-start">Số ghế</div>
                    <div className="col text-end text-danger">
                      B10, B11, B14, B13
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col text-start">Tổng tiền lượt đi</div>
                    <div className="col text-end text-danger">1.120.000đ</div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="col">
              <div className="card " style={{border:"none", backgroundColor: "white", borderRadius: "5px"}}>
                <div className="card-body">
                  <h5 className="card-title text-start">Thông tin lượt về</h5>
                  <div className="row mt-3">
                    <div className="col text-start">Tuyến xe</div>
                    <div className="col text-end">Da lat =&gt;BX Mien Dong</div>
                  </div>
                  <div className="row mt-2">
                    <div className="col text-start">Thời gian</div>
                    <div className="col text-end text-danger">
                      19:35 10-08-2023
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col text-start">Số lượng ghế</div>
                    <div className="col text-end">4</div>
                  </div>
                  <div className="row mt-2">
                    <div className="col text-start">Số ghế</div>
                    <div className="col text-end text-danger">
                      B10, B11, B14, B13
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col text-start">Tổng tiền lượt về</div>
                    <div className="col text-end text-danger">2.240.000đ</div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="col">
              <div className="card " style={{border:"none", backgroundColor: "white", borderRadius: "5px"}}>
                <div className="card-body">
                  <h5 className="card-title text-start">Chi tiết giá</h5>
                  <div className="row mt-3">
                    <div className="col text-start">Giá vé lượt đi</div>
                    <div className="col text-end text-danger">1.120.000đ</div>
                  </div>
                  <div className="row mt-2">
                    <div className="col text-start">Giá vé lượt về</div>
                    <div className="col text-end text-danger">1.120.000đ</div>
                  </div>
                  <div className="row mt-2">
                    <div className="col text-start">Phí thanh toán</div>
                    <div className="col text-end">0đ</div>
                  </div>
                  <hr />
                  <div className="row mt-3">
                    <div className="col text-start">Tổng tiền</div>
                    <div className="col text-end text-danger">2.240.000đ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* --------------------------Thông tin khách hàng---------------------------------- */}
          <br />
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default Payment;
