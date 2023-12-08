import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../assets/css/thanhtoan.css";
import xe2 from "../../assets/images/xe2.gif";
import city from "../../assets/images/city2.jpg";
import vnpay from "../../assets/images/vnpay.jpg";
import momo from "../../assets/images/momo.webp";
import { postPayment } from "../../reduxTool/dataTicketSlice";
import { API_BASE_URL } from "../../config";

const Payment = () => {
  // khi nhấn vnpay thì hiện vnpay , tương tự momo
  const [ticket, setTicket] = useState(null);
  const [trip, setTrip] = useState(null);
  const { profile } = useSelector((state) => state.authAdmin);
  const dispatch = useDispatch();
  useEffect(() => {
    // tabs();
    const inputs = document.querySelectorAll(".input-pay");
    const payContent = document.querySelectorAll(".pay-items");
    inputs.forEach((i) => {
      i.addEventListener("change", (e) => {
        let dataPay = e.target.dataset.pay;
        payContent.forEach(function (el) {
          el.classList.remove("active-items-pay");
        });
        document.querySelector("#" + dataPay).classList.add("active-items-pay");
      });
    });

    const ordered_ticket = localStorage.getItem("ticket_ordered");
    if (ordered_ticket != null) {
      setTicket(JSON.parse(ordered_ticket));
      fetchTripByID(JSON.parse(ordered_ticket).trip_id);
    }
  }, []);

  const fetchTripByID = async (id) => {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/trip/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await resp.json();
      if (resp.status === 200) {
        setTrip(jsonData?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useLayoutEffect(() => {
    console.log("ticket :: ", ticket);
  }, [ticket]);
  useLayoutEffect(() => {
    console.log("trip :: ", trip);
  }, [trip]);
// Tính tổng tiền từ các vé đã đặt
// Sử dụng regex để trích xuất các số từ chuỗi
// Tạo mảng mới chứa các giá trị seat_id
// const timepickup= trip?.schedule.find(i=>i.name===ticket?.pickup_location)?.time;
// console.log (  timepickup.slice(0, 5));
  const toCurrency = (amount) => {
    return amount?.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  console.log(toCurrency (trip?.seats
    .filter((st) =>
      ticket.selectedSeatsIds?.includes(st.id)
    )
    .map((st) => st.price)
    .reduce((prev, cur) => prev + cur, 0)
));
  const handlePay = () => {
    let ticket_send = { ...ticket };
    delete ticket_send.selectedSeatsIds;
    dispatch(postPayment(ticket_send)).then((res) => {
      if (res) {
        window.location.assign(res?.payload?.data);
      }
    });
  };
  return (
    <div className="mt-10">
      <div className="pay_container width-main container">  
        <div className="routes-bus-container container  ps-0 pe-0">
          <div
            className=" d-flex align-items-center"
            style={{ backgroundColor: "white" }}
          >
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
                  <div
                    className="card "
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                  >
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
                              data-pay="momo"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              defaultValue="Momo"
                              defaultChecked="checked"
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
                          <li
                            className="list-group-item text-start input-pay-list"
                            style={{ border: "none" }}
                          >
                            <input
                              className="form-check-input input-pay "
                              type="radio"
                          
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
                  <div
                    className="card "
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <div className="card-body">
       
                      <div
                        className="text-center w-100 mb-2 pay-items "
                        id="vnpay"
                      >
                                       <h5 className="card-title text-center">Chuyển khoản ngân hàng</h5>
                        {/* <img
                          src={vnpay}
                          className="rounded"
                          alt="..."
                          style={{
                            maxWidth: 270,
                            maxHeight: 270,
                            width: "100%",
                          }}
                        /> */}
                               {/* <h5 className="card-title text-start text-success">
                        Thanh toán chuyển khoản ngân hàng
                      </h5> */}
                      <div className="btn-watch-a">
                         <button
                        onClick={handlePay}
                        className="btn button btn-watch"
                      >
                         Chuyển khoản ngân hàng
                      </button>
                      </div>
                     
                      </div>
                      <div
                        className="text-center w-100 mb-2 pay-items active-items-pay"
                        id="momo"
                      >
                                       <h5 className="card-title">Mã QR thanh toán</h5>
                        <img
                          src={momo}
                          className="rounded"
                          alt="..."
                          style={{
                            maxWidth: 270,
                            maxHeight: 270,
                            width: "100%",
                          }}
                        />
                               <h5 className="card-title text-start text-success">
                        Hướng dẫn thanh toán quét mã
                      </h5>
                      <div className="containers text-center">
                        <div className="row">
                          <div
                            className="col-sm-1"
                            style={{ marginTop: "0.5em" }}
                          >
                            ❶
                          </div>
                          <div className="col-sm text-start">
                            Mở ứng dụng Momo hoặc app ngân hàng trên điện thoại
                          </div>
                        </div>
                      </div>
                      <div className="containers text-center">
                        <div className="row">
                          <div
                            className="col-sm-1"
                            style={{ marginTop: "0.1em" }}
                          >
                            ❷
                          </div>
                          <div className="col-sm text-start">
                            Dùng biểu tượng [-] để quét mã QR
                          </div>
                        </div>
                      </div>
                      <div className="containers text-center">
                        <div className="row">
                          <div
                            className="col-sm-1"
                            style={{ marginTop: "0.1em" }}
                          >
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
              </div>
              {/* --------------------------END  MÃ QR---------------------------------- */}
              {/* --------------------------Thông tin khách hàng---------------------------------- */}
              <div className="col-md-4 col-infor-client">
                <div className="col">
                  <div
                    className="card "
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-start">
                        Thông tin hành khách
                      </h5>
                      <div className="row mt-3">
                        <div className="col text-start">Họ và tên</div>
                        <div className="col text-end">{ticket?.name}</div>
                      </div>
                      <div className="row mt-2">
                        <div className="col text-start">Số điện thoại</div>
                        <div className="col text-end">
                          {ticket?.phone_number}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col text-start">Email</div>
                        <div className="col text-end">{ticket?.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="col">
                  <div
                    className="card "
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-start">
                        Thông tin lượt đi
                      </h5>
                      
                      <div className="row mt-3">
                        <div className="col text-start">Tuyến xe</div>
                        <div className="col text-end">
                          {trip?.start_station.name} =&gt;{" "}
                          {trip?.end_station.name}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">Điểm đón</div>
                        <div className="col text-end">
                          {ticket?.pickup_location} 
                      
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col text-start">Thời gian</div>
                        <div className="col text-end text-danger">
                          { trip?.schedule.find(i=>i.name===ticket?.pickup_location)?.time.slice(0, 5)} {trip?.departure_time.split(' ')[0]}  
                          
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col text-start">Số lượng ghế</div>
                        <div className="col text-end">
                          {ticket?.selectedSeatsIds?.length}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col text-start">Số ghế</div>
                        <div className="col text-end text-danger">
                          {trip?.seats
                            .filter((st) =>
                              ticket.selectedSeatsIds?.includes(st.id)
                            )
                            .map((st) => st.position)
                            .join(" , ")}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col text-start">Tổng tiền lượt đi</div>
                        <div className="col text-end text-danger">
                          {toCurrency(
                            trip?.seats
                              .filter((st) =>
                                ticket.selectedSeatsIds?.includes(st.id)
                              )
                              .map((st) => st.price)
                              .reduce((prev, cur) => prev + cur, 0)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <br />
                <div className="col">
                  <div
                    className="card "
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-start">
                        Thông tin lượt về
                      </h5>
                      <div className="row mt-3">
                        <div className="col text-start">Tuyến xe</div>
                        <div className="col text-end">
                          Da lat =&gt;BX Mien Dong
                        </div>
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
                        <div className="col text-end text-danger">
                          2.240.000đ
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <br />
                <div className="col">
                  <div
                    className="card "
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-start">Chi tiết giá</h5>
                      <div className="row mt-3">
                        <div className="col text-start">Giá vé lượt đi</div>
                        <div className="col text-end text-danger">
                          {toCurrency(
                            trip?.seats
                              .filter((st) =>
                                ticket.selectedSeatsIds?.includes(st.id)
                              )
                              .map((st) => st.price)
                              .reduce((prev, cur) => prev + cur, 0)
                          )}
                        </div>
                      </div>
                      {/* <div className="row mt-2">
                        <div className="col text-start">Giá vé lượt về</div>
                        <div className="col text-end text-danger">
                          1.120.000đ
                        </div>
                      </div> */}
                      <div className="row mt-2">
                        <div className="col text-start">Phí thanh toán</div>
                        <div className="col text-end">0 VND</div>
                      </div>
                      <hr />
                      <div className="row mt-3">
                        <div className="col text-start">Tổng tiền</div>
                        <div className="col text-end text-danger">
                          {toCurrency(
                            trip?.seats
                              .filter((st) =>
                                ticket.selectedSeatsIds?.includes(st.id)
                              )
                              .map((st) => st.price)
                              .reduce((prev, cur) => prev + cur, 0)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
       
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
