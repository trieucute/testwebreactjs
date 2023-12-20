import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/completlyPayment.css";
// import "../../assets/css/index.css";
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';
import down from "../../assets/images/push-down.png";
import check from "../../assets/images/check.png";
import qr from "../../assets/images/QR.png";
import { API_BASE_URL, TimeHM } from "../../config";
import axiosClient from "../../axios-client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay } from "@fortawesome/free-solid-svg-icons";

const CompletlyPayment = () => {
  const STATUS = {
    PENDING: 0,
    FAIL: -1,
    SUCCESS: 1,
  };
  const queryParameters = new URLSearchParams(window.location.search);
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [bill, setBill] = useState(null);
  const [idTrip, setIdTrip] = useState('');
  const [status, setStatus] = useState(STATUS.PENDING);
  const first = useRef(false);
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
    if (!first.current) {
      checkPaymentStatus();
    }
  }, []);
  const checkPaymentStatus = async () => {
    try {
      first.current = true;
      const vnp_TxnRef = queryParameters.get("vnp_TxnRef");
      const vnp_TransactionStatus = queryParameters.get(
        "vnp_TransactionStatus"
      );
      const vnp_Amount = queryParameters.get("vnp_Amount");
      const resp = await fetch(
        `${API_BASE_URL}/api/vnpay-return?vnp_TxnRef=${vnp_TxnRef}&vnp_TransactionStatus=${vnp_TransactionStatus}&vnp_Amount=${vnp_Amount}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await resp.json();
      if (resp.status === 200) {
        console.log(jsonData);
        setUser(jsonData?.data?.bill?.tickets[0]?.user);
        setTickets(jsonData.data);
        // setIdTrip(jsonData?.data.trip.id)

        axiosClient.get(`/trip/${jsonData?.data.trip.id}`)
        .then(res=>{
          console.log(res);
          setIdTrip(res.data.data)
        })
        setBill(jsonData.data.bill);

        setStatus(jsonData.success ? STATUS.SUCCESS : STATUS.FAIL);
      }
      first.current = false;
    } catch (e) {
      console.log(e);
      console.error(e)
    }
  };
  const toCurrency = (amount) => {
    return parseInt(amount)?.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  function getInfoFromQR(qrData) {
    qrData = 'sdt, tên, email';
    return qrData;
  }

  const [scannedInfo, setScannedInfo] = useState('');
  const [qrData, setQrData]= useState('')

  function handleScan(qrData) {
    const info = getInfoFromQR(qrData);
    setScannedInfo(info);
  }

  function downloadQRCode() {
    const canvas = document.getElementById('qr-code-img');

    // Get the base64 representation of the QR code from the image element
    const base64Image = canvas.toDataURL('image/png');

    // Convert the base64 image to a Blob
    const byteCharacters = atob(base64Image.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Use FileSaver.js to save the blob as a file
    saveAs(blob, 'ma-qr.png');
  }
  return (
    <div className="mt-10">
      <div className="complete-pay-container container backWhite-padding ">
        <div className="mb-5 ">
          <div className="check">
            <img src={check} alt="" />
          </div>
          <h3 className="booking__ticket mb-2">Mua vé xe thành công</h3>
          <p className="notifies">
            WebProTicket đã gửi thông tin đặt vé vào email của bạn. Vui lòng
            kiểm tra lại.
          </p>
          {/*------------------------ {/* thông tin * /} ---------------*/}
        </div>
        
        <div className="my-4">
          <h3 className="title__ticket__infor mb-4">Thông tin mua vé</h3>
          <div className="ticket__infor row justify-content-between">
            <div className="ticket__infor1 col-md-5">
              <div className="row mt-3">
                <div className="col-4 text-start">Họ và tên:</div>
                <div className="col text-end">{user?.name}</div>
              </div>
              <div className="row mt-2">
                <div className="col text-start">Số điện thoại:</div>
                <div className="col text-end ">{user?.phone_number}</div>
              </div>
              <div className="row mt-2">
                <div className="col text-start">Email:</div>
                <div className="col text-end">{user?.email}</div>
              </div>
            </div>
            <div className="ticket__infor2  col-md-5">
              <div className="row mt-2">
                <div className="col text-start">Tổng giá vé:</div>
                <div className="col text-end ">{toCurrency(bill?.total)}</div>
              </div>
              <div className="row mt-2">
                <div className="col text-start">PTTT:</div>
                <div className="col text-end ">Thanh toán online</div>
              </div>
              <div className="row mt-2">
                <div className="col text-start">Trạng thái:</div>
                <div
                  className={`col text-end ${
                    status == STATUS.SUCCESS
                      ? "text-success"
                      : status == STATUS.PENDING
                      ? "text-black"
                      : "text-danger"
                  }`}
                >
                  {status == STATUS.SUCCESS
                    ? "Thanh toán thành công"
                    : status == STATUS.PENDING
                    ? "Đang chờ xử lý..."
                    : "Thanh toán thất bại"}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*------------------------------- {/*slide show vé * /}--------------------------*/}
        {/* <div
          id="myCarousel"
          className="carousel slide container carousel-card-item"
          data-ride="carousel"
          data-interval="false"
        >
        
          <div className="carousel-inner w-100"> */}
        <div className="row m-0">
          {tickets.map((val, index) => {
            console.log(val);
            return (
              // <div className={`carousel-item active`}>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 p-0">
                <div className="card card-body" style={{ border: "none" }}>
                  <div className="card swiper-slide">
                    <div className="ticket__infor3">
                      <div className="row justify-content-center my-2 align-items-baseline">
                        {/* <h5 className=" number_ticket">{index + 1}</h5> */}
                        <div
                          className="col pe-0 "
                          style={{ visibility: "hidden" }}
                        >
                          d
                        </div>
                        <h5
                          className="col-sm-8 ticket__code p-0 text-center mb-2"
                          sty
                        >
                          Mã vé {val.code_tickets}
                        </h5>
                        <div
                          className="col  text-end ps-0"
                          onClick={downloadQRCode}
                        >
                          <img src={down} alt="" />
                        </div>
                      </div>
                      <div className="QR text-center">
                        {/* <img src={qr} alt="" /> */}
                        <QRCode
                          value={`Mã vé: ${val.code} \nTuyến xe: ${
                            val.trip.start_station.name
                          } - ${
                            val.trip.end_station.name
                          }  \nThời gian: ${TimeHM(
                            val.trip.schedule.find(
                              (item) => item.type === "pickup"
                            ).time
                          )} ${val.trip.departure_time.split(" ")[0]} \nGhế: ${
                            val.seat.position
                          } \nĐiểm lên xe: ${val.pickup_location} (${
                            val.trip.start_station.address
                          }) \n
                             `}
                          id="qr-code-img"
                        />
                      </div>
                      <div className="infor__trip mt-4 ">
                        <div className="card ">
                          <div className="row">
                            <div className="col text-start">Tuyến xe</div>
                            <div className="col text-end ">
                              {val.trip.start_station.name} -{" "}
                              {val.trip.end_station.name}
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col text-start">Thời gian</div>
                            <div className="col text-end ">
                              <span>
                                {" "}
                                {TimeHM(
                                  val.trip.schedule.find(
                                    (item) => item.type === "pickup"
                                  ).time
                                )}{" "}
                                {val.trip.departure_time.split(" ")[0]}
                              </span>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col text-start">Số ghế</div>
                            <div className="col text-end ">
                              {val.seat.position}
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col text-start">Điểm lên xe</div>
                            <div className="col text-end ">
                              {val.pickup_location} (
                              {val.trip.start_station.address})
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col text-start">Giá vé</div>
                            <div className="col text-end ">
                              {toCurrency(val.seat.price)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="note__trip mt-4">
                        <p>
                          Mang mã vé đến văn phòng để đổi vé lên xe trước giời
                          xuất bến ít nhất 60 phút
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              // </div>
            );
          })}
          {/*---------------------------------------- vé 1--------------------- */}
        </div>
      </div>
      {/*---------------------------Button lùi------------------*/}
      {/* <button
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
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default CompletlyPayment;
