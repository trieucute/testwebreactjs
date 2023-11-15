import React, { useEffect,useState } from 'react';

import "../../assets/css/datve.css";
import { tabsStepMobile, showInforBus ,chairChooseGoAndBack } from '../../assets/js/bookTicketPage';
import xe2 from "../../assets/images/xe2.gif";
import city from "../../assets/images/city2.jpg";


const BookTicketPage = () => {
  
//   const [selectedChairsGo, setSelectedChairsGo] = useState([]);
//   const [selectedChairsBack, setSelectedChairsBack] = useState([]);

//   const handleClick = (chair, selectedChairs, setSelectedChairs) => {
//     const { isClicked, name } = chair;

//     if (isClicked) {
//       setSelectedChairs((prevSelectedChairs) =>
//         prevSelectedChairs.filter((chosenChair) => chosenChair !== name)
//       );
//     } else {
//       setSelectedChairs((prevSelectedChairs) => [...prevSelectedChairs, name]);
//     }

//     chair.isClicked = !isClicked;
//   };


//   useEffect(() => {
            
//     const itemsGo = Array.from(document.querySelectorAll('.chair-item-go'));
//     const itemsBack = Array.from(document.querySelectorAll('.chair-item-back'));

//     itemsGo.forEach((e) => {
//       e.isClicked = false;
//       e.addEventListener('click', () => {
//         handleClick(e, selectedChairsGo, setSelectedChairsGo);
//       });
//     });

//     itemsBack.forEach((e) => {
//       e.isClicked = false;
//       e.addEventListener('click', () => {
//         handleClick(e, selectedChairsBack, setSelectedChairsBack);
//       });
//     });
// tabsStepMobile();
//         showInforBus();
//     // Clean up event listeners
//     return () => {
//       itemsGo.forEach((e) => e.removeEventListener('click', handleClick));
//       itemsBack.forEach((e) => e.removeEventListener('click', handleClick));
//     };
//   }, []);


  // The rest of your component code...


      useEffect(()=>{
        tabsStepMobile();
        showInforBus();
        chairChooseGoAndBack();
      },[])
    return (
        <div className="mt-10">
        {/* {/* ---------------------------tên chuyến xe (TP.HCM -> ĐÀ LẠT ) từ đâu đến đâu ----------------------------* /} */}
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
          {/* {/* ---------------------------CÁC BƯỚC THỰC HIỆN MUA VÉ TRÊN MOBILE----------------------------* /} */}
          <div className="steps-booking-contents">
            <div
              className="row align-items-center p-2"
              style={{ margin: "0 auto", width: "98%" }}
            >
              <div
                className="col text-center tabs-step active-step"
                data-tabs="step1"
              >
                <span className="position-relative">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="7.5"
                      cy="7.5"
                      r="7.5"
                      fill="#AEACAC"
                      fillOpacity="0.8"
                    />
                  </svg>
                  <span className="number-step">1</span>
                </span>
                <br />
                <span>Chọn ghế</span>
              </div>
              <div className="col border-step"></div>
              <div className="col  text-center  tabs-step" data-tabs="step2">
                <span className="position-relative">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="7.5"
                      cy="7.5"
                      r="7.5"
                      fill="#AEACAC"
                      fillOpacity="0.8"
                    />
                  </svg>
                  <span className="number-step">2</span>
                </span>
                <br />
                <span>Địa điểm </span>
              </div>
              <div className="col border-step"></div>
              <div className="col  text-center  tabs-step" data-tabs="step3">
                <span className="position-relative">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="7.5"
                      cy="7.5"
                      r="7.5"
                      fill="#AEACAC"
                      fillOpacity="0.8"
                    />
                  </svg>
                  <span className="number-step">3</span>
                </span>
                <br />
                <span>Thông tin</span>
              </div>
              <div className="col border-step "></div>
              <div className="col  text-center  tabs-step" data-tabs="step4">
                <span className="position-relative">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="7.5"
                      cy="7.5"
                      r="7.5"
                      fill="#AEACAC"
                      fillOpacity="0.8"
                    />
                  </svg>
                  <span className="number-step">4</span>
                </span>
                <br />
                <span>Thanh toán</span>
              </div>
            </div>
          </div>
          {/* {/* ------------------------END---CÁC BƯỚC THỰC HIỆN MUA VÉ TRÊN MOBILE----------------------------* /} */}
        </div>
        {/* {/* --------------------------END -tên chuyến xe  từ đâu đến đâu ----------------------------* /} */}
        <div className=" my-3 ">
          <div className="contents-items-choose container ">
            <div className="row">
              <div className="col-md-8  card  backWhite-padding" style={{border:"none"}}>
                <div className="items-contents">
                  {/* {/* --------------------------- BƯỚC 1 CHỌN GHẾ---------------------------* /} */}
                  <div
                    className="items-chair items-choose active-step-item"
                    id="step1"
                  >
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <h5>Chọn ghế</h5>
                        <span>
                          <b>Chuyến đi - 10/08/2023</b>{" "}
                        </span>
                      </div>
                      <h6
                        className=" position-relative"
                        id="infor_bus_router"
                        style={{ cursor: "pointer" }}
                      >
                        Thông tin xe
                      </h6>
                      <div className="position-absolute infor_bus_router ">
                        <div className="py-3">
                          <div className="d-flex justify-content-between px-3 pb-2">
                            <h5>Chính sách</h5>
                            <span
                              className="pe-1"
                              id="close-infor"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.5em"
                                viewBox="0 0 512 512"
                                style={{ fill: "#cececf" }}
                              >
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                              </svg>
                            </span>
                          </div>
                          <div
                            className="row overflow-auto"
                            style={{ width: "95%", margin: "0 auto" }}
                          >
                            <div className="items_infor_bus_router ">
                              <h6>Chính sách huỷ vé</h6>
                              <ul>
                                <li>Chỉ được chuyển đổi vé 1 lần duy nhất</li>
                                <li>
                                  Chi phí hủy vé từ 10% – 30% giá vé tùy thuộc thời
                                  gian hủy vé so với giờ khởi hành ghi trên vé và số
                                  lượng vé cá nhân/tập thể áp dụng theo các quy định
                                  hiện hành.
                                </li>
                                <li>
                                  Quý khách khi có nhu cầu muốn thay đổi hoặc hủy vé
                                  đã thanh toán, cần liên hệ với Trung tâm tổng đài
                                  1900 6067 hoặc quầy vé chậm nhất trước 24h so với
                                  giờ xe khởi hành được ghi trên vé, trên email hoặc
                                  tin nhắn để được hướng dẫn thêm.
                                </li>
                              </ul>
                              <hr />
                            </div>
                            <div className="items_infor_bus_router">
                              <h6>Yêu cầu khi lên xe</h6>
                              <ul>
                                <li>
                                  Có mặt tại Văn phòng/Bến xe (Địa điểm xe đón trực
                                  tiếp) trước 30 phút để làm thủ tục lên xe (đối với
                                  ngày lễ tết cần ra trước 60 phút).
                                </li>
                                <li>Không mang thức ăn/đồ uống có mùi lên xe.</li>
                                <li>
                                  Không hút thuốc, không sử dụng đồ uống có cồn hoặc
                                  sử dụng chất kích thích trên xe.
                                </li>
                                <li>Không mang các vật dễ cháy nổ lên xe.</li>
                                <li>Không vứt rác trên xe.</li>
                                <li>Không mang động vật lên xe.</li>
                              </ul>
                              <hr />
                            </div>
                            <div className="items_infor_bus_router">
                              <h6>Hành lý xách tay</h6>
                              <ul>
                                <li>Tổng trọng lượng hành lý không vượt quá 20kg</li>
                                <li>Không vận chuyển hàng hoá cồng kềnh</li>
                              </ul>
                              <hr />
                            </div>
                            <div className="items_infor_bus_router">
                              <h6>Trẻ em dưới 6 tuổi và phụ nữ có thai</h6>
                              <ul>
                                <li>
                                  Trẻ em dưới 6 tuổi, cao từ 1.3m trở xuống, cân nặng
                                  dưới 30kg thì không phải mua vé.
                                </li>
                                <li>
                                  Trong trường hợp trẻ em không thoả 1 trong 3 tiêu
                                  chí trên sẽ mua 01 vé tương đương với người lớn
                                </li>
                                <li>Mỗi người lớn sẽ đi kèm tối đa một trẻ em.</li>
                                <li>
                                  Phụ nữ có thai cần đảm bảo sức khoẻ trong suốt quá
                                  trình di chuyển.
                                </li>
                                <li>Không vứt rác trên xe.</li>
                                <li>Không mang động vật lên xe.</li>
                              </ul>
                              <hr />
                            </div>
                            <div className="items_infor_bus_router">
                              <h6>Vé đón đường</h6>
                              <ul>
                                <li>
                                  Trường hợp có nhu cầu lên xe dọc đường, Quý khách
                                  vui lòng liên hệ tổng đài 19006067 để đăng kí trước
                                  ít nhất 2 tiếng so với giờ xe khởi hành và vui lòng
                                  chuẩn bị hành lý nhỏ gọn (tối đa 20kg).
                                </li>
                                <li>
                                  Lưu ý, chúng tôi chỉ hỗ trợ đón ở một số địa điểm
                                  thuận tiện nằm trên lộ trình
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row px-4 py-3 ">
                      {/* {/*-------------------- SỐ GHẾ TẦNG DƯỚI--------------------------* /} */}
                      <div className="items-FloorDown col-sm-4 ">
                        <h5 className="text-center" style={{ fontSize: "1em" }}>
                          Tầng Dưới
                        </h5>
                        <div className="row">
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative "
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A01
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A02
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A03
                              </span>
                            </div>
                            <div
                              className=" position-relative "
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A04
                              </span>
                            </div>
                            <div
                              className=" position-relative "
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A05
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative "
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A06
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A07
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A08
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A09
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A10
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A11
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A12
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A13
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A14
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A15
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A16
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A17
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* {/*------------------END-- SỐ GHẾ TẦNG DƯỚI--------------------------* /} */}
                      </div>
                      {/* {/*-------------------- SỐ GHẾ TẦNG TRÊN--------------------------* /} */}
                      <div className="items-FloorUp col-sm-4">
                        <h5 className="text-center" style={{ fontSize: "1em" }}>
                          Tầng trên
                        </h5>
                        <div className="row">
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B01
                              </span>
                            </div>
                            <div
                              className=" position-relative "
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B02
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B03
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B04
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B05
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B06
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B07
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B08
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B09
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B10
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B11
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B12
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B13
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B14
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B15
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B16
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-go"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B17
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* {/*-----------------END--- SỐ GHẾ TẦNG TRÊN--------------------------* /} */}
                      {/* {/*-------------------- MÔ TẢ MÀU ( ĐỎ LÀ ĐANG CHỌN, XANH LÀ CÒN TRỐNG, XÁM LÀ ĐÃ BÁN)--------------------------* /} */}
                      <div className="items-Floor-des col-sm-4">
                        <div className="row mt-4">
                          <div className="item-des d-flex my-2">
                            <span>
                              <svg
                                width={15}
                                height={15}
                                viewBox="0 0 15 15"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="7.5"
                                  cy="7.5"
                                  r="7.5"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                            </span>
                            <span className="ms-3">Đã bán</span>
                          </div>
                          <div className="item-des d-flex  my-2">
                            <span>
                              <svg
                                width={15}
                                height={15}
                                viewBox="0 0 15 15"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="7.5"
                                  cy="7.5"
                                  r="7.5"
                                 fill="#A1CCD1"
                                  fillOpacity="0.8"
                                />
                              </svg>
                            </span>
                            <span className="ms-3">Còn trống</span>
                          </div>
                          <div className="item-des d-flex my-2">
                            <span>
                              <svg
                                width={15}
                                height={15}
                                viewBox="0 0 15 15"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="7.5"
                                  cy="7.5"
                                  r="7.5"
                                  fill="#E63946"
                                  fillOpacity="0.8"
                                />
                              </svg>
                            </span>
                            <span className="ms-3">Đang chọn</span>
                          </div>
                        </div>
                      </div>
                      {/* {/*------------------END --- MÔ TẢ MÀU ( ĐỎ LÀ ĐANG CHỌN, XANH LÀ CÒN TRỐNG, XÁM LÀ ĐÃ BÁN)--------------------------* /} */}
                    </div>
                    <div className="mt-3">
                      <h5>Chọn ghế</h5>
                      <span>
                        <b>Chuyến về - 14/08/2023</b>{" "}
                      </span>
                    </div>
                    <div className="row px-4 py-3 ">
                      {/* {/*-------------------- SỐ GHẾ TẦNG TRÊN (CHUYẾN VỀ)--------------------------* /} */}
                      <div className="items-FloorDown col-sm-4 ">
                        <h5 className="text-center" style={{ fontSize: "1em" }}>
                          Tầng Dưới
                        </h5>
                        <div className="row">
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A01
                              </span>
                            </div>
                            <div
                              className=" position-relative "
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A02
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A03
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A04
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A05
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A06
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A07
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A08
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                A09
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A10
                              </span>
                            </div>
                            <div
                              className=" position-relative  chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A11
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A12
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A13
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A14
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A15
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A16
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                A17
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* {/*---------------END ----- SỐ GHẾ TẦNG DƯỚI(CHUYẾN VỀ)--------------------------* /} */}
                      {/* {/*-------------------- SỐ GHẾ TẦNG TRÊN (CHUYẾN VỀ)--------------------------* /} */}
                      <div className="items-FloorUp col-sm-4">
                        <h5 className="text-center" style={{ fontSize: "1em" }}>
                          Tầng trên
                        </h5>
                        <div className="row">
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B01
                              </span>
                            </div>
                            <div
                              className=" position-relative "
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B02
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B03
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B04
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B05
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B06
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B07
                              </span>
                            </div>
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B08
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative"
                              style={{ cursor: "no-drop" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                  fill="#AEACAC"
                                  fillOpacity="0.8"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{ fontSize: "0.55em", left: 13, top: 4 , color:"#AEACAC"}}
                              >
                                B09
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B10
                              </span>
                            </div>
                            <div
                              className=" position-relative  chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B11
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B12
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B13
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B14
                              </span>
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between  m-auto py-1">
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B15
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B16
                              </span>
                            </div>
                            <div
                              className=" position-relative chair-item-back"
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                width={43}
                                height={33}
                                viewBox="0 0 43 33"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M36.5 9.33333V5.75C36.5 2.79375 33.9688 0.375 30.875 0.375H12.125C9.03125 0.375 6.5 2.79375 6.5 5.75V9.33333C3.40625 9.33333 0.875 11.7521 0.875 14.7083V23.6667C0.875 26.6229 3.40625 29.0417 6.5 29.0417V30.8333C6.5 31.8187 7.34375 32.625 8.375 32.625C9.40625 32.625 10.25 31.8187 10.25 30.8333V29.0417H32.75V30.8333C32.75 31.8187 33.5938 32.625 34.625 32.625C35.6562 32.625 36.5 31.8187 36.5 30.8333V29.0417C39.5938 29.0417 42.125 26.6229 42.125 23.6667V14.7083C42.125 11.7521 39.5938 9.33333 36.5 9.33333ZM10.25 5.75C10.25 4.76458 11.0938 3.95833 12.125 3.95833H30.875C31.9062 3.95833 32.75 4.76458 32.75 5.75V10.7308C31.6063 11.7162 30.875 13.1317 30.875 14.7083V18.2917H12.125V14.7083C12.125 13.1317 11.3938 11.7162 10.25 10.7308V5.75ZM38.375 23.6667C38.375 24.6521 37.5312 25.4583 36.5 25.4583H6.5C5.46875 25.4583 4.625 24.6521 4.625 23.6667V14.7083C4.625 13.7229 5.46875 12.9167 6.5 12.9167C7.53125 12.9167 8.375 13.7229 8.375 14.7083V21.875H34.625V14.7083C34.625 13.7229 35.4688 12.9167 36.5 12.9167C37.5312 12.9167 38.375 13.7229 38.375 14.7083V23.6667Z"
                                 fill="#A1CCD1"
                                />
                              </svg>
                              <span
                                className="name-chair position-absolute"
                                style={{
                                  fontSize: "0.6em",
                                  left: 13,
                                  top: 3,
                                  color: "#2E8A99"
                                }}
                              >
                                B17
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* {/*------------------END-- SỐ GHẾ TẦNG TRÊN (CHUYẾN VỀ)--------------------------* /} */}
                    </div>
                    {/* {/* --------------------------- HIỆN SỐ GHẾ ĐÃ CHỌN MOBILE- --------------------------* /} */}
                    <div className="chair-chosen">
                      <hr />
                      Ghế đi:{" "}
                      <span
                        className="item-chair-chosen "
                        id="item-chair-chosen-go"
                      />
                      <br />
                      Ghế về:{" "}
                      <span
                        className="item-chair-chosen "
                        id="item-chair-chosen-back"
                      />
                    </div>
                    {/* {/* ------------------------END--- HIỆN SỐ GHẾ ĐÃ CHỌN MOBILE- --------------------------* /} */}
                    {/* {/* ------------------------ NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------* /} */}
                    <div className="button_conti-step">
                      <div className="d-flex justify-content-end mt-3 btn-handle">
                        <button className="btn" hidden={true}>
                          Quay lai
                        </button>
                        <button
                          className="btn button_step"
                          type="button"
                          data-next="step2"
                        >
                          Tiếp tục
                        </button>
                      </div>
                    </div>
                    {/* {/* --------------------END---- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------* /} */}
                  </div>
                  {/* {/* --------------------END---- Bước 1 CHỌN GHẾ --------------------------* /} */}
                  <div className="border-bt" />
                  {/* {/* --------------------------- BƯỚC 2 ĐIỂM ĐÓN TRẢ KHÁCH---------------------------* /} */}
                  <div
                    className="pickUp-dropOff-location-contents my-4  items-choose"
                    id="step2"
                  >
                    {/* {/* ---------------------------ĐIỂM ĐÓN (CHUYẾN ĐI) TRẢ KHÁCH---------------------------* /} */}
                    <div>
                      <h5>Địa điểm đón trả (đi) </h5>
                      <span>
                        <b> Chuyến đi - 10/08/2023</b>
                      </span>
                      <div className="mt-3">
                        <form action="" className="row">
                          <div className="form-group">
                            <label htmlFor="diemdon" className="mb-2">
                              Điểm đón
                            </label>
                            <select name="" id="diemdon" className="form-control">
                              <option value="">Bến xe Miền Đông Mới</option>
                              <option value="">Bến xe An Sương</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="diemtra" className="mb-2">
                              Điểm trả
                            </label>
                            <select name="" id="diemtra" className="form-control">
                              <option value="">Bến xe Đà lạt</option>
                              <option value="">Bảo Lộc</option>
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/* {/* -----------------END----------ĐIỂM ĐÓN (CHUYẾN ĐI) TRẢ KHÁCH---------------------------* /} */}
                    {/* {/* ---------------------------ĐIỂM ĐÓN (CHUYẾN VỀ) TRẢ KHÁCH---------------------------* /} */}
                    <div className="mt-5">
                      <h5>Địa điểm đón trả (về)</h5>
                      <span>
                        <b>Chuyến về - 14/08/2023</b>
                      </span>
                      <div className="mt-3">
                        <form action="" className="row">
                          <div className="form-group">
                            <label htmlFor="diemdon" className="mb-2">
                              Điểm đón
                            </label>
                            <select name="" id="diemdon" className="form-control">
                              <option value="">Bến xe Đà lạt</option>
                              <option value="">Bảo Lộc</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="diemtra" className="mb-2">
                              Điểm trả
                            </label>
                            <select name="" id="diemtra" className="form-control">
                              <option value="">Bến xe Miền Đông Mới</option>
                              <option value="">Bến xe An Sương</option>
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/* {/* ------------------------END ----ĐIỂM ĐÓN (CHUYẾN VỀ) TRẢ KHÁCH---------------------------* /} */}
                    {/* {/* ------------------------ NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------* /} */}
                    <div className="button_conti-step">
                      <div className="d-flex justify-content-between mt-3 btn-handle">
                        <button
                          className="btn button_step"
                          type="button"
                          data-next="step1"
                        >
                          Quay lại
                        </button>
                        <button
                          className="btn button_step"
                          type="button"
                          data-next="step3"
                        >
                          Tiếp tục
                        </button>
                      </div>
                    </div>
                    {/* {/* --------------END---------- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------* /} */}
                  </div>
                  {/* {/* -----------------------END---- BƯỚC 2 ĐIỂM ĐÓN TRẢ KHÁCH---------------------------* /} */}
                  <div className="border-bt" />
                  {/* {/* --------------------------- BƯỚC 3 NHẬP THÔNG TIN ĐẶT VÉ ---------------------------* /} */}
                  <div
                    className="Client-information-contents my-4  items-choose"
                    id="step3"
                  >
                    <div className="row mt-3">
                      <div className="items-infor col-6">
                        <h5>Thông tin khách hàng</h5>
                        <div className="mt-4">
                          <form action="">
                            <div className="form-group">
                              <label className="mb-2">Họ và tên</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                              />
                            </div>
                            <div className="form-group mt-3">
                              <label className="mb-2">Số điện thoại</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter phone"
                              />
                            </div>
                            <div className="form-group mt-3">
                              <label className="mb-2">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="items-terms-notes col-6">
                        <h5 className="text-center">ĐIỀU KHOẢN &amp; LƯU Ý</h5>
                        <div className="mt-4" style={{ textAlign: "justify" }}>
                          (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước
                          ít nhất 30 phút giờ xe khởi hành, mang theo thông báo đã
                          thanh toán vé thành công có chứa mã vé được gửi từ hệ thống
                          WebProTicket. Vui lòng liên hệ Trung tâm tổng đài 1900 6067
                          để được hỗ trợ.
                          <br />
                          (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ
                          Tổng đài trung chuyển 1900 6918 trước khi đặt vé. Chúng tôi
                          không đón/trung chuyển tại những điểm xe trung chuyển không
                          thể tới được.
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mt-5 submit-checkbox">
                      <input
                        type="checkbox"
                        id="chapnhan"
                        style={{ width: 15, height: 15 }}
                      />
                      <label className="text" htmlFor="chapnhan">
                        <span className="ms-3" style={{ color: "#FE6531" }}>
                          Chấp nhận điều khoản{" "}
                        </span>{" "}
                        đặt vé &amp; chính sách bảo mật thông tin của WebProTicket{" "}
                      </label>
                    </div>
                    {/* {/* -------------------------- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------* /} */}
                    <div className="button_conti-step">
                      <div className="d-flex justify-content-between mt-3 btn-handle">
                        <button
                          className="btn button_step"
                          type="button"
                          data-next="step2"
                        >
                          Quay lại
                        </button>
                        <button
                          className="btn button_step"
                          type="button"
                          data-next="step4"
                        >
                          Tiếp tục
                        </button>
                      </div>
                    </div>
                    {/* {/* ------------------------END --- NÚT BẤM TIẾP TỤC TRÊN MOBILE ĐỂ ĐẾN VỚI BƯỚC TIẾP THEO --------------------------* /} */}
                  </div>
                  {/* {/* -----------------------END---- BƯỚC 3 NHẬP THÔNG TIN ĐẶT VÉ ---------------------------* /} */}
                </div>
              </div>
              {/* {/* --------------------------- BƯỚC 4 HIỆN TỔNG QUÁT THÔNG TIN ĐẶT VÉ ---------------------------* /} */}
              <div className="col-4 infor-bus-contents  items-choose pe-0 " id="step4">
                <div className="col">
                  <div className="card " style={{border:"none", backgroundColor:"white", borderRadius:"5px"}}>
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
                <div className="col mt-4">
                  <div className="card " style={{border:"none",backgroundColor:"white", borderRadius:"5px"}}>
                    <div className="card-body">
                      <h5 className="card-title text-start">Thông tin lượt về</h5>
                      <div className="row mt-3">
                        <div className="col text-start">Tuyến xe</div>
                        <div className="col text-end">Đà Lạt =&gt; BX An Sương</div>
                      </div>
                      <div className="row mt-2">
                        <div className="col text-start">Thời gian</div>
                        <div className="col text-end text-danger">
                          12:00 14-08-2023
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
                        <div className="col text-end text-danger">1.120.000đ</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col mt-4">
                  <div className="card " style={{border:"none",backgroundColor:"white", borderRadius:"5px"}}>
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
                {/* {/* --------------------------- NÚT BẤM ĐẾN TRANG THANH  TOÁN --------------------------* /} */}
                <div className="col justify-content-between d-flex mt-4 btn-handle">
                  <button className="btn">
                    <a href="..">Huỷ</a>
                  </button>
                  <button className="btn">
                    <a href="/thanhtoan">Thanh toán</a>
                  </button>
                </div>
                {/* {/* ------------------------END --- NÚT BẤM ĐẾN TRANG THANH  TOÁN --------------------------* /} */}
              </div>
              {/* {/* --------------------------- BƯỚC 4 HIỆN TỔNG QUÁT THÔNG TIN ĐẶT VÉ ---------------------------* /} */}
            </div>
          </div>
        </div>
      </div>
      
    );
};

export default BookTicketPage ;